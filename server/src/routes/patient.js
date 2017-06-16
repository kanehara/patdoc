import { Patient } from '../models'
import logger from '../logger'

export default app => {
  app.get('/patients', async (req, res) => {
    try {
      return res.send(await Patient.find({}))
    } catch (err) {
      logger.error(`Error getting patients with err: ${err}`)
      return res.send(500)
    }
  })

  app.get('/patients/:patientId', async ({params: { patientId }}, res) => {
    try {
      return res.send(await Patient.find({_id: patientId}))
    } catch (err) {
      logger.error(`Error getting patient with id: ${patientId} with error: ${err}`)
      return res.send(500)
    }
  })
}
