<template>
  <div>
    <h1>Patient Search</h1>
    <div class="ui divided items">
      <router-link to="/patients" v-for="patient in patients" class="item" :key="patient._id">
        <div class="ui tiny image">
          <img src="../assets/placeholder.png"/>
        </div>
        <div class="top aligned content">
          <div class="header">{{ patient.name }}</div>
          <div class="meta">
            <div>{{ patient.phoneNumber | formatPhoneNumber }}</div><br/>
            <div>{{ patient.emailAddress }}</div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import * as actionTypes from '../store/modules/patients/action-types'
  import { mapGetters } from 'vuex'

  export default {
    created () {
      this.$store.dispatch(actionTypes.GET_PATIENTS)
    },
    computed: {
      ...mapGetters(['patients'])
    },
    filters: {
      formatPhoneNumber (phoneNumberInt) {
        const phoneNumber = String(phoneNumberInt)
        return `(${phoneNumber.substr(0, 3)}) ${phoneNumber.substr(3, 3)}-${phoneNumber.substr(6)}`
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/colors.less';

  .items {
    text-align: left;
    margin: 20px 20%;
  }

  .item {
    &:hover {
      background: @whiteGray
    }

    text-decoration: none;
  }

  .ui.divided.items>.item:first-child {
    padding-top: 1em !important;
  }

  .ui.divided.items>.item:last-child {
    padding-bottom: 1em !important;
  }

  .header {
    position: static;
    text-align: left;
  }
</style>
