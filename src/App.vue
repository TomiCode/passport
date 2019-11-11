<template>
  <v-app>
    <alerts></alerts>
    <category-navigation :visible="drawer"></category-navigation>
    <v-app-bar app color="indigo darken-3" dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="ml-1"></v-app-bar-nav-icon>

      <v-toolbar-title style="width: 300px" class="headline text-uppercase ml-0 pl-4">
        <span>Passport</span>
      </v-toolbar-title>

      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
        color="indigo darken-1"
        clear-icon="far fa-times-circle"
        clearable
      ></v-text-field>

      <div class="flex-grow-1"></div>

      <v-menu
        v-model="account"
        close-on-click
        close-on-content-click
        offset-y
        v-if="$store.getters.logged_in"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" class="mr-1">
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-btn>
        </template>

        <v-list dark color="primary">
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://avatars1.githubusercontent.com/u/1648325?s=460"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title >Username Username</v-list-item-title>
              <v-list-item-subtitle>test@test.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-icon class="my-auto mr-3">
              <v-icon>mdi-settings</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Preferences</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-icon class="my-auto mr-3">
              <v-icon >mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>

      </v-menu>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import CategoryNavigation from '@/components/CategoryNavigation'
import Alerts from '@/components/Alerts'

import { request, API_INVALID_SESSION } from "@/modules/api";
import { alert } from "@/modules/ui";
import { mapActions } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    account: false,
    message: {
      text: "",
      snackbar: false
    },
    alerts: [ ]
  }),
  components: {
    CategoryNavigation, Alerts
  },
  created () {
    request.config.authToken = () => this.$store.getters.auth_token
    request.config.errorHandlers[API_INVALID_SESSION] = () => {
      this.$router.push({ name: 'auth_login' }).then(() =>
        this.notice("Your session expired. Please login to your account.")
      )
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push({ name: 'auth_login' }))
    },
    notice (msg) {
      this.message.text = msg
      this.message.snackbar = true
    }
  }
};
</script>