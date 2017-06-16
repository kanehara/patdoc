<template>
  <div id="app">
    <router-link to="/" class="header">PatDoc</router-link>
    <button class="ui button logout" @click="logout">Logout</button>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as mutationTypes from './store/modules/login/mutation-types'

  export default {
    name: 'app',
    computed: {
      ...mapGetters(['isUserAuthenticated'])
    },
    methods: {
      ...mapMutations({
        commitLogout: mutationTypes.LOGOUT
      }),
      logout () {
        this.commitLogout()
        this.$router.push('/login')
      }
    }
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
