<template>
  <v-container fluid>
    <p>reset</p>
    <v-alert outlined type="info" border="left">
      Please enter the email address that is assosiated with your account.
      We'll send You an email containing instructions to reset the password.
    </v-alert>
    <v-text-field
      v-model="email"
      label="Email address"
      required
    ></v-text-field>
    <v-btn outlined @click.stop="submit" color="primary">Reset</v-btn>
    <v-btn :to="{ name: 'auth_login' }" outlined>Cancel</v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: ""
  }),
  methods: {
    submit() {

    }
  }
}
</script>