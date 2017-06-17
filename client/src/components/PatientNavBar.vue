<template>
  <div>
    <div class="navbar">
      <router-link :to="profile">Profile</router-link>
      <router-link :to="appointments">Appointments</router-link>
      <router-link :to="medicalRecord">Medical Record</router-link>
    </div>
    <div v-if="isUserDoctor" class="selectedPatient">
      <img class="ui avatar image" src="../assets/placeholder.png" />
      <span>{{ selectedPatient.name }}</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['patientId'],
    computed: {
      ...mapGetters(['getPatient', 'isUserDoctor']),
      profile () {
        return `/patients/${this.patientId}/profile`
      },
      appointments () {
        return `/patients/${this.patientId}/appointments`
      },
      medicalRecord () {
        return `/patients/${this.patientId}/medicalRecord`
      },
      selectedPatient () {
        return this.getPatient(this.patientId)
      }
    }
  }
</script>

<style scoped>
  .selectedPatient {
    margin-top: 10px;
    font-weight: bold;
  }

  .navbar {
    margin-top: 10px;
  }
</style>
