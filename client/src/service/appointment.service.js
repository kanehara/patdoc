import config from '@/config'
import axios from 'axios'

export default {
  async getAppointment (userId) {
    return await axios.get(`${config.API_HOST}/users/${userId}/appointments`)
  },

  async cancelAppointment (userId, appointmentId) {
    return await axios
      .patch(`${config.API_HOST}/users/${userId}/appointments/${appointmentId}`, { status: 'Cancelled' })
  }
}
