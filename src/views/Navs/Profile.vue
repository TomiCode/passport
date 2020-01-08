<template>
  <div class="navs-authenticated">
    <category-navigation v-model="drawer"></category-navigation>
    <v-app-bar app dark color="accent" clipped-left extended extension-height="0" elevation="2">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="mr-2"></v-app-bar-nav-icon>
      <img src="@/assets/logo_dark.svg" height="42" />
      <v-toolbar-title class="passport-headline ml-1">
        Vinca <strong class="d-none d-sm-inline-block">Passport</strong>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="search.dialog" max-width="600">
        <template v-slot:activator="{ on }">
          <v-btn text class="mr-1" :icon="$vuetify.breakpoint.xsOnly" v-on="on">
            <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-magnify</v-icon>
            <span class="d-none d-sm-inline">Search</span>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="mb-0">
            <v-text-field
              clearable ref="search_field"
              prepend-inner-icon="mdi-magnify"
              class="search-field title font-weight-light"
              label="Type something to search.."
              v-model="search.query"
              :rules="[rules.required, rules.search]"
              @keyup.enter="search_redirect"
            ></v-text-field>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="search.dialog = false">Cancel</v-btn>
            <v-btn text color="primary" @click="search_redirect">Search</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-menu offset-y close-on-click close-on-content-click v-model="account">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" :icon="$vuetify.breakpoint.xsOnly">
            <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-account-outline</v-icon>
            <span class="d-none d-sm-inline">Account</span>
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
          <v-list-item @click="show_first_steps">
            <v-list-item-icon class="my-auto mr-3">
              <v-icon>mdi-help-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>Help</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
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
      <template v-slot:extension>
        <v-progress-linear indeterminate v-if="content_loading" color="red lighten-1" class="mt-1"></v-progress-linear>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import CategoryNavigation from '@/components/CategoryNavigation'
import { alert, validatiors, UI_USER_LOGOUT } from "@/modules/ui";
import { mapState } from "vuex";

export default {
  data: () => ({
    drawer: false,
    account: false,
    search: {
      dialog: false,
      query: ""
    },
    rules: validatiors
  }),
  components: {
    CategoryNavigation
  },
  computed: mapState({
    name: state => state.user.name,
    email: state => state.user.email,
    content_loading: state => state.content_loading
  }),
  methods: {
    logout() {
      this.account = false
      this.$store.dispatch('logout')
        .then(() => this.$router.push({ name: 'auth_login' }))
        .then(() => alert.status(UI_USER_LOGOUT))
        .catch(err => console.log(err))
    },
    search_redirect() {
      if (this.$refs.search_field.validate() == false) {
        return
      }
      if (this.$route.name == 'home_search' && this.$route.params.query == this.search.query) {
        this.search.dialog = false
        return
      }
      this.$router.push({ name: 'home_search', params: { query: this.search.query }})
        .then(() => this.search.dialog = false)
        .catch(err => console.log(err))
    },
    show_first_steps() {
      this.$store.commit('first_steps_visible', true)
    }
  },
  watch: {
    'search.dialog': function(state) {
      if (!state)
        setTimeout(() => this.search.query = "", 128)
      else
        setTimeout(() => this.$refs.search_field.focus(), 128)
    }
  }
}
</script>

<style lang="scss">
header .v-toolbar__extension {
  padding: 0;
}

.v-input.search-field {
  input {
    max-height: 34px;
    padding-bottom: 6px;
  }
}
</style>