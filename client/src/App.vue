<template>
  <div id="app">
    <div class="header">PatDoc</div>
    <div class="sidebar">
      <router-link to="/profile">Profile</router-link>
      <router-link to="/appointments">Appointments</router-link>
      <router-link to="/medicalRecord">Medical Record</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  text-align: center;
  font-size: 1.5em;
  padding: .25em 0;
}
</style>
