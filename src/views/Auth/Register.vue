<template>
  <div class="auth-register">
    <v-form ref="registrar" class="pb-4">
      <div class="form-fields">
        <v-text-field
          v-model="user.username"
          label="Username"
          :rules="[rules.required, rules.name]"
          counter="16"
        ></v-text-field>
        <v-text-field
          v-model="user.email"
          label="Email address"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          type="password"
          label="Password"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          type="password"
          label="Confirm password"
          :rules="[password_confirmed]"
        ></v-text-field>
        <v-checkbox
          v-model="user.rules"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree to sell your kidney?"
          required
        ></v-checkbox>
      </div>
      <div class="form-actions mt-4">
        <v-btn block large
          class="mr-4"
          outlined
          color="primary"
          @click="register"
          :loading="loading"
        >
          Register
        </v-btn>
      </div>
    </v-form>
    <v-alert
      colored-border
      border="left"
      color="accent lighten-2"
      icon="mdi-help"
      class="mt-4"
    >
      Already have an account?
      <router-link :to="{ name: 'auth_login' }" style="color: inherit;">Log in</router-link>
      to your existing one.
    </v-alert>
  </div>
</template>

<script>
import { request, API_AUTH_REGISTER } from "../../modules/api";

export default {
  data: () => ({
    user: {
      username: "",
      email: "",
      password: "",
      rules: false
    },
    rules: {
      required: (val) => !!val || 'This field is required.',
      name: (val) => /^[A-Za-z]+$/.test(val) || 'Invalid username.',
      email: (val) => /^\S+@\S+[\.][0-9a-z]+$/.test(val) || 'Invalid email address.'
    },
    loading: false
  }),
  methods: {
    password_confirmed(val) {
      return val == this.user.password || 'Passwords don\'t match.'
    },
    register() {
      if (this.$refs.registrar.validate() === false)
        return
      this.loading = true
      request.do(API_AUTH_REGISTER, { data: this.user })
        .then(resp => { })
        .finally(() => this.loading = false)
    }
  }
}
</script>