<template>
  <div id="medicalRecordUpload">
    <h2>Upload Medical Record Files</h2>
    <dropzone id="fileDropzone"
              ref="dropzone"
              :url="filePostUrl"
              :autoProcessQueue="false"
              @vdropzone-file-added="fileAdded"
              @vdropzone-removed-file="fileRemoved"
              @vdropzone-sending="sending"
              @vdropzone-success="fileUploaded">
    </dropzone>
    <div class="buttons">
      <button v-if="!queueIsEmpty" class="ui secondary button cancel" @click="emptyQueue">Cancel</button>
      <button v-if="!queueIsEmpty" class="ui primary button submit" @click="processQueue">Submit</button>
    </div>
  </div>
</template>

<script>
  import Dropzone from 'vue2-dropzone'
  import config from '@/config'
  import * as mutationTypes from '@/store/modules/medical-records/mutation-types'

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
      },
      emptyQueue () {
        this.$refs.dropzone.removeAllFiles()
      },
      processQueue () {
        this.$refs.dropzone.processQueue()
      },
      sending (file, xhr, formData) {
        formData.patientId = this.patientId
      },
      fileUploaded ({name: filename, size}, { id, location }) {
        this.$store.commit(mutationTypes.ADD_FILE, {
          file: {
            id,
            filename,
            size: `${Math.round(size / 1000)} KB`,
            location
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import '../style/colors';

  @dropzoneGray: #f5f5f5;
  @dropzoneGrayHover: #e6e6e6;

  #medicalRecordUpload {
    padding: 0 10%;
  }

  .vue-dropzone {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: @dropzoneGray;
    &:hover {
      background: @dropzoneGrayHover;
    }
  }

  .dropzone .dz-preview .dz-error-message {
    left: 30px;
    top: 195px;
  }

  .vue-dropzone .dz-preview .dz-details {
    background-color: @primaryBlue;
  }

  #fileDropzone {
    margin-bottom: 25px;
  }

</style>
