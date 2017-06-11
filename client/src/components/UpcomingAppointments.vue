<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div class="ui divided items">
      <template v-for="appointment in appointments">
        <AppointmentDetails
          :date="appointment.date"
          :person="appointment.doctor"
          :subject="appointment.subject"
          :notes="appointment.notes"
          :declinationReason="appointment.declinationReason">
          <div class="status" slot="status">
            <span :class="{
              confirmed: appointment.status === 'Confirmed',
              pending: appointment.status === 'Pending',
              cancelled: appointment.status === 'Cancelled',
              declined: appointment.status === 'Declined'
            }">
              {{ appointment.status }}
            </span>
          </div>
          <div slot="actions">
            <div v-if="isUserDoctor && appointment.status === 'Pending'">
              <div class="ui primary icon button confirmed">Accept</div>
              <div class="ui primary icon button cancel"
                   @click="openModal(appointment.id)">Decline</div>
            </div>
            <div v-if="isUserPatient" class="ui primary icon button cancel"
                 @click="openModal(appointment.id)">
              Cancel
            </div>
          </div>
        </AppointmentDetails>
      </template>
    </div>
    <template v-if="isUserPatient && showModal">
      <CancelAppointmentModal
        @cancel="closeModal"
        @confirm="confirmCancellation">
      </CancelAppointmentModal>
    </template>
    <template v-if="isUserDoctor && showModal">
      <DeclineAppointmentModal
        @cancel="closeModal"
        @confirm="confirmDeclination">
      </DeclineAppointmentModal>
    </template>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import * as actionTypes from '../store/action-types'
  import AppointmentDetails from './AppointmentDetails'
  import CancelAppointmentModal from './CancelAppointmentModal'
  import DeclineAppointmentModal from './DeclineAppointmentModal'

  export default {
    data () {
      return {
        showModal: false,
        appointmentIdSelected: null
      }
    },
    components: {
      AppointmentDetails,
      CancelAppointmentModal,
      DeclineAppointmentModal
    },
    props: ['appointments', 'patientId'],
    methods: {
      ...mapActions({
        cancelAppointment: actionTypes.CANCEL_APPOINTMENT,
        declineAppointment: actionTypes.DECLINE_APPOINTMENT
      }),
      openModal (appointmentId) {
        this.showModal = true
        this.appointmentIdSelected = appointmentId
      },
      confirmCancellation () {
        const { patientId, appointmentIdSelected: appointmentId } = this
        this.cancelAppointment({ patientId, appointmentId })
        this.closeModal()
      },
      confirmDeclination (declinationReason) {
        const { patientId, appointmentIdSelected: appointmentId } = this
        this.declineAppointment({ patientId, appointmentId, declinationReason })
        this.closeModal()
      },
      closeModal () {
        this.declinationReason = ''
        this.showModal = false
        this.showDeclinationReasonRequiredMessage = false
      }
    },
    computed: {
      ...mapGetters(['isUserDoctor', 'isUserPatient'])
    }
  }
</script>

<style lang="less" scoped>
  @positiveGreen: #0fbf40;
  @cautionYellow: #ec8e22;
  @negativeRed: #ed0f00;
  @secondaryGray: #979797;
  @secondaryGrayHover: #828282;

  .status {
    text-align: left;
    font-weight: bold;
  }

  // Important for overriding semantic
  .button {
    width: 90%;
    margin: 5px 0;

    &.secondary {
      background-color: @secondaryGray;

      &:hover {
        background-color: @secondaryGrayHover;
      }
    }
  }

  .confirmed {
    color: @positiveGreen;

    &.button {
      background-color: @positiveGreen !important;
    }
  }

  .pending {
    color: @cautionYellow;
  }

  .declined, .cancelled {
    color: @negativeRed;
  }

  .cancel {
    &.button {
      background-color: @negativeRed !important;
    }
  }
</style>
