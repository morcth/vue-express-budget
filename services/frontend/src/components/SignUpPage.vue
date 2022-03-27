<template>
  <form>
    <h1>Sign Up</h1>

    <label for="username">Username</label>
    <input id="username" v-model="username" />

    <label for="e-mail">E-mail</label>
    <input id="e-mail" v-model="email" />

    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" />

    <label for="confirm-password">Confirm Password</label>
    <input id="confirm-password" type="password" v-model="confirmPassword" />

    <button :disabled="isDisabled" @click.prevent="submit">Sign Up</button>
  </form>
</template>
<script>
import axios from 'axios';
export default {
  name: 'SignUpPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    submit() {
      axios.post('/api/1.0/users', {
        username: this.username,
        email: this.email,
        password: this.password,
      });
    },
  },
  computed: {
    isDisabled() {
      return this.password && this.confirmPassword
        ? this.password !== this.confirmPassword
        : true;
    },
  },
};
</script>
