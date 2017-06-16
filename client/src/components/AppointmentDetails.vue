<template>
  <div class="item">
    <div class="image">
      <img src="../assets/placeholder.png">
    </div>
    <div class="content">
      <div class="subject">{{ subject }}</div>
      <div>
        <slot name="status"></slot>
        <div><b>With:</b> {{ person.name }}</div>
        <div><b>Date:</b>{{ date | formatDate }}</div>
        <div><b>Time:</b>{{ date | formatTime }}</div>
      </div>
      <div class="description">
        <div v-if="notes && notes.length"><b>Notes:</b> {{ notes }}</div>
        <div v-if="declinationReason && declinationReason.length"><b>Reason for Declining:</b> {{ declinationReason }}</div>
      </div>
    </div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  import dateFormat from 'dateformat'

  export default {
    props: ['date', 'person', 'subject', 'notes', 'declinationReason'],
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
