import { Doctor } from '../models'
import logger from '../logger'

export default app => {
  app.get('/doctors', (req, res) => {
    Doctor.find({})
      .then(doctors => res.send(doctors))
      .catch(err => {
        logger.error(`Error getting doctors with err: ${err}`)
      })
  })
}
