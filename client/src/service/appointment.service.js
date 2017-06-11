// Map of user ID to their appointments
const appointments = {
  1: [
    {
      id: 1,
      date: new Date('October 13, 2017 11:13:00'),
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'confirmed'
    }, {
      id: 2,
      date: new Date('October 14, 2017 11:13:00'),
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'cancelled'
    }, {
      id: 3,
      date: new Date('October 13, 2017 01:13:00'),
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'pending'
    }, {
      id: 4,
      date: new Date('January 13, 2017 11:13:00'),
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'confirmed'
    }, {
      id: 5,
      date: new Date('March 13, 2017 11:13:00'),
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'confirmed'
    }, {
      id: 6,
      date: new Date('May 13, 2017 11:13:00'),
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'cancelled'
    }
  ],
  2: [],
  3: []
}

export default {
  getAppointment (userId) {
    return appointments[userId] ? Promise.resolve(appointments[userId])
      : Promise.reject(`Cannot find appointments for user with id: ${userId}`)
  },

  cancelAppointment (userId, appointmentIds) {
    appointmentIds.forEach(id => {
      const idx = appointments[userId].findIndex(a => a.id === id)
      if (idx !== -1) {
        delete appointments[userId][idx]
      }
    })
  }
}
