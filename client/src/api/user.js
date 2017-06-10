const users = {
  1: {

  },
  2: {

  },
  3: {

  }
}

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const appointments = {
  1: [
    {
      id: 1,
      date: tomorrow,
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'confirmed'
    }, {
      id: 2,
      date: tomorrow,
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'cancelled'
    }, {
      id: 3,
      date: tomorrow,
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'pending'
    }, {
      id: 4,
      date: yesterday,
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'confirmed'
    }, {
      id: 5,
      date: yesterday,
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'confirmed'
    }, {
      id: 6,
      date: yesterday,
      subject: 'Wart removal',
      notes: 'I need a wart removed from my thumb.',
      doctor: 'Dr. Hans Zimmer',
      status: 'cancelled'
    }
  ],
  2: [],
  3: []
}

const medicalRecords = {
  1: {
  },
  2: {
  },
  3: {
  }
}

export default {

  getAllUsers () {
    return Promise.resolve(Object.values(users))
  },

  getUser (userId) {
    return users[userId] ? Promise.resolve(users[userId])
      : Promise.reject(`Cannot find user with id: ${userId}`)
  },

  getAppointment (userId) {
    return appointments[userId] ? Promise.resolve(appointments[userId])
      : Promise.reject(`Cannot find appointments for user with id: ${userId}`)
  },

  getMedicalRecord (userId) {
    return medicalRecords[userId] ? Promise.resolve(medicalRecords[userId])
      : Promise.reject(`Cannot find medical record for user with id : ${userId}`)
  }
}
