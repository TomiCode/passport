<template>
  <v-app>
    <v-overlay :value="global_loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <alerts></alerts>
    <decrypt></decrypt>
    <category-navigation v-model="drawer"></category-navigation>
    <v-app-bar app color="accent" dark clipped-left>
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

    <v-content>
      <div class="render-view-content">
        <router-view/>
      </div>
      <v-footer
        color="grey"
        padless
        absolute
      >
        <v-row
          justify="center"
          no-gutters
        >
          <v-col
            class="grey lighten-4 py-4 text-center grey--text"
            cols="12"
          >
            vinca project 2019 &copy; Agnieszka &amp; Tomasz
          </v-col>
        </v-row>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
import CategoryNavigation from '@/components/CategoryNavigation'
import CreateContainer from '@/components/CreateContainer.vue'
import Decrypt from '@/components/Decrypt.vue'
import Alerts from '@/components/Alerts'

import { request, API_INVALID_SESSION } from '@/modules/api';
import { alert, UI_USER_LOGOUT, UI_INVALID_DECRYPT } from '@/modules/ui';
import { mapState } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    account: false,
    global_loading: false
  }),
  components: {
    CategoryNavigation, Alerts, Decrypt
  },
  created () {
    request.config.authToken = () => this.$store.getters.auth_token
    request.config.errorHandlers[API_INVALID_SESSION] = () => {
      this.$router.push({ name: 'auth_login' }).then(() => {
        alert.status(API_INVALID_SESSION)
        this.$store.commit('account_forget')
      })
    }
    if (this.$store.state.auth.token !== null) {
      this.global_loading = true
      this.$store.dispatch('api_auth_session')
        .catch(reason => console.log(reason))
        .finally(() => this.global_loading = false)
    }
  },
  methods: {
    logout () {
      this.account = false
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({ name: 'auth_login' })
            .then(() => alert.status(UI_USER_LOGOUT))
        })
    }
  },
  computed: {
    ...mapState({
      name: state => state.user.name,
      email: state => state.user.email
    })
  }
};
</script>

<style lang="scss">
.render-view-content {
  margin-bottom: 4em;
}
</style>