export default {
  mongo: {
    HOST: process.env.DB_HOST || 'localhost:27017',
    USER: process.env.DB_USER || '',
    PASS: process.env.DB_PASS || ''
  },
  jwtSecret: process.env.JWT_SECRET || 'StrawberrySmiggles',
  USER_TYPES: {
    DOCTOR: 'DOCTOR',
    PATIENT: 'PATIENT'
  },
  APPOINTMENT_STATUS_TYPES: {
    CONFIRMED: 'CONFIRMED',
    PENDING: 'PENDING',
    CANCELLED: 'CANCELLED',
    DECLINED: 'DECLINED'
  }
}
