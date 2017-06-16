<template>
  <div>
    <h1>Login</h1>
    <form class="ui form">
      <div class="fields">
        <div class="field">
          <label>Email</label>
          <input type="text" name="emailAddress" v-model="emailAddress">
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" name="password" v-model="password">
        </div>
      </div>
      <button class="ui button" type="submit" @click.prevent="submitLogin">Submit</button>
      <h4 v-if="loginFailed" class="loginFail">Login failed!</h4>
    </form>
  </div>
</template>

<script>
 import * as actionTypes from '../store/modules/login/action-types'
 import { mapActions, mapGetters } from 'vuex'

 export default {
   data () {
     return {
       emailAddress: '',
       password: ''
     }
   },
   computed: {
     ...mapGetters(['loginFailed'])
   },
   methods: {
     ...mapActions({
       dispatchLogin: actionTypes.SUBMIT_LOGIN
     }),
     submitLogin () {
       const { emailAddress, password } = this
       this.dispatchLogin({ emailAddress, password })
     }
   }
 }
</script>

<style scoped lang="less">
  @import '../style/colors.less';

  .loginFail {
    color: @negativeRed;
  }

  .ui.form .fields {
    flex-direction: column;
    width: 20%;
    margin: auto;
    margin-bottom: 20px;
  }

  form {
    padding-top: 20px;
  }

  .ui.form input[type=text], .ui.form input[type=password] {
    width: initial;
  }

  .ui.form .fields .field {
    margin-bottom: 20px;
  }
</style>
