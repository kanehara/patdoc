<template>
  <div class="ui divided items">
    <template v-for="appointment in appointments">
      <AppointmentDetails :appointment="appointment"></AppointmentDetails>
    </template>
    <div v-if="noAppointments">
      <h3>No past appointments</h3>
    </div>
  </div>
</template>

<script>
  import AppointmentDetails from './AppointmentDetails'
  export default {
    components: {
      AppointmentDetails
    },
    props: ['appointments'],
    computed: {
      noAppointments () {
        return !this.appointments || !this.appointments.length
      }
    }
  }
</script>

