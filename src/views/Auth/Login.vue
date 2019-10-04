<template>
  <v-container fluid>
    <v-text-field
      v-model="username"
      label="Username"
      prepend-inner-icon="far fa-user"
    ></v-text-field>
    <v-text-field
      v-model="password"
      type="password"
      label="Password"
      prepend-inner-icon="fas fa-lock"
    ></v-text-field>
    <v-btn
      class="ma-2"
      outlined
      color="primary"
    >Login
    </v-btn>
    <v-btn outlined color="accent" :to="{ name: 'auth_reset' }">
      Reset password
    </v-btn>
    <v-alert border="left" type="info" outlined>
      Don't have an account? <router-link :to="{name: 'auth_register'}">Register</router-link> a new one, it's free forever.
    </v-alert>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    username: "",
    password: ""
  })
}
</script>