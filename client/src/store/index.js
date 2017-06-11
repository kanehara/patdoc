import Vue from 'vue'
import Vuex from 'vuex'
import appointments from './modules/appointments'
import createLogger from 'vuex/dist/logger'
import USER_TYPES from './user-types'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const actions = {}

const getters = {
  isUserPatient: state => {
    return state.loggedInUserType === USER_TYPES.PATIENT
  },
  isUserDoctor: state => {
    return state.loggedInUserType === USER_TYPES.DOCTOR
  }
}

const state = {
  // TODO: set state on login
  loggedInUserType: USER_TYPES.DOCTOR
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  modules: {
    appointments
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
