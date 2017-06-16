<template>
  <div>
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'
  import store from '@/store'

  export default {
    components: {
      NavBar
    },
    beforeRouteEnter (to, from, next) {
      if (store.state.login.userId !== to.params.patientId) {
        next('/403')
      }
      next()
    }
  }
</script>
