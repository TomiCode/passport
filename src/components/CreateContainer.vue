<template>
  <v-dialog
    persistent
    max-width="640"
    :value="no_container"
  >
    <v-card>
      <v-card-title>Account setup</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="text-center my-2">
          <img src="@/assets/welcome.svg" height="240"/>
        </div>
        <v-alert text prominent color="accent" icon="mdi-shield-key">
          You need to enter a strong password that will encrypt all of your data stored on the server.
          It never leaves your computer, but forgetting this key will result in losing all of your encrypted data.
        </v-alert>
        <v-form ref="form">
          <v-text-field
            type="password"
            label="Container password"
            v-model="password"
            prepend-icon="mdi-database-lock"
            :rules="[rules.required, rules.password.private]"
          ></v-text-field>
          <v-text-field
            type="password"
            label="Password confirmation"
            v-model="password_confirmation"
            prepend-icon="mdi-lock-question"
            :rules="[confirmation]"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="red" :loading="loading" @click="logout">
          Logout
        </v-btn>
        <v-btn text color="indigo" :loading="loading" @click="create_container">
          Continue
          <v-icon right dark>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { validatiors, alert, UI_USER_LOGOUT, UI_CREATECTN_ERR } from "@/modules/ui";

export default {
  data: () => ({
    loading: false,
    password: "",
    password_confirmation: "",
    rules: validatiors
  }),
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push({ name: 'about_index' }))
        .then(() => alert.status(UI_USER_LOGOUT))
        .catch(err => console.log(err))
    },
    create_container() {
      if (this.$refs.form.validate() == false || this.loading) {
        return
      }
      this.loading = true
      this.$store.dispatch('api_create_container', { password: this.password })
        .catch(err => {
          this.$store.dispatch('logout')
            .then(() => this.$router.push({ name: 'auth_login' }))
            .then(() => alert.status(UI_CREATECTN_ERR))
            .catch(err => console.log(err))
        })
        .finally(() => this.loading = false)
    },
    confirmation() {
      return this.password == this.password_confirmation || 'Password does not match.'
    }
  },
  computed: mapGetters([ 'no_container' ])
}
</script>