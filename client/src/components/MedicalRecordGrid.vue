<template>
  <div>
    <router-link to="medicalRecord/upload">
      <button class="ui primary button">Upload Files</button>
    </router-link>
    <div class="ui four doubling cards">
      <a v-for="file in files" class="ui card" :href="file.url" target="_blank">
          <div class="image">
            <img src="../assets/placeholder.png">
          </div>
          <div class="header">{{ file.filename }}</div>
          <div class="meta">{{ file.size }}</div>
      </a>
    </div>
  </div>
</template>

<script>
  import * as actionTypes from '../store/modules/medical-records/action-types'
  import { mapGetters } from 'vuex'

  export default {
    props: ['patientId'],
    created () {
      this.$store.dispatch(actionTypes.GET_FILES, { patientId: this.patientId })
    },
    watch: {
      '$route': function () {
        this.$store.dispatch(actionTypes.GET_FILES, { patientId: this.patientId })
      }
    },
    computed: {
      ...mapGetters(['files'])
    }
  }
</script>

<style lang="less" scoped>
  .header {
    font-size: 1.1em;
  }

  .ui.four.cards {
    margin: 20px 15%;

    a {
      text-decoration: none;
      color: initial;
    }
  }
</style>
