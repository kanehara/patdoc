import config from '@/config'
import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'
import axios from 'axios'

const setInitialState = state => {
  state.userType = ''
  state.userId = ''
  state.emailAddress = ''
  state.loginFailed = false
  state.token = null
}

const state = {}
setInitialState(state)

const actions = {
  async [actionTypes.SUBMIT_LOGIN] ({ commit }, payload) {
    try {
      const response = await axios.post(`${config.API_HOST}/login`, payload)
      const auth = response.data.auth
      const token = response.data.token
      commit(mutationTypes.LOGIN_SUCCESS, { auth, token })
    } catch (err) {
      console.log(`Error posting login form: ${err}`)
      commit(mutationTypes.LOGIN_FAILURE)
    }
  }
}

const mutations = {
  [mutationTypes.LOGIN_SUCCESS] (state, { auth: { _id, userType, emailAddress }, token }) {
    state.userId = _id
    state.userType = userType
    state.emailAddress = emailAddress
    state.loginFailed = false
    state.token = token
  },

  [mutationTypes.LOGIN_FAILURE] (state) {
    setInitialState(state)
    state.loginFailed = true
  }
}

const getters = {
  isUserPatient: state => state.userType.toUpperCase() === config.USER_TYPES.PATIENT,
  isUserDoctor: state => state.userType.toUpperCase() === config.USER_TYPES.DOCTOR,
  loginFailed: state => state.loginFailed,
  redirectToSearch: (state, getters) => getters.isUserDoctor && !state.loginFailed,
  redirectToProfile: (state, getters) => getters.isUserPatient && !state.loginFailed
}

export default {
  actions,
  mutations,
  getters,
  state
}
