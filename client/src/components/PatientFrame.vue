<template>
  <div>
    <PatientNavBar :patientId="patientId"></PatientNavBar>
    <router-view></router-view>
  </div>
</template>

<script>
  import PatientNavBar from '@/components/PatientNavBar'
  import store from '@/store'
  import config from '@/config'

  export default {
    props: ['patientId'],
    components: {
      PatientNavBar
    },
    beforeRouteEnter (to, from, next) {
      const loginState = store.state.login
      // Only doctors and logged in patients can see their info
      if (loginState.userType !== config.USER_TYPES.DOCTOR && loginState.userId !== to.params.patientId) {
        next('/403')
      }
      next()
    }
  }
</script>
