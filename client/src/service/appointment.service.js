// Map of user ID to their appointments
const appointments = {
  1: [
    {
      id: 1,
      date: new Date('October 13, 2017 11:13:00'),
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'Confirmed',
      declinationReason: null
    }, {
      id: 2,
      date: new Date('October 14, 2017 11:13:00'),
      subject: 'Knee surgery',
      notes: 'Knee surgery to be done',
      doctor: 'Dr. Hans Zimmer',
      status: 'Pending',
      declinationReason: null
    }, {
      id: 3,
      date: new Date('October 13, 2017 01:13:00'),
      subject: 'Complex heart procedure',
      notes: 'Some complex procdure',
      doctor: 'Dr. Hans Zimmer',
      status: 'Pending',
      declinationReason: null
    }, {
      id: 4,
      date: new Date('January 13, 2017 11:13:00'),
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'Confirmed',
      declinationReason: null
    }, {
      id: 5,
      date: new Date('March 13, 2017 11:13:00'),
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'Confirmed',
      declinationReason: null
    }, {
      id: 6,
      date: new Date('May 13, 2017 11:13:00'),
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'Pending',
      declinationReason: null
    }
  ],
  2: [],
  3: []
}

async function getAppointment ({ patientId, appointmentId }) {
  const idx = appointments[patientId].findIndex(a => a.id === appointmentId)
  if (idx !== -1) {
    return Promise.resolve(appointments[patientId])
  }
}

export default {
  async getAppointments ({ patientId }) {
    return appointments[patientId] ? Promise.resolve(appointments[patientId].slice())
      : Promise.reject(`Cannot find appointments for user with id: ${patientId}`)
  },

  getAppointment,

  async cancelAppointment ({ patientId, appointmentId }) {
    const appointment = await getAppointment({ patientId, appointmentId })
    appointment.status = 'Cancelled'
  },

  async declineAppointment ({ patientId, appointmentId, declinationReason }) {
    const appointment = await getAppointment({ patientId, appointmentId })
    appointment.status = 'Declined'
    appointment.declinationReason = declinationReason
  },

  async acceptAppointment ({ patientId, appointmentId }) {
    const appointment = await getAppointment({ patientId, appointmentId })
    appointment.status = 'Confirmed'
  }
}
