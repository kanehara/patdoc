<template>
  <div>
    <h1>MedicalRecord</h1>
    <dropzone id="fileDropzone"
              :url="filePostUrl"
              :autoProcessQueue="false"
              @vdropzone-file-added="fileAdded"
              @vdropzone-removed-file="fileRemoved"
              ref="dropzone">
      <!-- Optional parameters if any! -->
      <input type="hidden" name="token" value="xxx">
    </dropzone>
    <div v-if="!queueIsEmpty">Submit</div>
    <div v-if="!queueIsEmpty">Remove All</div>
  </div>
</template>

<script>
  import Dropzone from 'vue2-dropzone'
  import config from '@/config'

  export default {
    components: {
      Dropzone
    },
    data () {
      return {
        numFilesInQueue: 0
      }
    },
    props: ['patientId'],
    computed: {
      filePostUrl () {
        return `${config.API_HOST}/patients/${this.patientId}/medicalRecord`
      },
      queueIsEmpty () {
        return this.numFilesInQueue === 0
      }
    },
    methods: {
      fileAdded () {
        this.numFilesInQueue++
      },
      fileRemoved () {
        this.numFilesInQueue--
      }
    }
  }
</script>

<style lang="less">
  .vue-dropzone {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f5f5f5;
    &:hover {
      background: #e6e6e6;
    }
  }

  .dropzone .dz-preview .dz-error-message {
    left: 30px;
    top: 195px;
  }
</style>
