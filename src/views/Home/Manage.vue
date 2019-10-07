<template>
  <v-list dense>
    <v-subheader inset>User defined categories</v-subheader>
    <v-list-item @click.stop="nothing">
       <v-list-item-avatar>
          <v-icon class="orange lighten-1 white--text">fas fa-folder</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Aaaaaa</v-list-item-title>
          <v-list-item-subtitle>Description</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon small color="red darken-1">fas fa-trash</v-icon>
          </v-btn>
        </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data: () => ({

  }),
  methods: {
    nothing() {

    }
  }
}
</script>