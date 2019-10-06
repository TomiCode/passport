<template>
  <v-container fluid>
    <v-form v-model="registrar" ref="registrar">
      <v-text-field
        v-model="user.name"
        label="Username"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.email"
        label="Email address"
        required
      ></v-text-field>
      <v-text-field
      ref="password_input"
      v-model="user.password"
      type="password"
      label="Password"
      ></v-text-field>
      <v-text-field
        v-model="user.password_confirmation"
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
        :to="{name: 'profile_setup'}"
      >Register</v-btn>
    </v-form>
    <v-alert outlined color="teal" border="left" icon="fas fa-question">
      Already have an account? <router-link :to="{ name: 'auth_login' }">Log in</router-link> to your existing one.
    </v-alert>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    registrar: true,
    user: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      rules: false
    },
    rules: { }
  }),
  methods: {
    password_confirmed(val) {
      return val == this.user.password || 'Invalid password'
    },
    nothing() {
      console.log('yep')
    }
  }
}
</script>