import config, { USER_TYPES } from '@/config'
import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'
import axios from 'axios'

const initialState = {
  userType: '',
  userId: '',
  emailAddress: '',
  loginFailed: false,
  token: null
}

const state = { ...initialState }

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
    state = { ...initialState, loginFailed: true }
  }
}

const getters = {
  isUserPatient: state => state.userType.toUpperCase() === USER_TYPES.PATIENT,
  isUserDoctor: state => state.userType.toUpperCase() === USER_TYPES.DOCTOR,
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
