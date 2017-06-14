<template>
  <router-link :to="profileUrl" class="item">
    <div class="ui tiny image">
      <img src="../assets/placeholder.png"/>
    </div>
    <div class="top aligned content">
      <div class="header">{{ patient.name }}</div>
      <div class="meta">
        <div>{{ patient.phoneNumber | formatPhoneNumber }}</div><br/>
        <div>{{ patient.emailAddress }}</div>
      </div>
    </div>
  </router-link>
</template>

<script>
  export default {
    props: ['patient'],
    computed: {
      profileUrl () {
        return `/patients/${this.patient._id}`
      }
    },
    filters: {
      formatPhoneNumber (phoneNumberInt) {
        const phoneNumber = String(phoneNumberInt)
        return `(${phoneNumber.substr(0, 3)}) ${phoneNumber.substr(3, 3)}-${phoneNumber.substr(6)}`
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../style/colors.less';

  .item {
    &:hover {
      background: @whiteGray
    }

    text-decoration: none;
  }

  .header {
    position: static;
    text-align: left;
  }
</style>
