<template>
  <v-col>
    <v-text-field
      readonly
      v-model="username"
      label="Username"
      prepend-icon="mdi-account"
    ></v-text-field>
    <v-text-field
      readonly
      v-model="email"
      label="Address email"
      prepend-icon="mdi-email-edit"
    ></v-text-field>
    <v-file-input
      accept="image/png, image/jpeg, image/bmp"
      prepend-icon="mdi-face-recognition"
      label="Profile picture"
    ></v-file-input>

    <v-switch v-model="latest" color="primary" label="Allow to colect and show your last used entries"></v-switch>
    <v-switch v-model="dark" color="primary" label="Enable application dark mode"></v-switch>

    <v-btn outlined color="indigo">Save changes</v-btn>
    <v-divider class="mt-4"></v-divider>
    <v-subheader>Change passwords</v-subheader>
    <v-btn outlined color="purple">Account password</v-btn>
    <v-btn outlined color="orange deeper-2">Store password</v-btn>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    password: "",
    username: "Current username",
    new_password: "",
    password_confirmation: "",
    latest: true,
    dark: false
  }),
  watch: {
    dark(value) {
      this.$vuetify.theme.dark = value
    }
  }
}
</script>