import initAppointmentRoutes from './appointments'
import initMedicalRecordRoutes from './medical-record'
import initAuthRoutes from './auth'
import initDoctorRoutes from './doctor'
import initPatientRoutes from './patient'

export default app => {
  initAppointmentRoutes(app)
  initMedicalRecordRoutes(app)
  initAuthRoutes(app)
  initDoctorRoutes(app)
  initPatientRoutes(app)
}
