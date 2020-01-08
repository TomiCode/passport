<template>
  <v-dialog persistent max-width="680" :value="visible" :fullscreen="$vuetify.breakpoint.xsOnly">
    <v-card>
      <v-card-title>First steps</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="">
        <div class="text-center">
          <img src="@/assets/first_steps.svg" height="240"/>
        </div>
        <div class="text-center mb-4">
          Those few steps should provide You a basic understanding of the fundamental interface features If you're just getting started with Passport.
        </div>
        <div class="mb-4">
          <div class="title font-weight-regular">Basics</div>
          On nearly every page there exists a button, in the bottom right corner
          <v-btn fab color="primary" style="height: 24px; min-width: 24px;" elevation="1"><v-icon small>mdi-plus</v-icon></v-btn>
          that allows you contextually create new entries. For example, being at the home section, you can easily create a new password entry.
        </div>
        <div class="mb-4">
          <div class="title font-weight-regular">Generator</div>
          You can use the included password generator
          <v-btn small icon elevation="1" style="height: 24px; min-width: 24px;" color="pink"><v-icon small>mdi-cards-variant</v-icon></v-btn>
          while creating new entries or editing them. This feature allows for creating secure keys without leaving the page.
        </div>
        <div class="mb-4">
          <div class="title font-weight-regular">Categories</div>
          <div class="pb-2">
            Creating new entries in a single list is often cumbersome and untidy. Categories come handy, as they create subdirectories that collect only associated login details.
            You can access them within the navigation bar, opened thought the <v-icon small>mdi-menu</v-icon> icon.
          </div>
          <div>
            In the management section, you can easily add, edit, and even remove unwanted categories.
            It is accessed in the same navigation bar though the
            <v-btn color="primary" depressed x-small rounded :to="{ name: 'home_manage' }">
              manage
              <v-icon right x-small>mdi-wrench</v-icon>
            </v-btn>
            button.
          </div>
        </div>
        <div class="">
          <div class="title font-weight-regular">Properties</div>
          <div class="pb-2">
            Here you can adjust privacy settings, disable the collection of last opened entries, change your account password, email address, and switch to a more eye-friendly dark theme.
          </div>
          <div>
            You can access it in the Account menu on the top right area of the page. There you can open this dialog again if required in the future.
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="ma-0">
        <v-spacer></v-spacer>
        <v-btn text @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    close() {
      this.$store.commit('first_steps_visible', false)
    }
  },
  computed: mapState({
    visible: state => state.first_steps.visible
  })
}
</script>