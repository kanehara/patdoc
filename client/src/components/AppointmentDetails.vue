<template>
  <div class="item">
    <div class="image">
      <img src="../assets/placeholder.png">
    </div>
    <div class="content">
      <div class="subject">{{ appointment.subject }}</div>
      <div>
        <slot name="status"></slot>
        <div><b>With:</b> {{ person.name }}</div>
        <div><b>Date:</b> {{ appointment.date | formatDate }}</div>
        <div><b>Time:</b> {{ appointment.date | formatTime }}</div>
      </div>
      <div class="description">
        <div v-if="appointment.notes && appointment.notes.length"><b>Notes:</b> {{ appointment.notes }}</div>
        <slot name="declinationReason"></slot>
      </div>
    </div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  import dateFormat from 'dateformat'
  import { mapGetters } from 'vuex'

  export default {
    props: ['appointment'],
    computed: {
      ...mapGetters(['isUserPatient', 'isUserDoctor']),
      person () {
        if (this.isUserPatient) {
          return this.appointment.doctor
        } else if (this.isUserDoctor) {
          return this.appointment.patient
        } else {
          console.error('Invalid user type found when computing appointment details')
        }
      }
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
  .content {
    text-align: left;
  }

  .subject {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .actions {
    width: 15%;
    padding: 10px 20px;
  }
</style>
