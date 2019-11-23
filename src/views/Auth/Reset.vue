<template>
  <v-row>
    <v-col cols="12">
      <v-alert
        colored-border
        prominent
        border="left"
        color="accent lighten-2"
        icon="mdi-email-receive-outline"
      >
        Please enter the email address that is assosiated with Your account.
        We'll send You an email containing instructions to reset the password.
      </v-alert>
    </v-col>
    <v-col cols="12">
      <v-form lazy-validation ref="reset_form">
        <v-text-field
          v-model="email"
          label="Email address"
          prepend-inner-icon="mdi-email-edit-outline"
        ></v-text-field>
      </v-form>
    </v-col>
    <v-col cols="6">
      <v-btn
        outlined
        block=""
        color="primary"
        @click.stop="submit"
      >
        Reset
      </v-btn>
    </v-col>
    <v-col cols="6">
      <v-btn
        block
        color="grey darken-1"
        outlined
        :to="{ name: 'auth_login' }"
      >
        Cancel
      </v-btn>
    </v-col>
  </v-row>
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