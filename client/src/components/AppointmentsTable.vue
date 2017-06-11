<template>
  <div class="appointments">
    <table class="ui celled table definition">
      <thead>
      <tr>
        <th></th>
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
        <td class="collapsing">
          <input type="checkbox" v-if="appointment.status !== 'cancelled'"/>
        </td>
        <td>{{ appointment.date | formatDate }}</td>
        <td>{{ appointment.date | formatTime }}</td>
        <td>{{ appointment.doctor }}</td>
        <td>{{ appointment.subject}}</td>
        <td>{{ appointment.notes }}</td>
        <td>{{ appointment.status }}</td>
      </tr>
      </tbody>
      <tfoot class="full-width">
        <tr>
          <th></th>
          <th colspan="6">
            <div class="ui right floated small primary labeled icon button">
              <i class="calendar outline icon"></i> New Appointment
            </div>
            <div class="ui small disabled button">
              Cancel
            </div>
            <div class="ui small button" @click="">
              Cancel All
            </div>
          </th>
        </tr>
      </tfoot>
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
