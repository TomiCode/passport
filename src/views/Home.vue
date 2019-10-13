<template>
  <v-container fluid>
    <p>Home.vue</p>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  data: () => ({

  }),
  methods: {
    nothing() {
      console.log("nothing.")
    }
  }
}
</script>
