<template>
<div class="home-view" >
  <v-row>
    <v-col v-if="history.length || unassigned.length">
      <entry-details :store="detail" v-model="show_details"></entry-details>
      <v-list>
        <template v-if="history.length > 0">
          <v-subheader class="body-2 text--disabled">
            <v-icon small class="pr-4">mdi-history</v-icon>
            Last used entries
          </v-subheader>
          <v-list-item
            v-for="store in history"
            :key="`${store.id}.history`"
            @click="details(store)"
          >
            <v-list-item-avatar>
              <v-icon
                class="white--text"
                :class="color(store.color)"
                v-text="icon(store.icon)"
              ></v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ store.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ store.description }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action v-if="store.category != 0">
              <v-chip label :to="{ name: 'home_category', params: { category: store.category }}">
                <v-icon left v-text="icon(category(store.category).icon)"></v-icon>
                {{ category(store.category).name }}
              </v-chip>
            </v-list-item-action>
          </v-list-item>
          <v-divider class="mt-2"></v-divider>
        </template>
        <v-subheader class="body-2 text--disabled">
          <v-icon small class="pr-4">mdi-key-outline</v-icon>
          Unassigned entries
        </v-subheader>
        <v-list-item
          v-for="store in unassigned"
          :key="`${store.id}.unassigned`"
          @click="details(store)"
        >
          <v-list-item-avatar>
            <v-icon
              class="white--text"
              :class="color(store.color)"
              v-text="icon(store.icon)"
            ></v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ store.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ store.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</div>
</template>

<script>
import EntryDetails from "@/components/EntryDetails"

import { mapState } from "vuex"
import { colors, icons } from "@/modules/ui"

export default {
  data: () => ({
    show_details: false,
    detail: { },
    unassigned: [ ],
    history: [ ]
  }),
  components: {
    EntryDetails
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.$store.dispatch('api_load_home')
        .then(res => {
          this.unassigned = res.content.unassigned
          this.history = res.content.history
        })
        .catch(err => console.log(err))
    },
    details: _.throttle(function(store) {
      this.detail = store
      this.show_details = true
    }, 512),
    category(id) {
      return this.categories.find(category => category.id == id)
    },
    color: id => colors.colors[id].value,
    icon: icons.map,
  },
  computed: mapState({
    app_loading: state => state.content_loading,
    categories: state => state.categories
  })
}
</script>