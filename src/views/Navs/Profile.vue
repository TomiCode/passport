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
      <v-btn text class="mr-1" :icon="$vuetify.breakpoint.xsOnly">
        <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-magnify</v-icon>
         <span class="d-none d-sm-inline">Search</span>
      </v-btn>
      <v-menu
        v-model="account"
        close-on-click
        close-on-content-click
        offset-y
      >
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
        <v-progress-linear
          v-if="content_loading"
          color="red lighten-1"
          class="mt-1"
          :indeterminate="true"
        ></v-progress-linear>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import CategoryNavigation from '@/components/CategoryNavigation'
import { alert, UI_USER_LOGOUT } from "@/modules/ui";
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
    email: state => state.user.email,
    content_loading: state => state.content_loading
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

<style lang="scss">
header .v-toolbar__extension {
  padding: 0;
}
</style>