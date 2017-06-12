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
              <div class="positive ui button"
                   @click="acceptAppointment({ appointmentId: appointment.id, patientId })">
                Accept
              </div>
              <div class="negative ui button"
                   @click="openModal(appointment.id)">
                Decline
              </div>
            </div>
            <div v-if="isUserPatient" class="negative ui button"
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
        declineAppointment: actionTypes.DECLINE_APPOINTMENT,
        acceptAppointment: actionTypes.ACCEPT_APPOINTMENT
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
  @import '../style/colors';
  @import '../style/buttons';

  .ui.button {
    width: 90%;
    margin: 5px 0;
  }

  .status {
    text-align: left;
    font-weight: bold;
  }

  .confirmed {
    color: @positiveGreen;
  }

  .pending {
    color: @cautionYellow;
  }

  .declined, .cancelled {
    color: @negativeRed;
  }
</style>
