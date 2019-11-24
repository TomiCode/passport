<template>
  <div class="navs-authenticated">
    <category-navigation v-model="drawer"></category-navigation>
    <v-app-bar app dark color="accent" clipped-left elevation="2">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="ml-1"></v-app-bar-nav-icon>
      <v-toolbar-title class="passport-headline mr-4">
        Vinca <strong>Passport</strong>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
        color="primary darken-1"
        clear-icon="far fa-times-circle"
        clearable
      ></v-text-field>

      <div class="flex-grow-1"></div>
      <v-menu
        v-model="account"
        close-on-click
        close-on-content-click
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" class="mr-1">
            My Account
          </v-btn>
        </template>

        <v-list dark color="indigo accent-2">
          <v-list-item>
            <v-list-item-avatar>
              <v-icon>mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ name }}</v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item :to="{ name: 'home_profile' }">
            <v-list-item-icon class="my-auto mr-3">
              <v-icon>mdi-settings</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Preferences</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click.stop="logout">
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
  </div>
</template>

<script>
import CategoryNavigation from '@/components/CategoryNavigation'
import { mapState } from "vuex";

export default {
  data: () => ({
    drawer: false,
    account: false
  }),
  components: {
    CategoryNavigation
  },
  computed: mapState({
    name: state => state.user.name,
    email: state => state.user.email
  }),
  methods: {
    logout () {
      this.account = false
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({ name: 'auth_login' })
            .then(() => alert.status(UI_USER_LOGOUT))
        })
    }
  }
}
</script>