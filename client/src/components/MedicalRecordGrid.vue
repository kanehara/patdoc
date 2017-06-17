<template>
  <div>
    <router-link to="medicalRecord/upload" tag="button" class="ui primary button">
      Upload Files
    </router-link>
    <div class="ui four doubling cards">
      <MedicalRecordFileCard v-for="file in files" :file="file" :patientId="patientId" :key="file.id"></MedicalRecordFileCard>
    </div>
  </div>
</template>

<script>
  import * as actionTypes from '../store/modules/medical-records/action-types'
  import { mapGetters } from 'vuex'
  import MedicalRecordFileCard from './MedicalRecordFileCard'

  export default {
    components: {
      MedicalRecordFileCard
    },
    props: ['patientId'],
    computed: {
      ...mapGetters(['files'])
    },
    created () {
      this.$store.dispatch(actionTypes.GET_FILES, { patientId: this.patientId })
    },
    watch: {
      '$route': function () {
        this.$store.dispatch(actionTypes.GET_FILES, { patientId: this.patientId })
      }
    }
  }
</script>
