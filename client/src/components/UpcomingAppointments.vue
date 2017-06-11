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
            confirm: appointment.status === 'Confirmed',
            pending: appointment.status === 'Pending'
          }">
            {{ appointment.status }}
          </span>
        </div>
        <div slot="actions">
          <div v-if="isUserDoctor && appointment.status === 'Pending'">
            <div class="ui primary icon button confirm">Confirm</div>
            <div class="ui primary icon button cancel">Cancel</div>
          </div>
          <div v-if="isUserPatient" class="ui primary icon button cancel"
               @click="cancelAppointment({ patientId, appointmentId: appointment.id })">
            Cancel
          </div>
        </div>
      </AppointmentDetails>
    </template>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import * as actionTypes from '../store/action-types'
  import AppointmentDetails from './AppointmentDetails'

  export default {
    components: {
      AppointmentDetails
    },
    props: ['appointments', 'patientId'],
    methods: {
      ...mapActions({
        cancelAppointment: actionTypes.CANCEL_APPOINTMENT
      })
    },
    computed: {
      ...mapGetters(['isUserDoctor', 'isUserPatient'])
    }
  }
</script>

<style lang="less" scoped>
  @confirmGreen: #0fbf40;
  @pendingYellow: #ec8e22;
  @cancelRed: #ed0f00;

  .status {
    text-align: left;
    font-weight: bold;
  }

  .button {
    width: 100%;
    margin: 5px 0;
  }

  // Important for overriding semantic
  .confirm {
    color: @confirmGreen;

    &.button {
      background-color: @confirmGreen !important;
    }
  }

  .pending {
    color: @pendingYellow;
  }

  .cancel {
    &.button {
      background-color: @cancelRed !important;
    }
  }
</style>
