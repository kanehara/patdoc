// Map of user ID to their appointments
const MOCK_APPOINTMENTS = {
  1: [
    {
      id: 1,
      date: new Date('October 13, 2017 11:13:00'),
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'Confirmed'
    }, {
      id: 2,
      date: new Date('October 14, 2017 11:13:00'),
      subject: 'Knee surgery',
      notes: 'Knee surgery to be done',
      doctor: 'Dr. Hans Zimmer',
      status: 'Pending'
    }, {
      id: 3,
      date: new Date('October 13, 2017 01:13:00'),
      subject: 'Complex heart procedure',
      notes: 'Some complex procdure',
      doctor: 'Dr. Hans Zimmer',
      status: 'Pending'
    }, {
      id: 4,
      date: new Date('January 13, 2017 11:13:00'),
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'Confirmed'
    }, {
      id: 5,
      date: new Date('March 13, 2017 11:13:00'),
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'Confirmed'
    }, {
      id: 6,
      date: new Date('May 13, 2017 11:13:00'),
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'Pending'
    }
  ],
  2: [],
  3: []
}

export function initAppointmentsRoutes (app) {
  app.get('/patients/:patientId/appointments', ({params: { patientId }}, res) => {
    const appointments = MOCK_APPOINTMENTS[patientId]
    appointments ? res.send(appointments) : res.sendStatus(404)
  })

  app.get('/patients/:patientId/appointments/:appointmentId', ({params: { patientId, appointmentId }}, res) => {
    const appointments = MOCK_APPOINTMENTS[patientId]
    if (appointments) {
      const appointment = appointments.find(a => a.id === Number(appointmentId))
      appointment ? res.send(appointment) : res.sendStatus(404)
    } else {
      res.sendStatus(404)
    }
  })

  app.patch('/patients/:patientId/appointments/:appointmentId', ({params: { patientId, appointmentId }, body}, res) => {
    const appointments = MOCK_APPOINTMENTS[patientId]
    if (appointments) {
      let appointment = appointments.find(a => a.id === Number(appointmentId))
      if (appointment) {
        appointment = { ...appointment, ...body }
        res.send(appointment)
      } else {
        res.sendStatus(404)
      }
    } else {
      res.sendStatus(404)
    }
  })

  app.put('/patients/:patientId/appointments', ({params: { patientId }, body}, res) => {
    if (MOCK_APPOINTMENTS[patientId]) {
      MOCK_APPOINTMENTS[patientId].push(body)
    } else {
      MOCK_APPOINTMENTS[patientId] = [body]
    }
  })

  app.delete('/patients/:patientId/appointments/:appointmentId', ({params: { patientId, appointmentId }}, res) => {
    const appointments = MOCK_APPOINTMENTS[patientId]
    if (appointments) {
      const idx = appointments.findIndex(a => a.id === Number(appointmentId))
      idx !== -1 ? appointments.slice(idx, 1) : res.send(404)
    } else {
      res.send(404)
    }
  })
}
