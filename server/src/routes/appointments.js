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
  app.get('/users/:userId/appointments', ({params: { userId }}, res) => {
    const appointments = MOCK_APPOINTMENTS[userId]
    appointments ? res.send(appointments) : res.sendStatus(404)
  })

  app.get('/users/:userId/appointments/:appointmentId', ({params: { userId, appointmentId }}, res) => {
    const appointments = MOCK_APPOINTMENTS[userId]
    if (appointments) {
      const appointment = appointments.find(a => a.id === Number(appointmentId))
      appointment ? res.send(appointment) : res.sendStatus(404)
    } else {
      res.sendStatus(404)
    }
  })

  app.put('/users/:userId/appointments', ({params: { userId }, body}, res) => {
    if (MOCK_APPOINTMENTS[userId]) {
      MOCK_APPOINTMENTS[userId].push(body)
    } else {
      MOCK_APPOINTMENTS[userId] = [body]
    }
  })

  app.delete('/users/:userId/appointments/:appointmentId', ({params: { userId, appointmentId }}, res) => {
    const appointments = MOCK_APPOINTMENTS[userId]
    if (appointments) {
      const idx = appointments.findIndex(a => a.id === Number(appointmentId))
      idx !== -1 ? appointments.slice(idx, 1) : res.send(404)
    } else {
      res.send(404)
    }
  })
}
