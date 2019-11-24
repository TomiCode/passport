<template>
  <v-toolbar max-height="64px" tile elevation="1">
    <v-container class="pa-0 d-flex">
      <v-toolbar-title>
        <router-link :to="{ name: 'about_index' }" class="passport-headline" style="color: inherit;">
          Vinca <strong>Passport</strong>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="logged_in">
        <v-btn text :to="{ name: 'home_index' }">
          Return Home
          <v-icon right>mdi-chevron-double-right</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
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
import { mapGetters } from "vuex";

export default {
  computed: mapGetters([ 'logged_in' ])
}
</script>