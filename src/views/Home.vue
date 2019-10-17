<template>
  <v-container fluid>
    <template v-if="decryption_modals">
      <decrypt v-if="container_valid"></decrypt>
      <create-container v-else></create-container>
    </template>
    <p>Home.vue</p>
    <v-fade-transition>
      <router-view></router-view>
    </v-fade-transition>
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
    CreateContainer,
    Decrypt
  },
  computed: {
    ...mapGetters([ 'container_valid' ])
  },
  methods: {
    nothing() {
      console.log("nothing.")
    }
  },
  created() {
    this.$store.dispatch('fetch_container')
      .finally(() => this.decryption_modals = true)
  },
  mounted() {
    this.dialog = true
  }
}
</script>
