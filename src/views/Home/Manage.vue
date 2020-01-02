<template>
<v-row>
  <v-col>
    <v-list>
      <v-list-item v-for="category in categories" :key="category.id">
        <v-list-item-icon>
          <v-icon v-text="icon(category.icon)"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="category.name"></v-list-item-title>
          <v-list-item-subtitle v-text="category.description"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon color="red darken-1">mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-col>
</v-row>
</template>

<script>
import { icons } from "@/modules/ui";
import { mapState } from "vuex";

export default {
  methods: {
    icon: id => icons.map(id)
  },
  computed: mapState({
    categories: state => state.categories
  })
}
</script>