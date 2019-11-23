<template>
  <v-toolbar max-height="64px" flat tile style="border-bottom: 1px solid lightgray">
    <v-container class="pa-0 d-flex">
      <v-toolbar-title>
        <router-link :to="{ name: 'about_index' }" class="passport-headline grey--text text--darken-2">
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