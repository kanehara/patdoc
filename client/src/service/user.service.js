const users = {
  1: {

  },
  2: {

  },
  3: {

  }
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

  getMedicalRecord (userId) {
    return medicalRecords[userId] ? Promise.resolve(medicalRecords[userId])
      : Promise.reject(`Cannot find medical record for user with id : ${userId}`)
  }
}
