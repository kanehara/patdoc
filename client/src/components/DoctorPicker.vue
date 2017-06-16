<template>
  <div>
    <div id="doctor-picker">
      <div class="select" @click="displaySelection = !displaySelection">
        <p>{{ selectedDoctor.name }}</p>
        <i class="caret down icon"></i>
      </div>
      <div class="selection field" v-if="displaySelection">
        <div class="doctor" v-for="doctor in doctors" @click="selectDoctor(doctor)">
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
    methods: {
      selectDoctor (doctor) {
        this.displaySelection = false
        this.selectedDoctor = doctor
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

  @selectBorder: 1px solid rgba(34,36,38,.15);
  @selectBorderRadius: .28571429rem;
  @dropdownBoxShadow: 0 1px 6px rgba(0,0,0,0.15);


  .select {
    height: 43px;
    border: @selectBorder;
    border-radius: @selectBorderRadius;
    position: relative;

    p {
      margin: 10px;
    }

    .icon.caret.down {
      position: absolute;
      right: 3px;
      top: 14px;
    }
  }

  .selection {
    position: absolute;
    border: @selectBorder;
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
