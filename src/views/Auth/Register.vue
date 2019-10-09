<template>
  <v-container fluid>
    <v-form ref="registrar">
      <v-text-field
        v-model="user.name"
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
      <v-btn
        class="mr-4"
        outlined
        color="primary"
        @click="register"
        :disabled="submit.loading"
        :loading="submit.loading"
      >Register</v-btn>
    </v-form>
    <v-alert outlined color="teal" border="left" icon="fas fa-question">
      Already have an account? <router-link :to="{ name: 'auth_login' }">Log in</router-link> to your existing one.
    </v-alert>
  </v-container>
</template>

<script>
import { post } from "../../modules/requests";
import { API_AUTH_REGISTER } from "../../modules/api";

export default {
  data: () => ({
    user: {
      name: "",
      email: "",
      password: "",
      rules: false
    },
    rules: {
      required: (val) => !!val || 'This field is required.',
      name: (val) => /^[A-Za-z]+$/.test(val) || 'Invalid username.',
      email: (val) => /^\S+@\S+[\.][0-9a-z]+$/.test(val) || 'Invalid email address.'
    },
    submit: {
      loading: false,
    }
  }),
  methods: {
    password_confirmed(val) {
      return val == this.user.password || 'Passwords don\'t match.'
    },
    register() {
      if (this.$refs.registrar.validate() === false)
        return
      this.submit.loading = true
      console.log(process.env.VUE_APP_BACKEND)
      post(API_AUTH_REGISTER, this.user)
        .then(resp => {

        })
        .catch(reason => {
          this.submit.loading = false
        })
    }
  }
}
</script>