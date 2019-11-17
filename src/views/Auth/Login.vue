<template>
  <v-container fluid>
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
      Don't have an account? <router-link :to="{ name: 'auth_register' }">Register</router-link> a new one, it's free forever.
    </v-alert>
  </v-container>
</template>

<script>
import { alert } from "@/modules/ui";

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
      this.$store.dispatch('api_login', this.auth)
        .then(() => this.$router.push({ name: 'home_index' }))
        .catch(err => {
          if (resp.status !== undefined) {
            alert.status(resp.status)
          }
        })
        .finally(() => this.loading = false)
    }
  }
}
</script>