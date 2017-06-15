import Vue from 'vue'
import Vuex from 'vuex'
import appointments from './modules/appointments'
import medicalRecord from './modules/medical-records'
import users from './modules/patients'
import createLogger from 'vuex/dist/logger'
import USER_TYPES from './user-types'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const actions = {}

const getters = {
  isUserPatient: state => {
    return state.userType === USER_TYPES.PATIENT
  },
  isUserDoctor: state => {
    return state.userType === USER_TYPES.DOCTOR
  }
}

const state = {
  // TODO: set state on login
  userType: USER_TYPES.DOCTOR,
  userId: ''
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  modules: {
    appointments,
    medicalRecord,
    users
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
