<template>
  <div>
    <h1>Login</h1>
    <form action="/login" method="post" class="ui form">
      <div class="fields">
        <div class="field">
          <label>Email</label>
          <input type="text" name="email">
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" name="password">
        </div>
      </div>
      <button class="ui button" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>

</script>

<style scoped>
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
