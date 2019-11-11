<template>
  <v-container fluid>
    <v-breadcrumbs :items="path_items"></v-breadcrumbs>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  computed: {
    path_items () {
      return [
        { text: "Home", to: { name: 'about_index' }, exact: true },
        ...this.$route.matched.map(route => ({ text: route.meta.title, to: route.path }))
      ]
    },

  }
}
</script>