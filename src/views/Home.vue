<template>
  <v-container fluid>
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
