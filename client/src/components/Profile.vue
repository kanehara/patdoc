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
        <div><b>Phone Number:</b> {{ patient.phoneNumber }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as actionTypes from '../store/modules/patients/action-types'

  export default {
    computed: {
      patient () {
        const patient = this.$store.getters.getPatient(this.$route.params.patientId)
        return patient || { name: '', age: '', emailAddress: '', mailingAddress: '', phoneNumber: '' }
      }
    },

    created () {
      const patient = this.$store.getters.getPatient(this.$route.params.patientId)
      if (!patient) {
        this.$store.dispatch(actionTypes.GET_PATIENTS)
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
