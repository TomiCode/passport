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
      <v-list-item
        exact
        class="pl-2"
        :to="{ name:'home_index' }"
      >
        <v-list-item-avatar class="mr-2">
          <v-icon>mdi-home</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
          <v-list-item-subtitle>Unassigned &amp; last used</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list subheader>
      <v-row align="center" class="pa-0">
        <v-col cols="6" class="py-0">
          <v-subheader>Categories</v-subheader>
        </v-col>
        <v-col cols="6" class="text-right">
          <v-btn
            text small rounded class="mr-2"
            :to="{ name: 'home_manage' }"
          >
            Manage
            <v-icon right small>mdi-wrench</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <template v-if="has_categories">
        <v-list-item
          v-for="category in categories"
          class="pl-2"
          :key="category.id"
          :to="{ name: 'home_category', params: { category: category.id }}"
        >
          <v-list-item-avatar class="mr-2">
            <v-icon v-text="icon(category.icon)"></v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="category.name"></v-list-item-title>
            <v-list-item-subtitle v-text="category.description"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list-item v-else>
        <v-list-item-content>
          <v-list-item-subtitle>No categories available.</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import { icons } from "@/modules/ui";

export default {
  methods: {
    icon: id => icons.map(id)
  },
  props: {
    value: Boolean
  },
  computed: mapGetters([ 'categories', 'has_categories' ])
}
</script>