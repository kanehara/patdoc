<template>
  <div id="app">
    <div id="header">
      <router-link to="/" class="patdoc icon">PatDoc</router-link>
      <span v-if="isUserAuthenticated" class="userEmail">{{ userEmailAddress }}</span>
      <button v-if="isUserAuthenticated" class="ui button logout mini" @click="logout">
        <i class="sign out icon"></i>
        Logout
      </button>
    </div>
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
  @import './style/colors';

  @headerTop: 10px;

  #app {
    .defaultFont();
    text-align: center;
    color: #2c3e50;
  }

  body {
    margin: 0;
  }

  #header {
    background: #2185D0;
    width: 100%;
    position: relative;
    height: 70px;
  }

  .patdoc.icon {
    position: relative;
    transform: translateY(50%);
    text-shadow: -1px -1px 1px #3e3e3e;
    font-size: 1.8em;
    text-decoration: none;
    color: white;
    top: 20%;

    &:hover {
      color: wheat;
    }
  }

  .logout.button.ui {
    position: absolute;
    top: @headerTop;
    right: 20px;
    padding: .68571429em 1.5em
  }

  .userEmail {
    position: absolute;
    right: 23px;
    top: 40px;
    color: white;
  }
</style>
