<template>
  <div>
    <first-steps></first-steps>
    <v-container>
      <v-breadcrumbs :items="path_items" v-if="has_categories"></v-breadcrumbs>
      <div class="home-container" v-if="private_decrypted">
        <router-view name="create" @refresh="reload_content = true"></router-view>
        <router-view v-model="reload_content"></router-view>
      </div>
    </v-container>
  </div>
</template>

<script>
import FirstSteps from "@/components/FirstSteps"
import { mapGetters } from "vuex"

export default {
  data: () => ({
    reload_content: false
  }),
  components: {
    FirstSteps
  },
  computed: {
    path_items() {
      let segments = this.$route.matched.map(route => ({ text: route.meta.title, disabled: true }))
      if (this.$route.name === "home_category") {
        if (this.category === undefined) {
          this.$router.push({ name: 'not_found' })
          return
        }
        segments.push({ text: this.category.name, disabled: true })
      }
      return segments
    },
    category() {
      return this.$store.state.categories.find(
        category => category.id == this.$route.params.category
      )
    },
    ...mapGetters([ 'container_valid', 'has_categories', 'private_decrypted' ]),
  }
}
</script>
