<template>
<div class="category-view" v-if="loaded">
  <v-row v-if="stores && stores.length">
    <v-col>
      <entry-details @update="fetch($route.params.query)">
        <template v-slot:activator="{ handler }">
          <v-list>
            <v-subheader class="body-2 text--disabled">
              <v-icon class="text--disabled" left>mdi-folder-search</v-icon>
              Search results for<strong class="pl-1">{{ $route.params.query }}</strong>
            </v-subheader>
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
  <v-row v-else>
    <v-col>
      <div class="app-baner-main">
        <img src="@/assets/no_results.svg"/>
      </div>
      <div class="text-center">
        <div class="title font-weight-light mb-2">
          Sadly nothing found for <strong>{{ $route.params.query }}</strong>.
        </div>
        <div class="subtitle">
          Check if you spelled the word correctly or maybe, this entry does not yet exist?
        </div>
      </div>
    </v-col>
  </v-row>
</div>
</template>

<script>
import EntryDetails from '@/components/EntryDetails'

import { request, API_STORES } from "@/modules/api"
import { colors, icons } from "@/modules/ui"

export default {
  data: () => ({
    stores: [ ],
    loaded: false
  }),
  components: {
    EntryDetails
  },
  created() {
    this.fetch(this.$route.params.query)
  },
  props: {
    value: Boolean
  },
  methods: {
    fetch(query) {
      if (query.length <= 3) {
        this.loaded = true
        return
      }
      this.$store.dispatch('api_search_store', { query })
        .then(res => {
          this.stores = res.content.stores
          this.loaded = true
        })
        .catch(reason => console.log(reason))
    },
    color: id => colors.colors[id].value,
    icon: icons.map,
  },
  beforeRouteUpdate(to, from, next) {
    this.fetch(to.params.query)
    next()
  },
  watch: {
    value(state) {
      if (state) {
        this.fetch(this.$route.params.query)
        this.$emit('input', !state)
      }
    }
  }
}
</script>