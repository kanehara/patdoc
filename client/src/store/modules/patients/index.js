import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'
import patientService from './patient.service'

// Initial state
const state = {
  patients: []
}

const getters = {
  getPatients: state => state.patients,
  getPatient: state => (id) => state.patients.find(p => p._id === id)
}

const actions = {
  async [actionTypes.GET_PATIENTS] ({commit}) {
    try {
      const patients = await patientService.getAllPatients()
      commit(mutationTypes.RECEIVE_PATIENTS, {patients})
    } catch (err) {
      console.log(`Failed to get patients with error: ${err}`)
    }
  },

  async [actionTypes.GET_PATIENT] ({commit}, patientId) {
    try {
      const patient = await patientService.getPatient(patientId)
      commit(mutationTypes.RECEIVE_PATIENTS, { patients: patient })
    } catch (err) {
      console.log(`Failed to get patient with id: ${patientId} with err: ${err}`)
    }
  }
}

const mutations = {
  [mutationTypes.RECEIVE_PATIENTS] (state, {patients}) {
    state.patients = patients
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
