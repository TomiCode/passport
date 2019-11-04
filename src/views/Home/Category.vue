<template>
  <v-col>
    <p>Home/Category.vue</p>
    <entry-details

      :store="detail"
      @closed="details_closed"
    ></entry-details>

    <v-list subheader>
      <v-subheader inset>Last used entries</v-subheader>
      <v-list-item
        v-for="item in stores"
        :key="item.id"
        @click="showDetails(item)"
      >
        <v-list-item-avatar>
          <v-icon class="indigo lighten-1 white--text">mdi-earth</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-overlay absolute :value="false" opacity="0.05">
      <v-progress-circular color="indigo" indeterminate size="24"></v-progress-circular>
    </v-overlay>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle v-text="item.username"></v-list-item-subtitle>
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
    <create-entry></create-entry>
    <v-btn text color="pink" @click="load">Test</v-btn>
  </v-col>
</template>

<script>
import CreateEntry from '@/components/CreateEntry.vue'
import EntryDetails from '@/components/EntryDetails.vue'

import { request } from "@/modules/requests";
import { API_STORES } from "@/modules/api";

export default {
  components: {
    CreateEntry, EntryDetails
  },
  data: () => ({
    stores: [ ],
    drawer: false,
    dialog: false,
    detail: null
  }),
  methods: {
    load() {
      request.do(API_STORES)
        .then(resp => {
          this.stores = resp.stores
        })
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
    }
  }
}
</script>