<template>
  <div>
    <h1>Login Page</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      // Handle the login logic here
      console.log('User tried to log in with', this.username, this.password);
    }
  }
}
</script>


<style scoped>
/* Any styles specific to the Login component can be added here */
</style>
