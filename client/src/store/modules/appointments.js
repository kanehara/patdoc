import appointmentService from '@/service/appointment.service'
import * as types from '../mutation-types'

// Initial state
const state = {
  appointments: []
}

const getters = {
  pastAppointments: state => {
    return state.appointments
      .filter(a => a.date < new Date())
      .sort((a, b) => b.date - a.date)
  },

  upcomingAppointments: state => {
    return state.appointments
      .filter(a => a.date >= new Date())
      .sort((a, b) => a.date - b.date)
  }
}

const actions = {
  async getAppointments ({commit}, userId) {
    try {
      const appointments = await appointmentService.getAppointment(userId)
      commit(types.RECEIVE_APPOINTMENTS, { appointments })
    } catch (err) {
      console.log(`Failed to get appointments with error: ${err}`)
      // TODO: display FE error message
    }
  },

  async cancelAppointments ({commit, state}, { userId, appointmentIds }) {
    try {
      await appointmentService.cancelAppointment(userId, appointmentIds)
      commit(types.CANCEL_APPOINTMENT, { appointmentIds })
    } catch (err) {
      console.log(`Failed to cancel appointments with error: ${err}`)
      // TODO: display FE error message
    }
  }
}

const mutations = {
  [types.RECEIVE_APPOINTMENTS] (state, { appointments }) {
    state.appointments = appointments
  },

  [types.ADD_APPOINTMENT] (state, { appointment }) {
    state.appointments.push(appointment)
  },

  [types.CANCEL_APPOINTMENT] (state, { ids }) {
    ids.forEach(id => {
      const i = state.appointments.findIndex(a => a.id === id)
      if (i !== -1) {
        delete state.appointments[i]
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
