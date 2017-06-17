import { Doctor } from '../models'
import logger from '../logger'

export default app => {
  app.get('/doctors', async (req, res) => {
    try {
      const doctors = await Doctor.find({})
      return res.send(doctors)
    } catch (err) {
      logger.error(`Error getting doctors with err: ${err}`)
      return res.sendStatus(500)
    }
  })
}
