<template>
  <v-container fluid>
    <v-alert outlined type="info" border="left">
      Please enter the email address that is assosiated with your account.
      We'll send You an email containing instructions to reset the password.
    </v-alert>
    <v-text-field
      v-model="email"
      label="Email address"
    ></v-text-field>
    <v-btn
      outlined
      color="primary"
      @click.stop="submit"
    >
      Reset
    </v-btn>
    <v-btn
      outlined
      :to="{ name: 'auth_login' }"
    >
      Cancel
    </v-btn>
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