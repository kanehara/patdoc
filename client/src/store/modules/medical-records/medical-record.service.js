import config from '@/config'
import axios from 'axios'

export default {
  async getFiles ({ patientId }) {
    const res = axios.get(`${config.API_HOST}/patients/${patientId}/medicalRecord`)
    return res.data
  },

  async deleteFile ({ patientId, fileId }) {
    axios.delete(`${config.API_HOST}/patients/${patientId}/medicalRecord/${fileId}`)
  }
}
