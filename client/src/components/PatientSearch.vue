<template>
  <div id="patient-search">
    <h1>Patient Search</h1>
    <div class="ui form">
      <div class="fields">
        <div class="field">
          <input type="text" placeholder="Search"/>
        </div>
      </div>
    </div>
    <div class="ui divided items">
      <PatientSearchRow v-for="patient in getPatients" :key="patient._id" :patient="patient"></PatientSearchRow>
    </div>
  </div>
</template>

<script>
  import * as actionTypes from '../store/modules/patients/action-types'
  import { mapGetters } from 'vuex'
  import PatientSearchRow from './PatientSearchRow.vue'
  import store from '@/store'
  import config from '@/config'

  export default {
    components: {
      PatientSearchRow
    },
    created () {
      this.$store.dispatch(actionTypes.GET_PATIENTS)
    },
    computed: {
      ...mapGetters(['getPatients'])
    },
    beforeRouteEnter (to, from, next) {
      if (store.state.login.userType !== config.USER_TYPES.DOCTOR) {
        next('/403')
      }
      next()
    }
  }
</script>

<style lang="less" scoped>
  #patient-search {
    margin: 20px 20%;
  }

  .items {
    text-align: left;
  }

  .ui.divided.items>.item:first-child {
    padding-top: 1em !important;
  }

  .ui.divided.items>.item:last-child {
    padding-bottom: 1em !important;
  }

  .ui.form .fields .field {
    margin: auto;
    width: 100%;

    input {
      box-sizing: border-box;
    }
  }
</style>
