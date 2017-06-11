<template>
  <div>
    <h1>Appointments</h1>
    <div class="ui two item menu">
      <a class="item"
         @click="selectedTab = 'upcoming'"
         :class="{active: selectedTab === 'upcoming'}">Upcoming</a>
      <a class="item"
         @click="selectedTab = 'past'"
         :class="{active: selectedTab === 'past'}">Past</a>
    </div>
    <AppointmentsTable :appointments="upcomingAppointments" v-if="selectedTab === 'upcoming'"></AppointmentsTable>
    <AppointmentsTable :appointments="pastAppointments" v-if="selectedTab === 'past'"></AppointmentsTable>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AppointmentsTable from './AppointmentsTable'

  export default {
    components: {
      AppointmentsTable
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
      this.$store.dispatch('getAppointments', this.$route.params.id)
    }
  }
</script>

<style lang="less" scoped>
  .ui.menu {
    width: 50%;
    margin: auto !important;
  }
</style>
