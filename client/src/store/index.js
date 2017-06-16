import Vue from 'vue'
import Vuex from 'vuex'
import appointments from './modules/appointments'
import medicalRecord from './modules/medical-records'
import patients from './modules/patients'
import login from './modules/login'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    appointments,
    medicalRecord,
    patients,
    login
  },
  strict: debug,
  plugins: debug ? [createLogger(), createPersistedState()] : [createPersistedState()]
})
