<template>
  <div class="navs-basic">
    <v-toolbar class="px-8" elevation="1">
      <img :src="logo" height="48" />
      <v-toolbar-title>
        <router-link :to="{ name: 'about_index' }" class="passport-headline ml-2" style="color: inherit;">
          Vinca <strong class="d-none d-sm-inline-block">Passport</strong>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text :to="{ name: 'home_index' }" v-if="logged_in">
        Return
        <v-icon right>mdi-chevron-double-right</v-icon>
      </v-btn>
      <div v-else>
        <v-btn text tile :to="{ name: 'auth_login' }">Login</v-btn>
        <v-btn text tile :to="{ name: 'auth_register' }">Register</v-btn>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    logo() {
      return this.$vuetify.theme.dark ?
        require("@/assets/logo_dark.svg") : require("@/assets/logo_light.svg")
    },
    ...mapGetters([ 'logged_in' ])
  }
}
</script>