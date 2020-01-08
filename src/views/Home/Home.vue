<template>
<div class="home-view">
  <v-row v-if="loaded">
    <v-col v-if="has_home">
      <entry-details @update="fetch">
        <template v-slot:activator="{ handler }">
          <v-list>
            <template v-if="has_history">
              <v-subheader class="body-2 text--disabled">
                <v-icon class="text--disabled" left>mdi-history</v-icon>
                Last used entries
              </v-subheader>
              <v-list-item
                v-for="store in history"
                :key="`h.${store.id}`"
                @click="handler.show(store)"
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
                <v-list-item-action v-if="store.category != 0 && $vuetify.breakpoint.smAndUp">
                  <v-chip label :to="{ name: 'home_category', params: { category: store.category }}">
                    <v-icon left v-text="icon(category(store.category).icon)"></v-icon>
                    {{ category(store.category).name }}
                  </v-chip>
                </v-list-item-action>
              </v-list-item>
            </template>
            <template v-if="has_unassigned">
              <v-subheader class="body-2 text--disabled">
                <v-icon left class="text--disabled">mdi-key-outline</v-icon>
                Unassigned entries
              </v-subheader>
              <v-list-item
                v-for="store in unassigned"
                :key="`u.${store.id}`"
                @click="handler.show(store)"
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
            </template>
          </v-list>
        </template>
      </entry-details>
    </v-col>
    <v-col v-else-if="categories && categories.length">
      <v-list>
        <v-subheader class="body-2 text--disabled">
          <v-icon class="text--disabled" left>mdi-folder-heart</v-icon>
          Categories
        </v-subheader>
        <v-list-item
          v-for="category in categories"
          :key="category.id"
          :to="{ name: 'home_category', params: { category: category.id }}"
        >
          <v-list-item-avatar>
            <v-icon v-text="icon(category.icon)"></v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="category.name"></v-list-item-title>
            <v-list-item-subtitle v-text="category.description"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col v-else>
      <div class="app-baner-main">
        <img src="@/assets/empty.svg" />
      </div>
      <div class="text-center">
        <div class="title font-weight-light mb-2">Oh no, Your account seems to be empty!</div>
        <div class="subtitle">However, you can change that by adding passwords or creating categories to organize them as preferred.</div>
      </div>
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
    unassigned: [ ],
    history: [ ],
    loaded: false,
    forced: false
  }),
  components: {
    EntryDetails
  },
  created() {
    this.fetch()
  },
  props: {
    value: Boolean
  },
  methods: {
    fetch() {
      this.$store.dispatch('api_load_home')
        .then(res => {
          this.unassigned = res.content.unassigned
          this.history = res.content.history
          this.loaded = true
          if (!this.has_home && (this.categories == null || this.categories.length == 0) && !this.forced) {
            setTimeout(() => this.$store.commit('first_steps_force'), 1200)
            this.forced = true
          }
        })
        .catch(err => console.log(err))
    },
    category(id) {
      return this.categories.find(category => category.id == id)
    },
    color: id => colors.colors[id].value,
    icon: icons.map,
  },
  computed: {
    has_history() {
      return this.history && this.history.length
    },
    has_unassigned() {
      return this.unassigned && this.unassigned.length
    },
    has_home() {
      return this.has_history || this.has_unassigned
    },
    ...mapState({
      app_loading: state => state.content_loading,
      categories: state => state.categories
    })
  },
  watch: {
    value(state) {
      console.log("triggered")
      if (state) {
        this.fetch()
        this.$emit('input', !state)
      }
    }
  }
}
</script>

<style lang="scss">
.app-baner-main {
  max-width: 480px;
  max-height: 420px;
  margin-left: auto;
  margin-right: auto;
}

.dialog-baner {
  max-width: 360px;
  max-height: 240px;
  margin-left: auto;
  margin-right: auto;
}
</style>