<template>
  <div id="app">
    <div class="header">PatDoc</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
  @import './style/buttons';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 1.5em;
    padding: .25em 0;
  }
</style>
