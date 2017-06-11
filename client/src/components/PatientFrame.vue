<template>
  <div>
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar'

  export default {
    components: {
      NavBar
    }
  }
</script>
