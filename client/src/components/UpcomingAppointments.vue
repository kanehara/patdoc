<template xmlns="http://www.w3.org/1999/html">
  <div>
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
              <div class="ui primary icon button cancel"
                   @click="openModal(appointment.id)">Cancel</div>
            </div>
            <div v-if="isUserPatient" class="ui primary icon button cancel"
                 @click="openModal(appointment.id)">
              Cancel
            </div>
          </div>
        </AppointmentDetails>
      </template>
    </div>
    <Modal v-if="showModal">
      <template v-if="isUserPatient">
        <h1 slot="header">Are you sure?</h1>
        <p slot="body">Are you sure you want to cancel your appointment?</p>
        <template slot="footer">
          <div class="ui primary icon button"
               @click="confirmModal">
            Confirm
          </div>
          <div class="ui secondary icon button"
             @click="closeModal">
            Cancel
          </div>
        </template>
      </template>
      <template v-if="isUserDoctor">
        <h1 slot="header">Reason for Cancellation</h1>
        <div slot="body">
          <div class="ui form">
            <div class="field">
              <label>Please provide a reason for your cancellation</label>
              <textarea rows="2"></textarea>
            </div>
          </div>
        </div>
        <template slot="footer">
          <div class="ui primary icon button"
               @click="confirmModal">
            Confirm
          </div>
          <div class="ui secondary icon button"
             @click="closeModal">
            Cancel
          </div>
        </template>
      </template>
    </Modal>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import * as actionTypes from '../store/action-types'
  import AppointmentDetails from './AppointmentDetails'
  import Modal from './Modal'

  export default {
    data () {
      return {
        showModal: false,
        appointmentIdToCancel: null
      }
    },
    components: {
      AppointmentDetails,
      Modal
    },
    props: ['appointments', 'patientId'],
    methods: {
      ...mapActions({
        cancelAppointment: actionTypes.CANCEL_APPOINTMENT
      }),
      openModal (appointmentId) {
        this.showModal = true
        this.appointmentIdToCancel = appointmentId
      },
      confirmModal () {
        this.cancelAppointment({ patientId: this.patientId, appointmentId: this.appointmentIdToCancel })
        this.showModal = false
      },
      closeModal () {
        this.showModal = false
      }
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

  .modal-container {
    textarea {
      width: 80%;
    }

    .button {
      width: initial;
    }
  }
</style>
