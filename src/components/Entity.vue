<template>
  <v-list-item @click="$emit('click', entity)">
    <v-list-item-avatar>
      <v-icon
        class="indigo lighten-1 white--text"
        v-text="entity.icon"
      ></v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-text="entity.name"></v-list-item-title>
      <v-list-item-subtitle v-text="entity.username"></v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    entity: Object
  }
}
</script>