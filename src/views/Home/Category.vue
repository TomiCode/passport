<template>
<div class="category-view">
  <v-row v-if="has_stores">
  <v-col>
    <entry-details
      :store="detail"
      @closed="details_closed"
    ></entry-details>

    <v-list>
      <v-list-item
        v-for="item in stores"
        :key="item.id"
        @click="showDetails(item)"
      >
        <v-list-item-avatar>
          <v-icon
            class="white--text"
            :class="color(item.color)"
            v-text="icon(item.icon)"
          ></v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-overlay absolute :value="false" opacity="0.05">
            <v-progress-circular color="indigo" indeterminate size="24"></v-progress-circular>
          </v-overlay>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey">mdi-at</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey">mdi-key</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-col>
  </v-row>
   <v-row v-else
          justify="center"
          align="center"
        >
          <v-col cols="2">
            <v-icon color="grey" size="96px">mdi-emoticon-neutral-outline</v-icon>
          </v-col>
          <v-col cols="12">No entities yet created. Add a new one using the + button.</v-col>
   </v-row>
</div>
</template>

<script>
import Entity from '@/components/Entity'
import EntryDetails from '@/components/EntryDetails'

import { request, API_STORES } from "@/modules/api";
import { colors, icons } from "@/modules/ui";

export default {
  components: { EntryDetails, Entity },
  data: () => ({
    stores: [ ],
    drawer: false,
    dialog: false,
    detail: null,
    invalid: false,
    loading: false
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
      this.loading = true
      request.do(API_STORES, { data: { category: parseInt(category) }})
        .then(res => this.stores = res.content.stores)
        .finally(() => this.loading = false)
    },
    showDetails(store) {
      if (this.detail == store) {
        console.log("override detail object to trigger watcher")
        this.detail = Object.assign({}, store)
      }
      else {
        this.detail = store
      }
    },
    details_closed() {
      this.detail = null
    },
    icon: icons.map,
    color: id => colors.colors[id].value
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