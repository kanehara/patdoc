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
    <div class="appointments">
      <table class="ui celled table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor</th>
            <th>Subject</th>
            <th>Notes</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in upcomingAppointments"
              v-bind:class="{
                positive: appointment.status === 'confirmed',
                negative: appointment.status === 'cancelled',
                warning: appointment.status === 'pending'
              }">
            <td>{{ appointment.date | formatDate }}</td>
            <td>{{ appointment.date | formatTime }}</td>
            <td>{{ appointment.doctor }}</td>
            <td>{{ appointment.subject}}</td>
            <td>{{ appointment.notes }}</td>
            <td>{{ appointment.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import dateFormat from 'dateformat'

  export default {
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
    },
    filters: {
      formatDate (date) {
        return dateFormat(date, 'shortDate')
      },
      formatTime (date) {
        return dateFormat(date, 'shortTime')
      }
    }
  }
</script>

<style lang="less" scoped>
  .ui.menu {
    width: 50%;
    margin: auto !important;
  }
</style>
