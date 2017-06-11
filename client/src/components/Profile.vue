<template>
  <div>
    <h1>Profile</h1>
    <div class="profile">
      <div class="profileImage">
        <img class="ui medium circular image" src="../assets/placeholder.png">
      </div>
      <div class="info">
        <div><b>Name:</b> {{ name }}</div>
        <div><b>Age:</b> {{ age }}</div>
        <div><b>Email:</b> {{ email }}</div>
        <div><b>Mailing Address:</b> {{ address }}</div>
        <div><b>Phone Number:</b> {{ name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: 'Yohei Kanehara',
        age: 24,
        email: 'kanehara@umich.edu',
        address: '1850 N Clark St. Chicago, IL 60614',
        phoneNumber: 2488913545
      }
    }
  }
</script>

<style lang=less scoped>
  .profile {
    width: 75%;
    margin: 10px auto;
    display: flex;

    .profileImage {
      flex: 1 0 100px;
      flex-wrap: wrap;

      img {
        width: 100%;
      }
    }

    .info {
      flex: 3;
      flex-wrap: wrap;
      text-align: left;
      margin: 35px;
    }
  }
</style>
