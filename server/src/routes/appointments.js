import { Appointment } from '../models'
import logger from '../logger'

// TODO: determine correct response code based on error
export function initAppointmentsRoutes (app) {
  app.get('/patients/:patientId/appointments', ({params: { patientId }}, res) => {
    Appointment.find({ patient: patientId })
      .then(apps => apps && apps.length ? res.send(apps) : res.sendStatus([]))
      .catch(err => {
        logger.error(`Error trying to retrieve appointments for patient with id: ${patientId} with err: ${err}`)
        res.sendStatus(500)
      })
  })

  app.patch('/patients/:patientId/appointments/:appointmentId', ({params: { patientId, appointmentId }, body}, res) => {
    Appointment.findById(appointmentId)
      .then(app => {
        app = {...app, ...body}
        app.save()
          .then(updatedApp => updatedApp ? res.send(updatedApp) : res.sendStatus(500))
          .catch(err => {
            logger.error(`Error trying to save appintment with id: ${appointmentId} with err: ${err}`)
            res.sendStatus(500)
          })
      })
      .catch(err => {
        logger.error(`Error trying to retriev appointment with id: ${appointmentId} with error: ${err}`)
      })
  })

  app.put('/patients/:patientId/appointments', ({params: { patientId }, body}, res) => {
    if (patientId !== body.patient) {
      logger.warn(`The patient ID: ${patientId} in PUT path to create an appointment does not match the ID in the body: ${body.patient}`)
      res.sendStatus(400)
    }
    const app = new Appointment(body)
    app.save()
      .then(app => app ? res.send(app) : res.sendStatus(500))
      .catch(err => {
        logger.error(`Error creating new appointment: ${err}`)
        res.sendStatus(500)
      })
  })

  app.delete('/patients/:patientId/appointments/:appointmentId', ({params: { patientId, appointmentId }}, res) => {
    Appointment.remove({_id: appointmentId, patient: patientId})
      .then(() => res.sendStatus(200))
      .catch(err => {
        logger.error(`Error trying to delete appointment for patient with id: ${patientId} 
                      and appointment id: ${appointmentId} with error: ${err}`)
        res.sendStatus(500)
      })
  })
}
