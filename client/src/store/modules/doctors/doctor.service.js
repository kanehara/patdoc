import axios from 'axios'
import config from '@/config'

export default {
  async getAllDoctors () {
    const response = await axios.get(`${config.API_HOST}/doctors`)
    return response.data
  }
}
