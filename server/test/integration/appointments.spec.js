import chaiHttp from 'chai-http'
import chai from 'chai'
import prepareMockServer from '../prepare-mock-server'
import logger from '../../src/logger'
import config from '../../src/config'

chai.use(chaiHttp)
chai.use(require('chai-datetime'))
const request = chai.request
const expect = chai.expect

describe('Appointments', () => {
  let server
  let doctors = []
  let patients = []
  before(async () => {
    try {
      server = await prepareMockServer()
      const docRes = await request(server)
        .get('/doctors')
      doctors = docRes.res.body
      const patRes = patients = await request(server)
        .get('/patients')
      patients = patRes.res.body
    } catch (err) {
      logger.error(err)
    }
  })

  const createAppointment = async ({
    patient = patients[0],
    doctor = doctors[0],
    date = new Date(),
    subject = 'test subject',
    status = config.APPOINTMENT_STATUS_TYPES.PENDING,
    initiatedByUserType = config.USER_TYPES.DOCTOR} = {}) => {
    const res = await request(server)
      .post(`/patients/${patient._id}/appointments`)
      .send({
        date,
        subject,
        doctor: doctor._id,
        patient: patient._id,
        status,
        initiatedByUserType
      })
    expect(res).to.have.status(200)
    return res.body
  }

  const getAppointments = async ({ patient = patients[0] } = {}) => {
    const res = await request(server)
      .get(`/patients/${patient._id}/appointments`)
    expect(res).to.have.status(200)
    return res.body
  }

  const assertEqualAppointments = (a1, a2) => {
    expect(new Date(a1.date)).to.equalDate(new Date(a2.date))
    expect(a1.subject).to.equal(a2.subject)
    expect(a1.doctor).to.deep.equal(a2.doctor)
    expect(a1.patient).to.deep.equal(a2.patient)
    expect(a1.status).to.equal(a2.status)
    expect(a1.initiatedByUserType).to.equal(a2.initiatedByUserType)
  }

  const patchAppointment = async ({patientId = patients[0]._id, appointmentId, payload = {}} = {}) => {
    const res = await request(server)
      .patch(`/patients/${patientId}/appointments/${appointmentId}`)
      .send(payload)
    expect(res).to.have.status(200)
    return res.body
  }

  describe('POST', () => {
    it('successfully creates an appointment', async () => {
      const createDate = new Date()
      const createdAppointment = await createAppointment({ date: createDate })
      expect(new Date(createdAppointment.date)).to.equalDate(createDate)
      expect(createdAppointment.subject).to.equal('test subject')
      expect(createdAppointment.doctor._id).to.equal(doctors[0]._id)
      expect(createdAppointment.patient._id).to.equal(patients[0]._id)
      expect(createdAppointment.status).to.equal(config.APPOINTMENT_STATUS_TYPES.PENDING)
      expect(createdAppointment.initiatedByUserType).to.equal(config.USER_TYPES.DOCTOR)
    })

    it('returns 400 response if body patient ID does not match path', async () => {
      try {
        await request(server)
          .post(`/patients/${patients[1]._id}/appointments`)
          .send({
            date: new Date(),
            subject: 'test',
            doctor: doctors[0]._id,
            patient: patients[0]._id,
            status: config.APPOINTMENT_STATUS_TYPES.PENDING,
            initiatedByUserType: config.USER_TYPES.DOCTOR
          })
      } catch (err) {
        expect(err.response).to.have.status(400)
      }
    })
  })

  describe('GET', () => {
    it('returns created appointment', async () => {
      const createDate = new Date()
      const createdAppointment = await createAppointment({ date: createDate })
      const patientAppointments = await getAppointments()
      const foundAppointment = patientAppointments.find(a => a._id === createdAppointment._id)
      assertEqualAppointments(createdAppointment, foundAppointment)
    })

    it('returns 500 for invalid id', async () => {
      try {
        await getAppointments({patient: { _id: 'invalid' }})
      } catch (err) {
        expect(err.response).to.have.status(500)
      }
    })

    it('returns [] for user without appointments', async () => {
      const response = await getAppointments({patient: patients[9]})
      expect(response).to.deep.equal([])
    })

    it('all appointments are returned if creating multiple appointments', async () => {
      const promises = []
      promises.push(createAppointment())
      promises.push(createAppointment())
      promises.push(createAppointment())
      promises.push(createAppointment())
      promises.push(createAppointment())
      promises.push(createAppointment())
      const createdAppointments = await Promise.all(promises)
      const retrievedAppointments = await getAppointments()
      createdAppointments.forEach(appointment => {
        expect(retrievedAppointments.find(a => a._id === appointment._id)).to.be.ok
      })
    })
  })

  describe('PATCH', () => {
    it('updates all fields', async () => {
      const createdAppointment = await createAppointment()
      const date = new Date()
      const patchedAppointment = await patchAppointment({appointmentId: createdAppointment._id, payload: {
        date,
        subject: 'new subject',
        notes: 'new notes',
        doctor: doctors[1]._id,
        patient: patients[1]._id,
        status: config.APPOINTMENT_STATUS_TYPES.CONFIRMED,
        initiatedByUserType: config.USER_TYPES.PATIENT
      }})
      expect(new Date(patchedAppointment.date)).to.equalDate(date)
      expect(patchedAppointment.subject).to.equal('new subject')
      expect(patchedAppointment.notes).to.equal('new notes')
      expect(patchedAppointment.doctor).to.deep.equal(doctors[1]._id)
      expect(patchedAppointment.patient).to.deep.equal(patients[1]._id)
      expect(patchedAppointment.status).to.equal(config.APPOINTMENT_STATUS_TYPES.CONFIRMED)
      expect(patchedAppointment.initiatedByUserType).to.equal(config.USER_TYPES.PATIENT)
    })

    it('updates date', async () => {
      const createdAppointment = await createAppointment()
      const date = new Date()
      const patchedAppointment = await patchAppointment({appointmentId: createdAppointment._id, payload: { date }})
      expect(new Date(patchedAppointment.date)).to.equalDate(date)
    })

    it('updates subject', async () => {
      const createdAppointment = await createAppointment()
      const patchedAppointment = await patchAppointment({appointmentId: createdAppointment._id, payload: { subject: 'new subject' }})
      expect(patchedAppointment.subject).to.equal('new subject')
    })

    it('updates notes', async () => {
      const createdAppointment = await createAppointment()
      const patchedAppointment = await patchAppointment({appointmentId: createdAppointment._id, payload: { notes: 'new notes' }})
      expect(patchedAppointment.notes).to.equal('new notes')
    })

    it('updates doctor', async () => {
      const createdAppointment = await createAppointment()
      const patchedAppointment = await patchAppointment({appointmentId: createdAppointment._id, payload: { doctor: doctors[1] }})
      expect(patchedAppointment.doctor).to.deep.equal(doctors[1])
    })

    it('updates patient', async () => {
      const createdAppointment = await createAppointment()
      const patchedAppointment = await patchAppointment({appointmentId: createdAppointment._id, payload: { patient: patients[1] }})
      expect(patchedAppointment.patient).to.deep.equal(patients[1])
    })

    it('updates status', async () => {
      const createdAppointment = await createAppointment()
      const patchedAppointment = await patchAppointment({appointmentId: createdAppointment._id, payload: { status: config.APPOINTMENT_STATUS_TYPES.CONFIRMED }})
      expect(patchedAppointment.status).to.equal(config.APPOINTMENT_STATUS_TYPES.CONFIRMED)
    })

    it('updates initiatedByUserType', async () => {
      const createdAppointment = await createAppointment()
      const patchedAppointment = await patchAppointment({appointmentId: createdAppointment._id, payload: { initiatedByUserType: config.USER_TYPES.PATIENT }})
      expect(patchedAppointment.initiatedByUserType).to.equal(config.USER_TYPES.PATIENT)
    })

    it('returns 400 response if patientId does not match appointment patient', async () => {
      try {
        const createdAppointment = await createAppointment()
        await patchAppointment({patientId: 'invalid', appointmentId: createdAppointment._id})
      } catch (err) {
        expect(err.response).to.have.status(400)
      }
    })

    it('returns 500 response if appointmentId is invalid', async () => {
      try {
        await patchAppointment({appointmentId: 'invalid'})
      } catch (err) {
        expect(err.response).to.have.status(500)
      }
    })
  })

  describe('DELETE', () => {
    it('deletes appointment', async () => {
      const createdAppointment = await createAppointment()
      await request(server)
        .delete(`/patients/${createdAppointment.patient._id}/appointments/${createdAppointment._id}`)
      const appointments = await getAppointments()
      expect(appointments.find(a => a._id === createdAppointment._id)).to.be.undefined
    })

    it('invalid appointmentId returns 500', async () => {
      try {
        const createdAppointment = await createAppointment()
        await request(server)
          .delete(`/patients/${createdAppointment.patient._id}/appointments/invalid`)
      } catch (err) {
        expect(err.response).to.have.status(500)
      }
    })

    it('invalid patientId returns 500', async () => {
      try {
        const createdAppointment = await createAppointment()
        await request(server)
          .delete(`/patients/invalid/appointments/${createdAppointment._id}`)
      } catch (err) {
        expect(err.response).to.have.status(500)
      }
    })

    it('invalid patientId and appointmentId returns 500', async () => {
      try {
        await request(server)
          .delete(`/patients/invalid/appointments/invalid`)
      } catch (err) {
        expect(err.response).to.have.status(500)
      }
    })
  })
})
