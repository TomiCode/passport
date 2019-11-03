<template>
  <v-container fluid>
    <p>LOGIN</p>
    <v-text-field
      v-model="auth.email"
      label="Email address"
      prepend-inner-icon="mdi-account"
    ></v-text-field>
    <v-text-field
      v-model="auth.password"
      type="password"
      label="Password"
      prepend-inner-icon="mdi-lock"
    ></v-text-field>
    <v-btn
      class="ma-2"
      outlined
      color="primary"
      @click="login"
      :loading="loading"
    >Login
    </v-btn>
    <v-btn outlined color="accent" :to="{ name: 'auth_reset' }">
      Reset password
    </v-btn>
    <v-alert border="left" type="info" outlined>
      Don't have an account? <router-link :to="{name: 'auth_register'}">Register</router-link> a new one, it's free forever.
    </v-alert>
  </v-container>
</template>

<script>
import { request } from "@/modules/requests";
import { API_AUTH_LOGIN } from "@/modules/api";

export default {
  data: () => ({
    auth: {
      email: "",
      password: ""
    },
    loading: false
  }),
  methods: {
    login() {
      this.loading = true
      request.do(API_AUTH_LOGIN, { data: this.auth })
        .then(resp => {
          this.$store.commit('account_login', resp)
          this.$router.push({ name: 'home_index' })
        })
        .finally(() => this.loading = false)
    }
  }
}
</script>