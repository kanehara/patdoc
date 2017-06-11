<template>
  <div class="ui divided items">
    <template v-for="appointment in appointments">
      <AppointmentDetails
        :date="appointment.date"
        :person="appointment.doctor"
        :subject="appointment.subject"
        :notes="appointment.notes">
        <div class="status" slot="status">
          <span :class="{
            confirmed: appointment.status === 'Confirmed',
            pending: appointment.status === 'Pending'
          }">
            {{ appointment.status }}
          </span>
        </div>
        <div slot="actions">
          <div class="ui primary icon button">Confirm</div>
          <div class="ui primary icon button">Cancel</div>
        </div>
      </AppointmentDetails>
    </template>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import * as actionTypes from '../store/action-types'
  import AppointmentDetails from './AppointmentDetails'

  export default {
    components: {
      AppointmentDetails
    },
    props: ['appointments'],
    methods: {
      ...mapActions({
        cancelAppointments: actionTypes.CANCEL_APPOINTMENTS
      })
    }
  }
</script>

<style lang="less" scoped>
  @confirmGreen: #0f9733;
  @pendingYellow: #ec8e22;

  .status {
    text-align: left;
    font-weight: bold;
  }

  .button {
    width: 100%;
    margin: 5px 0;
  }

  .confirmed {
    color: @confirmGreen;
  }

  .pending {
    color: @pendingYellow;
  }
</style>
