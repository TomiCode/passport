<template>
  <v-col>
    <v-card flat>
      <v-card-title>Account preferences</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            disabled label="Username"
            prepend-icon="mdi-account"
            :value="username"
          ></v-text-field>
          <v-text-field
            disabled label="API Key"
            prepend-icon="mdi-cloud-braces"
            value="unavailable"
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email Address"
            prepend-icon="mdi-email-edit"
            :rules="[rules.required, rules.user.email]"
          ></v-text-field>
          <v-text-field
            type="password"
            label="Password"
            prepend-icon="mdi-lock"
            v-model="password"
          ></v-text-field>
          <v-text-field
            v-if="password.length > 0"
            type="password"
            label="Password confirmation"
            prepend-icon="mdi-lock-question"
            v-model="password_confirmation"
            :rules="[confirmation]"
          ></v-text-field>
          <v-switch v-model="preferences.last_used" color="primary" label="Allow to colect and show your last used entries"></v-switch>
          <v-switch v-model="preferences.dark_mode" color="primary" label="Enable application dark mode"></v-switch>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="load">Reset</v-btn>
        <v-btn text color="primary" @click="check_save">Save &amp; Return</v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="deep-orange">Container settings</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="save.dialog" max-width="600">
      <v-card>
        <v-card-title class="headline">Account confirmation</v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-card-text class="body-1">
          <v-alert text prominent color="info" icon="mdi-account-lock">
            Please enter your current account password below to confirm all changes.
          </v-alert>
          <v-form ref="save_form">
            <v-text-field
              type="password"
              label="Password"
              prepend-icon="mdi-lock-outline"
              v-model="save.password"
              :rules="[rules.required]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text color="primary darken-1"
            @click="save.dialog = false"
            :disabled="save.loading"
          >
            Cancel
          </v-btn>
          <v-btn
            text color="red darken-1"
            @click="accept_save"
            :loading="save.loading"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { mapState } from "vuex"
import {
  alert, validatiors, SYS_EMAIL_EXISTS, SYS_INVALID_PASS, UI_UPDATED_USER
} from "@/modules/ui";

export default {
  created() {
    this.load()
  },
  data: () => ({
    email: "",
    password: "",
    password_confirmation: "",
    preferences: {
      last_used: false,
      dark_mode: false
    },
    save: {
      dialog: false,
      password: "",
      loading: false
    },
    rules: validatiors,
  }),
  methods: {
    load() {
      this.email = this.$store.state.user.email
      this.password = ""
      this.preferences = Object.assign({}, this.user_preferences)
      this.save.password = ""
      this.$refs.form.resetValidation()
      this.$refs.save_form.resetValidation()
    },
    check_save() {
      if (!this.$refs.form.validate()) {
        return
      }
      this.save.dialog = true
    },
    accept_save() {
      if (!this.$refs.form.validate()) {
        this.save.dialog = false
        return
      }
      if (!this.$refs.save_form.validate()) {
        return
      }
      this.save.loading = true
      this.$store.dispatch('api_user_update', {
        confirmation: this.save.password,
        properties: {
          email: this.email,
          password: this.password,
          preferences: this.preferences
        }
      })
        .then(() => {
          this.save.dialog = false
          alert.status(UI_UPDATED_USER)
          setTimeout(() => this.$router.push({ name: 'home_index' }), 200)
        })
        .catch(err => {
          if (err.status !== undefined) {
            if (err.status == SYS_EMAIL_EXISTS) {
              this.email = ""
              this.save.dialog = false
              setTimeout(() => this.save.password = "", 256)
            }
            else if (err.status == SYS_INVALID_PASS) {
              this.save.password = ""
            }
            alert.status(err.status)
          }
          else
            console.log(err)
        })
        .finally(() => this.save.loading = false)
    },
    confirmation() {
      if (this.password.length == 0) {
        return true
      }
      return this.password == this.password_confirmation || 'Password does not match.'
    }
  },
  watch: {
    dark(value) {
      this.$vuetify.theme.dark = value
    }
  },
  computed: mapState({
    username: state => state.user.name,
    user_preferences: state => state.user.preferences
  })
}
</script>
