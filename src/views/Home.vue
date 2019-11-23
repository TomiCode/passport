<template>
  <v-container fluid>
    <v-breadcrumbs :items="path_items" v-if="has_categories"></v-breadcrumbs>
    <div class="home-container" v-if="private_decrypted">
      <router-view name="create" @refresh="reload_content = true"></router-view>
      <router-view v-model="reload_content"></router-view>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

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
    ...mapGetters([ 'container_valid', 'has_categories', 'private_decrypted' ]),
  }
}
</script>
