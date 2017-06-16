<template>
  <div>
    <h2>New Appointment</h2>
    <div class="ui form">
      <p>* Required fields</p>
      <div class="fields">
        <div class="four wide field datepicker">
          <label>Date*</label>
          <datepicker
            ref="datepicker"
            :value="date"
            v-model="date">
          </datepicker>
          <i class="caret down icon"></i>
        </div>
        <div class="four wide field timepicker">
          <label>Time*</label>
          <timepicker
            v-model="time"
            format="hh:mm A"
            :minute-interval="5"
            :hide-clear-button="true">
          </timepicker>
          <i class="caret down icon"></i>
        </div>
      </div>
      <div class="field" v-if="isUserPatient">
        <label>Doctor*</label>
        <DoctorPicker v-model="doctor"></DoctorPicker>
      </div>
      <div class="field">
        <label>Subject*</label>
        <input type="text" v-model="subject"/>
      </div>
      <div class="field">
        <label>Notes</label>
        <textarea rows="3" v-model="notes"></textarea>
      </div>
      <button class="ui button" :disabled="missingFields" @click="submitNewAppointment">Submit</button>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import Timepicker from 'vue2-timepicker'
  import DoctorPicker from './DoctorPicker'
  import { mapGetters, mapActions } from 'vuex'
  import * as actionTypes from '../store/modules/appointments/action-types'

  export default {
    props: ['patientId'],
    data () {
      return {
        date: new Date(),
        time: {
          hh: '12',
          mm: '00',
          A: 'AM'
        },
        doctor: null,
        subject: null,
        notes: null
      }
    },
    methods: {
      ...mapActions({
        scheduleAppointment: actionTypes.SCHEDULE_APPOINTMENT
      }),
      submitNewAppointment () {
        if (!this.missingFields) {
          const { date, time, doctor, subject, notes } = this
          const payload = {
            date,
            time,
            doctor,
            subject,
            notes,
            patientId: this.patientId
          }
          this.scheduleAppointment(payload)
        }
      }
    },
    components: {
      Datepicker,
      Timepicker,
      DoctorPicker
    },
    computed: {
      ...mapGetters(['isUserPatient', 'allAppointments']),
      missingFields () {
        return !this.date || !this.time || (this.isUserPatient && !this.doctor) || !this.subject
      }
    },
    watch: {
      allAppointments (newVal) {
        // Redirect to appointments page after new appointment is saved
        this.$router.push(`/patients/${this.patientId}/appointments`)
      }
    }
  }
</script>

<style lang="less">
  @import '../style/colors';

  .ui.form {
    width: 80%;
    margin: auto;
    text-align: left;

    textarea {
      resize: none;
      box-sizing: border-box;
    }

    input {
      box-sizing: border-box;
    }

    .caret.down.icon {
      pointer-events: none;
    }

    .datepicker, .timepicker {
      position: relative;

      .icon.caret.down {
        position: absolute;
        right: 10px;
        top: 38px;
      }
    }
  }
  @media(min-width: 768px) {
    .ui.form {
      width: 40%;
    }
  }

  @dropdownBorder: 1px solid rgba(34,36,38,.15);
  @dropdownBoxShadow: 0 1px 6px rgba(0,0,0,0.15);
  @dropdownHeight: 282px;

  // Overrides
  .time-picker {
    @timePickerWidth: 15em;
    font-family: inherit !important;
    width: initial !important;

    .dropdown {
      top: ~"calc(2.3em + 6px)" !important;
      box-shadow: none;
      border: @dropdownBorder;
      height: @dropdownHeight !important;
      width: @timePickerWidth !important;

      .select-list {
        height: @dropdownHeight - 4px !important;
        width: @timePickerWidth !important;
      }
    }

    input.display-time {
      height: initial !important;
    }
  }

  @hoverBorder: 1px solid @secondaryBlue;

  .vdp-datepicker__calendar {
    box-shadow: @dropdownBoxShadow;
  }

  // Date hover
  .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
    border: @hoverBorder;
  }

  // Selected date
  .vdp-datepicker__calendar .cell.selected, .vdp-datepicker__calendar .cell.selected.highlighted, .vdp-datepicker__calendar .cell.selected:hover {
    background: @secondaryBlue;
    color: white;
  }

  // Time hover
  .time-picker .dropdown ul li:not(.hint):hover {
    border: @hoverBorder;
    background: none !important;
  }

  // Selected time
  .time-picker .dropdown ul li.active, .time-picker .dropdown ul li.active:hover {
    background: @secondaryBlue !important;
  }

  .time-picker .dropdown ul li {
    border: 1px solid transparent;
    box-sizing: border-box;
  }

  .time-picker .dropdown ul {
    padding: 2px !important;
  }

</style>
