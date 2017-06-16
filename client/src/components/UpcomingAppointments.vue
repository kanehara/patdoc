<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div class="ui divided items">
      <template v-for="app in appointments">
        <AppointmentDetails :appointment="app">
          <div class="status" slot="status">
            <span :class="{
              confirmed: app.status === statusTypes.CONFIRMED,
              pending: app.status === statusTypes.PENDING,
              cancelled: app.status === statusTypes.CANCELLED,
              declined: app.status === statusTypes.DECLINED
            }">
              {{ app.status | capJustFirstChar }}
            </span>
          </div>
          <div v-if="app.declinationReason && app.declinationReason.length" slot="status">
            <b>Reason for Declining:</b> {{ app.declinationReason }}
          </div>
          <div slot="actions">
            <div v-if="isUserDoctor && app.status === statusTypes.PENDING">
              <div class="positive ui button"
                   @click="acceptAppointment({ appointmentId: app._id, patientId })">
                Accept
              </div>
              <div class="negative ui button"
                   @click="openModal(app.id)">
                Decline
              </div>
            </div>
            <div v-if="isUserPatient" class="negative ui button"
                 @click="openModal(app.id)">
              Cancel
            </div>
          </div>
        </AppointmentDetails>
      </template>
      <div v-if="noAppointments">
        <h3>No upcoming appointments</h3>
      </div>
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
  import * as actionTypes from '../store/modules/appointments/action-types'
  import AppointmentDetails from './AppointmentDetails'
  import CancelAppointmentModal from './CancelAppointmentModal'
  import DeclineAppointmentModal from './DeclineAppointmentModal'
  import config from '@/config'

  export default {
    data () {
      return {
        showModal: false,
        appointmentIdSelected: null,
        statusTypes: config.APPOINTMENT_STATUS_TYPES
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
      ...mapGetters(['isUserDoctor', 'isUserPatient']),
      noAppointments () {
        return !this.appointments || !this.appointments.length
      }
    },
    filters: {
      capJustFirstChar (status) {
        const lowerCaseStatus = status.toLowerCase()
        return lowerCaseStatus.charAt(0).toUpperCase() + lowerCaseStatus.slice(1)
      }
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
