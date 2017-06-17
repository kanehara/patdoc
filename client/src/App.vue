<template>
  <div id="app">
    <router-link to="/" class="header">PatDoc</router-link>
    <span v-if="isUserAuthenticated" class="userEmail">{{ userEmailAddress }}</span>
    <button v-if="isUserAuthenticated" class="ui button logout mini" @click="logout">
      <i class="sign out icon"></i>
      Logout
    </button>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as mutationTypes from './store/modules/login/mutation-types'

  export default {
    name: 'app',
    computed: {
      ...mapGetters(['isUserAuthenticated', 'userEmailAddress'])
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
  @import './style/fonts';

  @headerTop: 10px;

  #app {
    .defaultFont();
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

  .userEmail {
    position: absolute;
    right: 150px;
    top: 15px;
  }
</style>
