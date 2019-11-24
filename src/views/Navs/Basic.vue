<template>
  <v-toolbar max-height="64px" flat tile class="app-border-bottom">
    <v-container class="pa-0 d-flex">
      <v-toolbar-title>
        <router-link :to="{ name: 'about_index' }" class="passport-headline" style="color: inherit;">
          Vinca <strong>Passport</strong>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text :to="{ name: 'auth_login' }">
          Login
        </v-btn>
        <v-btn text :to="{ name: 'auth_register' }">
          Register
        </v-btn>
      </v-toolbar-items>
    </v-container>
  </v-toolbar>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .passport-headline {
    text-decoration: none;
    font-size: 1.35rem;
  }
</style>