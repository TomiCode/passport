<template>
  <v-app>
    <v-overlay :value="global_loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <alerts></alerts>
    <decrypt></decrypt>
    <router-view name="nav"></router-view>
    <v-content>
      <div class="render-view-content">
        <router-view></router-view>
      </div>
      <v-footer
        color="secondary"
        padless
        absolute
      >
        <v-row
          justify="center"
          no-gutters
          style="border-top: 1px solid lightgray"
        >
          <v-col
            class="secondary py-4 text-center grey--text"
            cols="12"
          >
            Vinca Project 2019 &copy; Agnieszka &amp; Tomasz
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