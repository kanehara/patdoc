import * as mutationTypes from './mutation-types'
import * as actionTypes from './action-types'
import medicalRecordService from './medical-record.service'

// Initial state
const state = {
  files: []
}

const getters = {
}

const actions = {
  async [actionTypes.GET_FILES] ({commit}, { patientId }) {
    try {
      const files = await medicalRecordService.getFiles({ patientId })
      commit(mutationTypes.RECEIVE_FILES, { files })
    } catch (err) {
      console.log(`Failed to get medical record files with error: ${err}`)
    }
  },

  async [actionTypes.DELETE_FILE] ({commit}, { patientId, fileId }) {
    try {
      await medicalRecordService.deleteFile({ patientId, fileId })
      commit(mutationTypes.REMOVE_FILE, { fileId })
    } catch (err) {
      console.log(`Failed to delete medical record file with error: ${err}`)
    }
  }
}

const mutations = {
  [mutationTypes.RECEIVE_FILES] (state, { files }) {
    state.files = files
  },
  [mutationTypes.ADD_FILE] (state, { file }) {
    state.files.push(file)
  },
  [mutationTypes.REMOVE_FILE] (state, { fileId }) {
    const idx = state.files.findIndex(f => f.id === fileId)
    if (idx !== -1) {
      state.files.splice(idx, 1)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
