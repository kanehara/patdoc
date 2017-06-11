<template>
  <div class="ui divided items">
    <template v-for="appointment in appointments">
      <AppointmentDetails
        :date="appointment.date"
        :person="appointment.doctor"
        :subject="appointment.subject"
        :notes="appointment.notes">
      </AppointmentDetails>
    </template>
  </div>
</template>

<script>
  import AppointmentDetails from './AppointmentDetails'
  export default {
    components: {
      AppointmentDetails
    },
    props: ['appointments']
  }
</script>

