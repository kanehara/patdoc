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

  describe('POST', () => {
    it('successfully creates an appointment', async () => {
      const createDate = new Date()
      const createdAppointment = await createAppointment({ date: createDate })
      expect(new Date(createdAppointment.date)).to.equalDate(createDate)
      expect(createdAppointment.subject).to.equal('test subject')
      expect(createdAppointment.doctor).to.equal(doctors[0]._id)
      expect(createdAppointment.patient).to.equal(patients[0]._id)
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
      await Promise.all(promises)
      const appointments = await getAppointments()
      expect(appointments).to.have.lengthOf(6)
    })
  })
})
