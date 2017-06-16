import config from '@/config'
import axios from 'axios'

export default {
  async getAppointments ({ patientId }) {
    const res = await axios.get(`${config.API_HOST}/patients/${patientId}/appointments`)
    return res.data
  },

  async cancelAppointment ({ patientId, appointmentId }) {
    const res = await axios
      .patch(`${config.API_HOST}/patients/${patientId}/appointments/${appointmentId}`, { status: 'Cancelled' })
    return res.data
  },

  async declineAppointment ({ patientId, appointmentId, declinationReason }) {
    const res = await axios
      .patch(`${config.API_HOST}/patients/${patientId}/appointments/${appointmentId}`, { status: 'Declined', declinationReason })
    return res.data
  },

  async scheduleAppointment ({date, subject, notes, doctor, patientId}) {
    const appointment = {
      date,
      subject,
      notes,
      doctor: doctor._id,
      patient: patientId,
      status: config.APPOINTMENT_STATUS_TYPES.PENDING
    }
    const res = await axios.post(`${config.API_HOST}/patients/${patientId}/appointments`, appointment)
    return res.data
  }
}
