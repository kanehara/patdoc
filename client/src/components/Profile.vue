<template>
  <div>
    <h1>Profile</h1>
    <div class="profile">
      <div class="profileImage">
        <img class="ui medium circular image" src="../assets/placeholder.png">
      </div>
      <div class="info">
        <div><b>Name:</b> {{ patient.name }}</div>
        <div><b>Age:</b> {{ patient.age }}</div>
        <div><b>Email:</b> {{ patient.emailAddress }}</div>
        <div><b>Mailing Address:</b> {{ patient.mailingAddress }}</div>
        <div><b>Phone Number:</b> {{ patient.phoneNumber | formatPhoneNumber }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as actionTypes from '../store/modules/patients/action-types'

  export default {
    props: ['patientId'],
    computed: {
      ...mapGetters(['getPatient']),
      patient () {
        const patient = this.getPatient(this.patientId)
        return patient || { name: '', age: '', emailAddress: '', mailingAddress: '', phoneNumber: '' }
      }
    },
    created () {
      const patient = this.getPatient(this.patientId)
      if (!patient) {
        this.$store.dispatch(actionTypes.GET_PATIENT, this.patientId)
      }
    },
    filters: {
      formatPhoneNumber (number) {
        const numberString = number.toString()
        return `(${numberString.substr(0, 3)}) ${numberString.substr(3, 3)}-${numberString.substr(6)}`
      }
    }
  }
</script>

<style lang=less scoped>
  .profile {
    width: 75%;
    margin: 10px auto;
    display: flex;

    .profileImage {
      flex: 1 0 100px;
      flex-wrap: wrap;

      img {
        width: 100%;
      }
    }

    .info {
      flex: 3;
      flex-wrap: wrap;
      text-align: left;
      margin: 35px;
      font-size: 20px;
    }
  }
</style>
