<template>
  <Modal>
    <h1 slot="header">Reason for Declining</h1>
    <div slot="body">
      <div v-if="showRequiredMessage">Reason for declining required!</div>
      <div class="ui form">
        <div class="field">
          <textarea v-model.trim="declinationReason"
                    rows="3"
                    placeholder="Please provide a reason to your patient for declining"
                    @keydown.enter.prevent="confirmDeclination">
          </textarea>
        </div>
      </div>
    </div>
    <template slot="footer">
      <div class="ui secondary icon button"
           @click="$emit('cancel')">
        Cancel
      </div>
      <div class="ui primary icon button"
           @click="confirmDeclination">
        Confirm
      </div>
    </template>
  </Modal>
</template>

<script>
  import Modal from './Modal'

  export default {
    data () {
      return {
        showRequiredMessage: false,
        declinationReason: ''
      }
    },
    components: {
      Modal
    },
    methods: {
      confirmDeclination () {
        if (this.declinationReason.length) {
          this.$emit('confirm', this.declinationReason)
        } else {
          this.showRequiredMessage = true
        }
      }
    }
  }
</script>

<style scoped>
  .ui.form textarea {
    width: 80%;
    resize: none;
  }
</style>
