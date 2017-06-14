<template>
  <div class="navbar">
    <router-link :to="profile">Profile</router-link>
    <router-link :to="appointments">Appointments</router-link>
    <router-link :to="medicalRecord">Medical Record</router-link>
  </div>
</template>

<script>
  export default {
    computed: {
      profile () {
        return `/patients/${this.$route.params.patientId}/profile`
      },
      appointments () {
        return `/patients/${this.$route.params.patientId}/appointments`
      },
      medicalRecord () {
        return `/patients/${this.$route.params.patientId}/medicalRecord`
      }
    }
  }
</script>
