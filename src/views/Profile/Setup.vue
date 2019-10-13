<template>
  <v-container fluid>
    <v-alert type="warning" outlined border="left">
      Creating a new encrypted container. Please enter below the encryption key used to secure your storage, but be aware that this key is unrecoverable!
      Save it somewere safe.
    </v-alert>
    <v-text-field
      type="password"
      v-model="password"
      label="Encryption password"
      prepend-inner-icon="far fa-user"
    ></v-text-field>
    <v-text-field
      type="password"
      v-model="password_confirmation"
      label="Password confirmation"
      prepend-inner-icon="far fa-user"
    ></v-text-field>
    <v-btn outlined color="orange">Accept &amp; continue</v-btn>
  </v-container>
</template>

<script>
export default {
  data:  () => ({
    password: "",
    password_confirmation: "",
  }),
}
</script>