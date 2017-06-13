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
              @vdropzone-success="fileUploaded"
              @vdropzone-total-upload-progress="progress">
    </dropzone>
    <transition name="fade">
      <div class="buttons" v-if="!uploadComplete">
        <button v-if="!queueIsEmpty" class="ui secondary button cancel" @click="emptyQueue">Cancel</button>
        <button v-if="!queueIsEmpty" class="ui primary button submit" @click="processQueue">Submit</button>
      </div>
    </transition>
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
        numFilesInQueue: 0,
        uploadComplete: false
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
      },
      progress (percentDone, totalBytes, totalBytesSent) {
        if (percentDone === 100) {
          // Show success indicator and navigate to medical record page after successful upload
          this.uploadComplete = true
          setTimeout(() => this.$router.push(`/patients/${this.patientId}/medicalRecord`), 850)
        }
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }

</style>
