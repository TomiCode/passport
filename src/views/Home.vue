<template>
  <v-container>
    <v-breadcrumbs :items="path_items" v-if="has_categories"></v-breadcrumbs>
    <div class="home-container" v-if="private_decrypted">
      <v-overlay :value="clipboard" opacity=".9" z-index="999">
        <v-container>
          <v-row justify="center" align="center">
            <v-col cols="12" class="text-center">
              <v-icon size="96px">mdi-clipboard-check-outline</v-icon>
            </v-col>
            <v-col cols="12" class="title font-weight-light text-center">
              <p>Your data was successfully copied to the clipboard.</p>
              <p>After it has been inserted, you can clear your clipboard below.</p>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn
                text
                color="primary lighten-2"
                class="mx-2"
                @click="clear_clipboard"
              >
                <v-icon left>mdi-trash-can-outline</v-icon> Clear
              </v-btn>
              <v-btn
                text
                color="error lighten-2"
                class="mx-2"
                @click="$store.state.clipboard_clear = false"
              >
                <v-icon left>mdi-close</v-icon> Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-overlay>
      <router-view name="create" @refresh="reload_content = true"></router-view>
      <router-view v-model="reload_content"></router-view>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { clipboard } from "@/modules/ui";

export default {
  data: () => ({
    reload_content: false
  }),
  computed: {
    path_items() {
      let segments = this.$route.matched.map(route => ({ text: route.meta.title, disabled: true }))
      if (this.$route.name === "home_category") {
        segments.push({
          text: this.$store.state.categories.find(
              category => category.id == this.$route.params.category
            ).name,
          disabled: true
        })
      }
      return segments
    },
    ...mapGetters([ 'container_valid', 'has_categories', 'private_decrypted', 'clipboard' ]),
  },
  methods: {
    clear_clipboard() {
      clipboard.clear()
      this.$store.state.clipboard_clear = false
    }
  }
}
</script>
