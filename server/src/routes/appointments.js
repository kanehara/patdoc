import { Appointment } from '../models'
import logger from '../logger'

export default app => {
  app.get('/patients/:patientId/appointments', async ({params: { patientId }}, res) => {
    try {
      const apps = await Appointment.find({ patient: patientId })
      apps && apps.length ? res.send(apps) : res.send([])
    } catch (err) {
      logger.error(`Error trying to retrieve appointments for patient with id: ${patientId} with err: ${err}`)
      res.sendStatus(500)
    }
  })

  app.patch('/patients/:patientId/appointments/:appointmentId', async ({params: { patientId, appointmentId }, body}, res) => {
    try {
      const app = await Appointment.findById(appointmentId)
      if (app.patient !== patientId) {
        res.sendStatus(400)
      }
      const updatedApp = {...app, ...body}
      const savedApp = await updatedApp.save()
      savedApp ? res.send(savedApp) : res.sendStatus(500)
    } catch (err) {
      logger.error(`Error trying to patch appintment with id: ${appointmentId} with err: ${err}`)
      res.sendStatus(500)
    }
  })

  app.post('/patients/:patientId/appointments', async ({params: { patientId }, body}, res) => {
    try {
      if (patientId !== body.patientId) {
        logger.warn(`The patient ID: ${patientId} in POST path for an appointment does not match the ID in the body: ${body.patientId}`)
        res.sendStatus(400)
      }
      const app = new Appointment(body)
      const savedApp = await app.save()
      savedApp ? res.send(savedApp) : res.sendStatus(500)
    } catch (err) {
      logger.error(`Error creating new appointment: ${err}`)
      res.sendStatus(500)
    }
  })

  app.delete('/patients/:patientId/appointments/:appointmentId', async ({params: { patientId, appointmentId }}, res) => {
    try {
      await Appointment.remove({_id: appointmentId, patient: patientId})
      res.sendStatus(200)
    } catch (err) {
      logger.error(`Error trying to delete appointment for patient with id: ${patientId} 
                      and appointment id: ${appointmentId} with error: ${err}`)
      res.sendStatus(500)
    }
  })
}
