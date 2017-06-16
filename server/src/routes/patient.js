import { Patient } from '../models'
import logger from '../logger'

export default app => {
  app.get('/patients', (req, res) => {
    Patient.find({})
      .then(patients => res.send(patients))
      .catch(err => {
        logger.error(`Error getting patients with err: ${err}`)
        res.send(500)
      })
  })

  app.get('/patients/:patientId', ({params: { patientId }}, res) => {
    Patient.find({_id: patientId})
      .then(patient => res.send(patient))
      .catch(err => {
        logger.error(`Error getting patient with id: ${patientId} with error: ${err}`)
        res.send(404)
      })
  })
}
