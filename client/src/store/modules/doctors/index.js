import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'
import doctorService from './doctor.service'

const state = {
  doctors: []
}

const getters = {
  doctors: state => state.doctors
}

const actions = {
  async [actionTypes.GET_DOCTORS] ({ commit }) {
    try {
      const doctors = await doctorService.getAllDoctors()
      commit(mutationTypes.RECEIVE_DOCTORS, doctors)
    } catch (err) {
      console.log(`Error retrieving doctors: ${err}`)
    }
  }
}

const mutations = {
  [mutationTypes.RECEIVE_DOCTORS] (state, doctors) {
    state.doctors = doctors
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

