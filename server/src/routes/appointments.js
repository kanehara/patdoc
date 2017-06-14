import { Appointment } from '../models'
import logger from '../logger'

/**
 * Builds client friendly response based on mongo result
 */
function buildResponse (appointment) {
  const response = {
    id: appointment._id,
    date: appointment.date,
    subject: appointment.subject,
    notes: appointment.notes,
    doctor: appointment.doctor.name,
    status: appointment.status
  }
  return response
}

// TODO: determine correct response code based on error
export function initAppointmentsRoutes (app) {
  app.get('/patients/:patientId/appointments', ({params: { patientId }}, res) => {
    Appointment.findOne({ patient: patientId })
      .then(a => res.send(buildResponse(a)))
      .catch(err => {
        logger.error(`Error trying to retrieve appointments for patient with id: ${patientId} with err: ${err}`)
        res.sendStatus(404)
      })
  })

  app.patch('/patients/:patientId/appointments/:appointmentId', ({params: { patientId, appointmentId }, body}, res) => {
    Appointment.findById(appointmentId)
      .then(app => {
        app = {...app, ...body}
        app.save()
          .then(updatedApp => res.send(buildResponse(updatedApp)))
          .catch(err => {
            logger.error(`Error trying to save appintment with id: ${appointmentId} with err: ${err}`)
            res.sendStatus(404)
          })
      })
      .catch(err => {
        logger.error(`Error trying to retriev appointment with id: ${appointmentId} with error: ${err}`)
      })
  })

  app.put('/patients/:patientId/appointments', ({params: { patientId }, body}, res) => {
    if (patientId !== body.patient) {
      logger.warn(`The patient ID: ${patientId} in PUT path to create an appointment does not match the ID in the body: ${body.patient}`)
      res.send(400)
    }
    const app = new Appointment(body)
    app.save()
      .then(app => res.send(buildResponse(app)))
      .catch(err => {
        logger.error(`Error creating new appointment: ${err}`)
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
