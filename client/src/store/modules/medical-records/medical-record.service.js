import config from '@/config'
import axios from 'axios'

export default {
  async getFiles ({ patientId }) {
    try {
      const res = await axios.get(`${config.API_HOST}/patients/${patientId}/medicalRecord`)
      return res.data
    } catch (err) {
      console.log(`Error retrieving appointments with err: ${err}`)
      return []
    }
  },

  async deleteFile ({ patientId, fileId }) {
    await axios.delete(`${config.API_HOST}/patients/${patientId}/medicalRecord/${fileId}`)
  }
}
