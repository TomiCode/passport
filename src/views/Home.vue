<template>
  <v-container fluid>
    <create-container></create-container>
    <p>Home.vue</p>
    <v-fade-transition>
      <router-view v-if="!dialog"></router-view>
    </v-fade-transition>
  </v-container>
</template>

<script>
import CreateContainer from '@/components/CreateContainer.vue'
import Decrypt from '@/components/Decrypt.vue'

export default {
  data: () => ({
    dialog: false
  }),
  components: {
    CreateContainer,
    Decrypt
  },
  methods: {
    nothing() {
      console.log("nothing.")
    }
  },
  mounted() {
    this.dialog = true
  }
}
</script>
