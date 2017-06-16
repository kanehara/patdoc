<template>
  <div>
    <h2>New Appointment</h2>
    <div class="ui form">
      <div class="fields">
        <div class="four wide field">
          <label>Date</label>
          <datepicker></datepicker>
        </div>
        <div class="four wide field">
          <label>Time</label>
          <timepicker></timepicker>
        </div>
      </div>
      <div class="field" v-if="isUserPatient">
        <label>Doctor</label>
        <DoctorPicker></DoctorPicker>
      </div>
      <div class="field">
        <label>Subject</label>
        <input type="text"/>
      </div>
      <div class="field">
        <label>Notes</label>
        <textarea rows="3"></textarea>
      </div>
      <button class="ui button">Submit</button>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import Timepicker from 'vue2-timepicker'
  import DoctorPicker from './DoctorPicker'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      Datepicker,
      Timepicker,
      DoctorPicker
    },
    computed: {
      ...mapGetters(['isUserPatient'])
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
      resize: none
    }
  }
  @media(min-width: 768px) {
    .ui.form {
      width: 40%;
    }
  }

  @dropdownBorder: 1px solid #ccc;

  // Overrides
  .time-picker {
    font-family: inherit !important;
    width: initial !important;

    .dropdown {
      top: ~"calc(2.3em + 6px)" !important;
      box-shadow: none;
      border: @dropdownBorder;
    }

    input.display-time {
      height: initial !important;
    }
  }

  @hoverBorder: 1px solid @secondaryBlue;

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