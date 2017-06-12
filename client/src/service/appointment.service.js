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
  }
}
