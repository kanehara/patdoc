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
            <div v-if="showAcceptDecline(app)">
              <div class="positive ui button"
                   @click="acceptAppointment({ appointmentId: app._id, patientId })">
                Accept
              </div>
              <div class="negative ui button"
                   @click="openDeclineModal(app._id)">
                Decline
              </div>
            </div>
            <div v-if="showCancel(app)" class="negative ui button"
                 @click="openCancelModal(app._id)">
              Cancel
            </div>
          </div>
        </AppointmentDetails>
      </template>
      <div v-if="noAppointments">
        <h3>No upcoming appointments</h3>
      </div>
    </div>
    <template v-if="showCancelModal">
      <CancelAppointmentModal
        @cancel="closeModal"
        @confirm="confirmCancellation">
      </CancelAppointmentModal>
    </template>
    <template v-if="showDeclineModal">
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

  const isPending = appointment => appointment.status === config.APPOINTMENT_STATUS_TYPES.PENDING
  const isCancelled = appointment => appointment.status === config.APPOINTMENT_STATUS_TYPES.CANCELLED
  const initiatedByPatient = appointment => appointment.initiatedByUserType === config.USER_TYPES.PATIENT
  const initiatedByDoctor = appointment => appointment.initiatedByUserType === config.USER_TYPES.DOCTOR

  export default {
    data () {
      return {
        showDeclineModal: false,
        showCancelModal: false,
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
      openDeclineModal (appointmentId) {
        this.showDeclineModal = true
        this.appointmentIdSelected = appointmentId
      },
      openCancelModal (appointmentId) {
        this.showCancelModal = true
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
        this.showCancelModal = false
        this.showDeclineModal = false
      },
      showAcceptDecline (app) {
        return (this.isUserDoctor && initiatedByPatient(app) && isPending(app)) ||
          (this.isUserPatient && initiatedByDoctor(app) && isPending(app))
      },
      showCancel (app) {
        return (this.isUserPatient && initiatedByPatient(app) && !isCancelled(app)) ||
          (this.isUserDoctor && initiatedByDoctor(app) && isPending(app))
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
