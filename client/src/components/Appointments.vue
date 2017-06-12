<template>
  <div>
    <h1>Appointments</h1>
    <div class="ui primary labeled icon button">
      <i class="calendar outline icon"></i> New Appointment
    </div>
    <div class="ui two item menu">
      <a class="item"
         @click="selectedTab = 'upcoming'"
         :class="{active: selectedTab === 'upcoming'}">Upcoming</a>
      <a class="item"
         @click="selectedTab = 'past'"
         :class="{active: selectedTab === 'past'}">Past</a>
    </div>
    <div class="appointments">
      <UpcomingAppointments
        :appointments="upcomingAppointments"
        :patientId="patientId"
        v-if="selectedTab === 'upcoming'">
      </UpcomingAppointments>
      <PastAppointments
        :appointments="pastAppointments"
        v-if="selectedTab === 'past'">
      </PastAppointments>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import UpcomingAppointments from './UpcomingAppointments'
  import PastAppointments from './PastAppointments'
  import * as actionTypes from '../store/modules/appointments/action-types'

  export default {
    props: ['patientId'],
    components: {
      UpcomingAppointments,
      PastAppointments
    },
    data () {
      return {
        selectedTab: 'upcoming'
      }
    },
    computed: {
      ...mapGetters({
        upcomingAppointments: 'upcomingAppointments',
        pastAppointments: 'pastAppointments'
      })
    },
    created () {
      this.$store.dispatch(actionTypes.GET_APPOINTMENTS, this.patientId)
    },
    watch: {
      '$route': function () {
        this.$store.dispatch(actionTypes.GET_APPOINTMENTS, this.patientId)
      }
    }
  }
</script>

<style lang="less" scoped>
  .ui.menu {
    width: 50%;
    margin: 25px auto !important;
  }

  .appointments {
    margin: 50px 5%;
    padding: 0 15%;
  }
</style>
