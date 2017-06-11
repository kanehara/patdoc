import appointmentService from '@/service/appointment.service'
import * as mutationTypes from '../mutation-types'
import * as actionTypes from '../action-types'

// Initial state
const state = {
  appointments: [],
  selected: []
}

const getters = {
  pastAppointments: state => {
    return state.appointments
      .filter(a => a.date < new Date())
      .filter(a => a.status === 'Confirmed')
      .sort((a, b) => b.date - a.date)
  },

  upcomingAppointments: state => {
    return state.appointments
      .filter(a => a.date >= new Date())
      .sort((a, b) => a.date - b.date)
  }
}

const actions = {
  async [actionTypes.GET_APPOINTMENTS] ({commit}, patientId) {
    try {
      const appointments = await appointmentService.getAppointment(patientId)
      commit(mutationTypes.RECEIVE_APPOINTMENTS, { appointments })
    } catch (err) {
      console.log(`Failed to get appointments with error: ${err}`)
      // TODO: display FE error message
    }
  },

  async [actionTypes.CANCEL_APPOINTMENTS] ({commit, state}, { patientId, appointmentIds }) {
    try {
      await appointmentService.cancelAppointment(patientId, appointmentIds)
      commit(mutationTypes.CANCEL_APPOINTMENT, { appointmentIds })
    } catch (err) {
      console.log(`Failed to cancel appointments with error: ${err}`)
      // TODO: display FE error message
    }
  }
}

const mutations = {
  [mutationTypes.RECEIVE_APPOINTMENTS] (state, { appointments }) {
    state.appointments = appointments
  },

  [mutationTypes.ADD_APPOINTMENT] (state, { appointment }) {
    state.appointments.push(appointment)
  },

  [mutationTypes.CANCEL_APPOINTMENT] (state, { ids }) {
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
