<template>
  <v-row>
    <v-col cols="12">
      <v-alert
        colored-border
        border="left"
        type="warning"
      >
        This feature isn't available, as our main mailing server is currently disabled. Sorry for the inconvenience.
      </v-alert>
      <v-alert
        colored-border prominent
        border="left"
        color="accent lighten-2"
        icon="mdi-email-receive-outline"
      >
        Please enter the email address that is assosiated with Your account.
        We'll send You an email containing instructions to reset the password.
      </v-alert>
    </v-col>
    <v-col cols="12">
      <v-form lazy-validation ref="form">
        <v-text-field
          autofocus
          v-model="email"
          label="Email address"
          prepend-inner-icon="mdi-email-edit-outline"
          :rules="[rules.required, rules.user.email]"
        ></v-text-field>
      </v-form>
    </v-col>
    <v-col cols="6">
      <v-btn block outlined :to="{ name: 'auth_login' }">
        Cancel
      </v-btn>
    </v-col>
    <v-col cols="6">
      <v-btn block outlined disabled color="primary" @click="reset">
        Reset
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { request, API_AUTH_RESET } from "@/modules/api";
import { alert, validatiors, UI_USER_RESET } from "@/modules/ui";

export default {
  data: () => ({
    email: "",
    rules: validatiors
  }),
  methods: {
    reset() {
      if (this.$refs.form.validate() == false) {
        return
      }
      request.do(API_AUTH_RESET, { data: { email: this.email }})
        .then(res => {
          this.$router.push({ name: 'auth_login' })
            .then(() => alert.status(UI_USER_RESET))
        })
        .catch(reason => alert.status(reason.status))
    }
  }
}
</script>