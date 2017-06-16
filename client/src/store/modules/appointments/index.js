import appointmentService from './appointment.service'
import * as mutationTypes from './mutation-types'
import * as actionTypes from './action-types'
import config from '@/config'

// Initial state
const state = {
  appointments: [],
  selected: []
}

const filterForDoctor = (a, rootState) =>
  rootState.login.userType === config.USER_TYPES.DOCTOR ? a.doctor._id === rootState.login.userId : true

const getters = {
  allAppointments: (state, getters, rootState) => state.appointments.filter(a => filterForDoctor(a, rootState)),

  pastAppointments: (state, getters) => {
    return getters.allAppointments
      .filter(a => new Date(a.date) < new Date())
      .filter(a => a.status === config.APPOINTMENT_STATUS_TYPES.CONFIRMED)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  },

  upcomingAppointments: (state, getters) => {
    return getters.allAppointments
      .filter(a => new Date(a.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }
}

const actions = {
  async [actionTypes.GET_APPOINTMENTS] ({ commit }, patientId) {
    try {
      const appointments = await appointmentService.getAppointments({ patientId })
      commit(mutationTypes.RECEIVE_APPOINTMENTS, { appointments })
    } catch (err) {
      console.log(`Failed to get appointments with error: ${err}`)
    }
  },

  async [actionTypes.CANCEL_APPOINTMENT] ({ commit }, { patientId, appointmentId }) {
    try {
      await appointmentService.cancelAppointment({ patientId, appointmentId })
      commit(mutationTypes.CANCEL_APPOINTMENT, { appointmentId })
    } catch (err) {
      console.log(`Failed to cancel appointments with error: ${err}`)
    }
  },

  async [actionTypes.DECLINE_APPOINTMENT] ({ commit }, { patientId, appointmentId, declinationReason }) {
    try {
      await appointmentService.declineAppointment({ patientId, appointmentId, declinationReason })
      commit(mutationTypes.DECLINE_APPOINTMENT, { appointmentId, declinationReason })
    } catch (err) {
      console.log(`Failed to decline appointment with error: ${err}`)
    }
  },

  async [actionTypes.ACCEPT_APPOINTMENT] ({ commit }, { patientId, appointmentId }) {
    try {
      await appointmentService.acceptAppointment({ patientId, appointmentId })
      commit(mutationTypes.ACCEPT_APPOINTMENT, { appointmentId })
    } catch (err) {
      console.log(`Failed to accept appointment with error: ${err}`)
    }
  },

  async [actionTypes.SCHEDULE_APPOINTMENT] ({ commit }, payload) {
    try {
      const appointment = await appointmentService.scheduleAppointment(payload)
      commit(mutationTypes.ADD_APPOINTMENT, appointment)
    } catch (err) {
      console.log(`Failed to schedule appointment: ${err}`)
    }
  }
}

const findAppointment = (state, appointmentId) => {
  console.log(state.appointments)
  const i = state.appointments.findIndex(a => a && a._id === appointmentId)
  if (i !== -1) {
    return state.appointments[i]
  }
}

const mutations = {
  [mutationTypes.RECEIVE_APPOINTMENTS] (state, { appointments }) {
    state.appointments = appointments
  },

  [mutationTypes.ADD_APPOINTMENT] (state, appointment) {
    state.appointments.push(appointment)
  },

  [mutationTypes.CANCEL_APPOINTMENT] (state, { appointmentId }) {
    findAppointment(state, appointmentId).status = config.APPOINTMENT_STATUS_TYPES.CANCELLED
  },

  [mutationTypes.DECLINE_APPOINTMENT] (state, { appointmentId, declinationReason }) {
    const appointment = findAppointment(state, appointmentId)
    appointment.status = config.APPOINTMENT_STATUS_TYPES.DECLINED
    appointment.declinationReason = declinationReason
  },

  [mutationTypes.ACCEPT_APPOINTMENT] (state, { appointmentId }) {
    const appointment = findAppointment(state, appointmentId)
    appointment.status = config.APPOINTMENT_STATUS_TYPES.CONFIRMED
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
