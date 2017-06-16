<template>
  <div id="app">
    <router-link to="/" class="header">PatDoc</router-link>
    <button v-if="isUserAuthenticated" class="ui button logout tiny" @click="logout">Logout</button>
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

  @headerTop: 10px;

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
    top: @headerTop;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 1.5em;
  }

  .logout.button {
    position: absolute;
    top: @headerTop;
    right: 20px;
  }
</style>
