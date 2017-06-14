<template>
  <div>
    <h1>Patient Search</h1>
    <div class="ui divided items">
      <PatientSearchRow v-for="patient in patients" :key="patient._id" :patient="patient"></PatientSearchRow>
    </div>
  </div>
</template>

<script>
  import * as actionTypes from '../store/modules/patients/action-types'
  import { mapGetters } from 'vuex'
  import PatientSearchRow from './PatientSearchRow.vue'

  export default {
    components: {
      PatientSearchRow
    },
    created () {
      this.$store.dispatch(actionTypes.GET_PATIENTS)
    },
    computed: {
      ...mapGetters(['patients'])
    }
  }
</script>

<style lang="less" scoped>
  .items {
    text-align: left;
    margin: 20px 20%;
  }

  .ui.divided.items>.item:first-child {
    padding-top: 1em !important;
  }

  .ui.divided.items>.item:last-child {
    padding-bottom: 1em !important;
  }
</style>
