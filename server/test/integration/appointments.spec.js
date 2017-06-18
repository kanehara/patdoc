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
    initiatedByUserType = config.USER_TYPES.DOCTOR}) => {
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
})
