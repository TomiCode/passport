<template>
  <v-app>
    <router-view name="nav"></router-view>
    <alerts></alerts>
    <decrypt></decrypt>
    <create-container></create-container>
    <v-content>
      <v-overlay :value="global_loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <div class="render-view-content">
        <router-view></router-view>
      </div>
      <v-footer padless absolute>
        <v-card
          outlined tile
          width="100%"
          class="text-center"
          style="border-width: 1px 0 0;"
        >
          <v-card-text>
            Vinca Project 2019 &copy; Agnieszka &amp; Tomasz
          </v-card-text>
        </v-card>
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

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    account: false,
    global_loading: false
  }),
  components: {
    CategoryNavigation, Alerts, Decrypt, CreateContainer
  },
  created () {
    request.config.authToken = () => this.$store.getters.auth_token
    request.config.errorHandlers[API_INVALID_SESSION] = () => {
      this.$store.commit('account_forget')
      this.$router.push({ name: 'auth_login' })
        .then(() => alert.status(API_INVALID_SESSION))
    }
    if (this.$store.state.auth.token !== null) {
      this.global_loading = true
      this.$store.dispatch('api_auth_session')
        .catch(reason => console.log(reason))
        .finally(() => this.global_loading = false)
    }
  }
};
</script>

<style lang="scss">
.passport-headline {
  text-decoration: none;
  font-size: 1.35rem;
}
.render-view-content {
  margin-bottom: 4em;
}
</style>