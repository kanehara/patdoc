// Map of user ID to their appointments
const appointments = {
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

export default {
  getAppointment (userId) {
    return appointments[userId] ? Promise.resolve(appointments[userId].slice())
      : Promise.reject(`Cannot find appointments for user with id: ${userId}`)
  },

  cancelAppointment (userId, appointmentId) {
    const idx = appointments[userId].findIndex(a => a.id === appointmentId)
    if (idx !== -1) {
      appointments[userId].splice(idx, 1)
    }
  }
}
