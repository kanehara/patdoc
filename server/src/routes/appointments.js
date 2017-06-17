import { Appointment } from '../models'
import logger from '../logger'

export default app => {
  app.get('/patients/:patientId/appointments', async ({params: { patientId }}, res) => {
    try {
      const apps = await Appointment.find({ patient: patientId }).populate('doctor').populate('patient')
      if (apps && apps.length) {
        return res.send(apps)
      } else {
        return res.send([])
      }
    } catch (err) {
      logger.error(`Error trying to retrieve appointments for patient with id: ${patientId} with err: ${err}`)
      return res.sendStatus(500)
    }
  })

  app.patch('/patients/:patientId/appointments/:appointmentId', async ({params: { patientId, appointmentId }, body}, res) => {
    try {
      const app = await Appointment.findById(appointmentId).populate('doctor').populate('patient')
      if (app.patient.id !== patientId) {
        return res.sendStatus(400)
      }
      Object.assign(app, body)
      const updatedApp = await app.save()
      if (updatedApp.errors) {
        logger.error(`Error saving updated appointment: ${updatedApp.errors}`)
        return res.sendStatus(500)
      } else {
        return res.send(updatedApp._doc)
      }
    } catch (err) {
      logger.error(`Error trying to patch appointment with id: ${appointmentId} with err: ${err}`)
      return res.sendStatus(500)
    }
  })

  app.post('/patients/:patientId/appointments', async ({params: { patientId }, body}, res) => {
    try {
      if (patientId !== body.patient) {
        logger.warn(`The patient ID: ${patientId} in POST path for an appointment does not match the ID in the body: ${body.patient}`)
        return res.sendStatus(400)
      }
      const app = new Appointment(body)
      const savedApp = await app.save()
      if (savedApp) {
        return res.send(savedApp)
      } else {
        return res.sendStatus(500)
      }
    } catch (err) {
      logger.error(`Error creating new appointment: ${err}`)
      return res.sendStatus(500)
    }
  })

  app.delete('/patients/:patientId/appointments/:appointmentId', async ({params: { patientId, appointmentId }}, res) => {
    try {
      await Appointment.remove({_id: appointmentId, patient: patientId})
      return res.sendStatus(200)
    } catch (err) {
      logger.error(`Error trying to delete appointment for patient with id: ${patientId} 
                      and appointment id: ${appointmentId} with error: ${err}`)
      return res.sendStatus(500)
    }
  })
}
