<template>
  <div>
    <div id="doctor-picker">
      <select class="ui fluid dropdown" @click="displaySelection = !displaySelection">
      </select>
      <div class="selection" v-if="displaySelection">
        <div class="doctor" v-for="doctor in doctors">
          {{ doctor.name }}
        </div>
      </div>
    </div>
    <div v-if="displaySelection" id="doctor-picker-overlay" @click="displaySelection = false">
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as actionTypes from '../store/modules/doctors/action-types'

  export default {
    props: ['value'],
    data () {
      return {
        selectedDoctor: {},
        displaySelection: false
      }
    },
    computed: {
      ...mapGetters({
        unsortedDoctors: 'doctors'
      }),
      doctors () {
        return this.unsortedDoctors.slice().sort((d1, d2) => d1.name < d2.name)
      }
    },
    created () {
      this.$store.dispatch(actionTypes.GET_DOCTORS)
    },
    watch: {
      selectedDoctor: (doctor) => this.$emit('input', doctor)
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/colors';

  @dropdownBorder: 1px solid #ccc;
  @dropdownBoxShadow: 0 1px 6px rgba(0,0,0,0.15);

  .ui.form select {
    height: 43px;
  }

  .selection {
    position: absolute;
    border: @dropdownBorder;
    box-shadow: @dropdownBoxShadow;
    width: 100%;
    background: white;
    // To display over overlay
    z-index: 100;
  }

  .doctor {
    border: 1px solid transparent;
    margin: 4px;
    padding: 4px;
    height: 30px;

    &:hover {
      border: 1px solid @secondaryBlue;
    }

  }

  #doctor-picker-overlay {
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }
</style>
