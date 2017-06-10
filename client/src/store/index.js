import Vue from 'vue'
import Vuex from 'vuex'
import appointments from './modules/appointments'
import createLogger from 'vuex/dist/logger'
import USER_TYPES from './user-types'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const actions = {}

const getters = {}

const state = {
  loggedInUser: {
    // TODO: set state on login
    type: USER_TYPES.PATIENT,
    id: 1
  }
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
