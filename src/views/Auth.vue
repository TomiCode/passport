<template>
  <v-container>
    <v-breadcrumbs :items="path_items"></v-breadcrumbs>
    <div class="auth-container">
      <router-view></router-view>
    </div>
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

<style lang="scss" scoped>
@media only screen and (min-width: 720px) {
  .auth-container {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>