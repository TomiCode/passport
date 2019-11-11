<template>
  <v-navigation-drawer
    app
    dark
    clipped
    color="primary"
    :value="value"
    @input="$emit('input', $event)"
  >
    <v-list>
      <v-list-item
        v-for="element in base"
        :key="element.name"
        :to="element.to"
      >
        <v-list-item-icon>
          <v-icon v-text="element.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="element.title"></v-list-item-title>
          <v-list-item-subtitle v-text="element.description"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <div class="user-categories" v-if="hasCategories">
        <v-divider class="my-2"></v-divider>
        <v-list-item
          v-for="category in categories"
          :key="category.id"
          :to="{ name: 'home_category', params: { category: category.id }}"
        >
          <v-list-item-icon>
            <v-icon v-text="icon(category.icon)"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="category.name"></v-list-item-title>
            <v-list-item-subtitle v-text="category.description"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
      <v-divider class="my-2"></v-divider>
      <v-list-item :to="{ name: 'home_manage' }">
        <v-list-item-icon>
          <v-icon>mdi-circle-edit-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Manage Categories</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import { icons } from "@/modules/ui";

export default {
  data: () => ({
    base: [
      { icon: "mdi-home", title: "General", description: "", to: {} },
      { icon: "mdi-history", title: "Last used", description: "", to: {} }
    ]
  }),
  methods: {
    icon: id => icons.map(id)
  },
  props: {
    value: Boolean
  },
  computed: mapState({
    lastused: state => state.user.preferences.lastused,
    categories: state => state.categories,
    hasCategories: state => !!state.categories.length
  })
}
</script>