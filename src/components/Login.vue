<template>
  <div>
    <h1>Login Page</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>


    <div>
        <h2>Happening now</h2>
        <h3>Join today.</h3>
        <button id="googleSignIn">Sign up with Google</button>
        <p>or</p>
        <form id="emailSignIn">
            <input type="email" placeholder="Email" required>
            <input type="password" placeholder="Password" required>
            <button type="submit">Create account</button>
        </form>
        <p>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
        <p>Already have an account? <a href="#">Sign in</a></p>
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
