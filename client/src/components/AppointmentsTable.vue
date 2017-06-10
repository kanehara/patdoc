<template>
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
      <tr v-for="appointment in appointments"
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
</template>

<script>
  import dateFormat from 'dateformat'

  export default {
    props: ['appointments'],
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

<style lange="less" scoped>
  .appointments {
    margin: 50px;
  }
</style>
