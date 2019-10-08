<template>
  <v-col>
    <v-text-field
      readonly
      v-model="username"
      label="Username"
      prepend-icon="far fa-user"
    ></v-text-field>
    <v-text-field
      readonly
      v-model="email"
      label="Address email"
      prepend-icon="far fa-envelope"
    ></v-text-field>
    <v-file-input
      accept="image/png, image/jpeg, image/bmp"
      prepend-icon="fas fa-camera"
      label="Profile picture"
    ></v-file-input>
    <v-switch v-model="latest" color="indigo" label="Allow to show your last used paswords"></v-switch>
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
  })
}
</script>