import user from '../../api/user'
import * as types from '../mutation-types'
import USER_TYPES from '../user-types'

// Initial state
const state = {
  appointments: []
}

const getters = {
  pastAppointments: state => {
    return state.appointments.filter(a => a.date < new Date())
  },

  upcomingAppointments: state => {
    return state.appointments.filter(a => a.date >= new Date())
  }
}

const actions = {
  async getAppointments ({commit, rootState}, userId) {
    const id = rootState.loggedInUser.type === USER_TYPES.PATIENT
      ? rootState.loggedInUser.id
      : userId
    const appointments = await user.getAppointment(id)
    commit(types.RECEIVE_APPOINTMENTS, { appointments })
  }
}

const mutations = {
  [types.RECEIVE_APPOINTMENTS] (state, { appointments }) {
    state.appointments = appointments
  },

  [types.ADD_APPOINTMENT] (state, { appointment }) {
    state.appointments.push(appointment)
  },

  [types.REMOVE_APPOINTMENT] (state, { id }) {
    const i = state.appointments.findIndex(a => a.id === id)
    if (i !== -1) {
      delete state.appointments[i]
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
