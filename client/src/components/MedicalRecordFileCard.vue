<template>
  <a class="ui card"
     :href="file.url"
     target="_blank"
     @mouseover="showDeleteIfDoctor"
     @mouseleave="showDelete = false">
    <div class="image">
      <img src="../assets/placeholder.png">
    </div>
    <div class="header">{{ file.filename }}</div>
    <div class="meta">{{ file.size }}</div>
    <i v-if="showDelete" class="remove icon" @click.prevent="deleteFile"></i>
  </a>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as actionTypes from '../store/modules/medical-records/action-types'

  export default {
    props: ['file', 'patientId'],
    data () {
      return {
        showDelete: false
      }
    },
    computed: {
      ...mapGetters(['isUserDoctor'])
    },
    methods: {
      ...mapActions({
        dispatchDeleteFile: actionTypes.DELETE_FILE
      }),
      showDeleteIfDoctor () {
        if (this.isUserDoctor) {
          this.showDelete = true
        }
      },
      deleteFile () {
        if (this.isUserDoctor) {
          this.dispatchDeleteFile({
            patientId: this.patientId,
            fileId: this.file.id
          })
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../style/colors';

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

  .remove.icon {
    position: absolute;
    top: -17px;
    right: 204px;
    font-size: 30px;
    color: @negativeRedDark;

    &:hover {
      color: @negativeRed;
    }
  }
</style>
