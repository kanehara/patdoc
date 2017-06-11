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
      .filter(a => new Date(a.date) < new Date())
      .filter(a => a.status === 'Confirmed')
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  },

  upcomingAppointments: state => {
    return state.appointments
      .filter(a => new Date(a.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }
}

const actions = {
  async [actionTypes.GET_APPOINTMENTS] ({commit}, patientId) {
    try {
      const appointments = await appointmentService.getAppointments({ patientId })
      commit(mutationTypes.RECEIVE_APPOINTMENTS, { appointments })
    } catch (err) {
      console.log(`Failed to get appointments with error: ${err}`)
      // TODO: display FE error message
    }
  },

  async [actionTypes.CANCEL_APPOINTMENT] ({commit, state}, { patientId, appointmentId }) {
    try {
      await appointmentService.cancelAppointment({ patientId, appointmentId })
      commit(mutationTypes.CANCEL_APPOINTMENT, { appointmentId })
    } catch (err) {
      console.log(`Failed to cancel appointments with error: ${err}`)
      // TODO: display FE error message
    }
  },

  async [actionTypes.DECLINE_APPOINTMENT] ({commit}, { patientId, appointmentId, declinationReason }) {
    try {
      await appointmentService.declineAppointment({ patientId, appointmentId, declinationReason })
      commit(mutationTypes.DECLINE_APPOINTMENT, { appointmentId, declinationReason })
    } catch (err) {
      console.log(`Failed to decline appointment with error: ${err}`)
      // TODO: display FE error message
    }
  },

  async [actionTypes.ACCEPT_APPOINTMENT] ({commit}, { patientId, appointmentId }) {
    try {
      await appointmentService.acceptAppointment({ patientId, appointmentId })
      commit(mutationTypes.ACCEPT_APPOINTMENT, { appointmentId })
    } catch (err) {
      console.log(`Failed to accept appointment with error: ${err}`)
      // TODO: display FE error message
    }
  }
}

const findAppointment = appointmentId => {
  const i = state.appointments.findIndex(a => a && a.id === appointmentId)
  if (i !== -1) {
    return state.appointments[i]
  }
}

const mutations = {
  [mutationTypes.RECEIVE_APPOINTMENTS] (state, { appointments }) {
    state.appointments = appointments
  },

  [mutationTypes.ADD_APPOINTMENT] (state, { appointment }) {
    state.appointments.push(appointment)
  },

  [mutationTypes.CANCEL_APPOINTMENT] (state, { appointmentId }) {
    findAppointment(appointmentId).status = 'Cancelled'
  },

  [mutationTypes.DECLINE_APPOINTMENT] (state, { appointmentId, declinationReason }) {
    const appointment = findAppointment(appointmentId)
    appointment.status = 'Declined'
    appointment.declinationReason = declinationReason
  },

  [mutationTypes.ACCEPT_APPOINTMENT] (state, { appointmentId }) {
    const appointment = findAppointment(appointmentId)
    appointment.status = 'Confirmed'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
