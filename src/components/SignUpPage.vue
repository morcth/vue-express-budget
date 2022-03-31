<template>
  <section class="section"></section>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-one-quarter">
        <div class="container box">
          <form>
            <h1>Sign Up</h1>
            <div class="field">
              <label class="label" for="username">Username</label>
              <div class="control">
                <input class="input" id="username" v-model="username" />
              </div>
            </div>
            <div class="field">
              <label class="label" for="e-mail">E-mail</label>
              <div class="control">
                <input class="input" id="e-mail" v-model="email" />
              </div>
            </div>
            <div class="field">
              <label class="label" for="password">Password</label>
              <div class="control">
                <input
                  class="input"
                  id="password"
                  type="password"
                  v-model="password"
                />
              </div>
            </div>
            <div class="field">
              <label class="label" for="confirm-password"
                >Confirm Password</label
              >
              <div class="control">
                <input
                  class="input"
                  id="confirm-password"
                  type="password"
                  v-model="confirmPassword"
                />
              </div>
            </div>
            <button
              class="button is-fullwidth"
              :disabled="isDisabled"
              @click.prevent="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
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
