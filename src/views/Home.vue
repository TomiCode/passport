<template>
  <v-container fluid>
    <v-breadcrumbs :items="path_items" v-if="has_categories"></v-breadcrumbs>
    <div class="home-container" v-if="private_decrypted">
      <router-view name="create"></router-view>
      <router-view></router-view>
    </div>
  </v-container>
</template>

<script>
import CreateContainer from '@/components/CreateContainer.vue'
import Decrypt from '@/components/Decrypt.vue'

import { mapGetters } from "vuex";

export default {
  data: () => ({
    decryption_modals: false
  }),
  components: {
    CreateContainer, Decrypt
  },
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
