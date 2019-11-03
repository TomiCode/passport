<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      dark
      color="indigo"
    >
      <v-list >
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>General</v-list-item-title>
            <v-list-item-subtitle>Home sweet home</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-history</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Last entries</v-list-item-title>
            <v-list-item-subtitle>Your last used entries</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <div class="user-categories" v-if="hasCategories">
          <v-divider class="my-2"></v-divider>
          <v-list-item
            v-for="category in categories"
            :key="category.id"
            :to="{ name: 'home_category', params: { category: category.id }}"
          >
            <v-list-item-icon>
              <v-icon v-text="mapIcon(category.icon)"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="category.name"></v-list-item-title>
              <v-list-item-subtitle v-text="category.description"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>

        <v-divider class="my-2"></v-divider>
        <v-list-item :to="{ name: 'home_manage' }">
          <v-list-item-icon>
            <v-icon>mdi-circle-edit-outline</v-icon>
          </v-list-item-icon>
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
    <v-snackbar
      top right
      color="warning"
      v-model="message.snackbar"
      :timeout="5000"
    >
      {{ message.text }}
      <v-btn text @click="message.snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { request } from "@/modules/requests";
import { icons } from "@/modules/entity";

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    account: false,
    message: {
      text: "",
      snackbar: false
    }
  }),
  created () {
    request.config.authToken = () => this.$store.getters.auth_token
    request.config.onAuthErrorHandlers = [
      () => {
        // this.$store.commit('account_forget')
        this.$router.push({ name: 'auth_login' }).then(() =>
          this.notice("Your session expired. Please login to your account.")
        )
      }
    ]
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push({ name: 'auth_login' }))
    },
    notice (msg) {
      this.message.text = msg
      this.message.snackbar = true
    },
    mapIcon: id => (icons[id].value || 'fas fa-key') + ' fa-fw',
  },
  computed: mapState({
    categories: state => state.categories,
    hasCategories: state => !!state.categories.length
  })
};
</script>