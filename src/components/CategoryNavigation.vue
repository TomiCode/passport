<template>
  <v-navigation-drawer
    app
    dark
    clipped
    color="indigo accent-2"
    :value="value"
    @input="$emit('input', $event)"
  >
    <v-list>
      <v-list-item :to="{ name:'home_index' }" exact>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>General</v-list-item-title>
          <v-list-item-subtitle>Home sweet home</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list subheader v-if="hasCategories">
        <v-row align="center" class="pa-0">
          <v-col cols="6" class="py-0">
            <v-subheader>Categories</v-subheader>
          </v-col>
          <v-col cols="6" class="text-right">
            <v-btn
              text
              small
              rounded
              class="mr-2"
              :to="{ name: 'home_manage' }"
            >
              Manage
              <v-icon right small>mdi-wrench</v-icon>
            </v-btn>
          </v-col>
        </v-row>
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
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import { icons } from "@/modules/ui";

export default {
  methods: {
    icon: id => icons.map(id)
  },
  props: {
    value: Boolean
  },
  computed: mapState({
    categories: state => state.categories,
    hasCategories: state => !!state.categories.length
  })
}
</script>