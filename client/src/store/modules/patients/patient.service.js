import config from '@/config'
import axios from 'axios'

export default {
  async getAllPatients () {
    try {
      const res = await axios.get(`${config.API_HOST}/patients`)
      return res.data
    } catch (err) {
      console.log(`Error trying to get all patients with error: ${err}`)
    }
  },

  async getPatient (patientId) {
    try {
      const res = await axios.get(`${config.API_HOST}/patients/${patientId}`)
      return res.data
    } catch (err) {
      console.log(`Error trying to get patient with id: ${patientId} with error: ${err}`)
    }
  }
}
