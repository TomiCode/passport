<template>
<div class="category-view">
  <v-row v-if="has_stores">
    <v-col>
      <entry-details @update="fetch($route.params.category)">
        <template v-slot:activator="{ handler }">
          <v-list>
            <v-list-item
              v-for="item in stores"
              :key="item.id"
              @click="handler.show(item)"
            >
              <v-list-item-avatar>
                <v-icon
                  class="white--text"
                  :class="color(item.color)"
                  v-text="icon(item.icon)"
                ></v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
      </entry-details>
    </v-col>
  </v-row>
  <v-row v-else class="mt-10">
    <v-col cols="12" class="text-center">
      <v-icon size="6em" class="text--disabled">mdi-folder-information-outline</v-icon>
    </v-col>
    <v-col cols="12" class="title font-weight-regular text-center text--disabled">
      No entities yet created. Add a new one using the + button.
    </v-col>
  </v-row>
</div>
</template>

<script>
import Entity from '@/components/Entity'
import EntryDetails from '@/components/EntryDetails'

import _ from 'lodash'
import { mapState } from "vuex";
import { request, API_STORES } from "@/modules/api"
import { colors, icons } from "@/modules/ui"

export default {
  components: { EntryDetails, Entity },
  data: () => ({
    stores: [ ],
    invalid: false
  }),
  created() {
    this.fetch(this.$route.params.category)
  },
  props: {
    value: Boolean
  },
  methods: {
    fetch(category) {
      if (category === undefined) {
        this.invalid = true
        return
      }
      this.$store.dispatch('api_load_category', {
        category: parseInt(category)
      })
        .then(res => this.stores = res.content.stores)
        .catch(reason => console.log(reason))
    },
    color: id => colors.colors[id].value,
    icon: icons.map,
  },
  beforeRouteUpdate(to, from, next) {
    this.fetch(to.params.category)
    next()
  },
  watch: {
    value(state) {
      if (state) {
        this.fetch(this.$route.params.category)
        this.$emit('input', !state)
      }
    }
  },
  computed: {
    has_stores() {
      return this.stores !== null && this.stores.length > 0
    }
  }
}
</script>