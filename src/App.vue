<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      dark
      color="indigo"
    >
      <v-list>
        <v-list-item v-for="group in groups" :key="group.title" @click="nothing">
          <v-list-item-action>
            <v-icon v-text="group.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="group.name"></v-list-item-title>
            <v-list-item-subtitle v-text="group.description"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'home_manage' }" class="mt-4">
          <v-list-item-action>
            <v-icon>fas fa-cog</v-icon>
          </v-list-item-action>
          <v-list-item-title>Manage Categories</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="indigo darken-3" dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="ml-1"></v-app-bar-nav-icon>

      <v-toolbar-title style="width: 300px" class="headline text-uppercase ml-0 pl-4">
        <span>Passport</span>
      </v-toolbar-title>

      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="fas fa-search"
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
            <v-icon>far fa-user-circle</v-icon>
          </v-btn>
        </template>
        <v-list dark color="indigo">
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
          <v-list-item @click="nothing">
            <v-list-item-icon>
              <v-icon small>fas fa-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Preferences</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon small>fas fa-sign-out-alt</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
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
import { mapActions } from 'vuex';
import { request } from "@/modules/requests";

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    account: false,
    groups: [
      { name: 'Last used', icon: 'fas fa-history', description: null },
      { name: 'General', icon: 'fas fa-passport', description: 'Main password store' },
      { name: 'Social media', icon: 'fas fa-share-alt', description: 'Some custom description' },
      { name: 'Sysadmin', icon: 'fas fa-server', description: 'Work related passwords' },
    ]
  }),
  methods: {
    nothing() {
    },
    logout() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push({ name: 'auth_login' }))
    }
  },
  created() {
    request.config.authToken = () => this.$store.getters.auth_token
  }
};
</script>
