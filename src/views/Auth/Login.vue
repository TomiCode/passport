<template>
  <v-row>
    <v-col cols="12">
      <v-form lazy-validation ref="login_form">
        <v-text-field
          validate-on-blur
          v-model="auth.email"
          label="Email address"
          prepend-inner-icon="mdi-account"
          :rules="[rules.required, rules.user.email]"
        ></v-text-field>
        <v-text-field
          v-model="auth.password"
          type="password"
          label="Password"
          prepend-inner-icon="mdi-lock"
          :rules="[rules.required]"
        ></v-text-field>
      </v-form>
    </v-col>
    <v-col cols="6">
      <v-btn
        block
        outlined
        color="primary"
        @click="login"
        :loading="loading"
      >
        Login
      </v-btn>
    </v-col>
    <v-col cols="6">
      <v-btn
        block
        outlined
        color="deep-orange darken-1"
        :to="{ name: 'auth_reset' }"
      >
        Reset password
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-alert
        colored-border
        border="left"
        color="info"
        icon="mdi-information-variant"
      >
        Don't have an account?
        <router-link :to="{ name: 'auth_register' }" style="color: inherit;">Register</router-link>
        a new one, it's free forever.
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import { alert, validatiors } from "@/modules/ui";

export default {
  data: () => ({
    auth: {
      email: "",
      password: ""
    },
    rules: validatiors,
    loading: false
  }),
  methods: {
    login() {
      if (!this.$refs.login_form.validate()) {
        return
      }
      this.loading = true
      this.$store.dispatch('api_login', this.auth)
        .then(() => this.$router.push({ name: 'home_index' }))
        .catch(reason => {
          if (reason !== undefined && reason.status !== undefined) {
            alert.status(reason.status)
          }
        })
        .finally(() => this.loading = false)
    }
  }
}
</script>