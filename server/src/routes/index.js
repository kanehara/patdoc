import appointments from './appointments'
import medicalRecord from './medical-record'
import auth from './auth'
import doctor from './doctor'
import patient from './patient'

export default app => {
  appointments(app)
  medicalRecord(app)
  auth(app)
  doctor(app)
  patient(app)
}
