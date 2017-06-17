import config from '@/config'
import axios from 'axios'

export default {
  async getFiles ({ patientId }) {
    const res = await axios.get(`${config.API_HOST}/patients/${patientId}/medicalRecord`)
    return res.data
  },

  async deleteFile ({ patientId, fileId }) {
    await axios.delete(`${config.API_HOST}/patients/${patientId}/medicalRecord/${fileId}`)
  }
}
