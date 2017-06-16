export default {
  API_HOST: process.env.API_HOST || 'http://localhost:3000',
  USER_TYPES: {
    PATIENT: 'PATIENT',
    DOCTOR: 'DOCTOR'
  },
  APPOINTMENT_STATUS_TYPES: {
    CONFIRMED: 'CONFIRMED',
    PENDING: 'PENDING',
    CANCELLED: 'CANCELLED',
    DECLINED: 'DECLINED'
  }
}
