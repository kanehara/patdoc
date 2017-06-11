<template>
  <Modal>
    <h1 slot="header">Are you sure?</h1>
    <p slot="body">Are you sure you want to cancel your appointment?</p>
    <template slot="footer">
      <div class="ui secondary icon button"
           @click="$emit('cancel')">
        Cancel
      </div>
      <div class="ui primary icon button"
           @click="$emit('confirm')">
        Confirm
      </div>
    </template>
  </Modal>
</template>

<script>
  import Modal from './Modal'

  export default {
    components: {
      Modal
    }
  }
</script>

<style scoped>
  .button {
    width: initial;
  }
</style>
