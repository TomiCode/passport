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
        v-for="item in elements"
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
  </v-col>
</template>

<script>
import CreateEntry from '@/components/CreateEntry.vue'
import EntryDetails from '@/components/EntryDetails.vue'

export default {
  components: {
    CreateEntry, EntryDetails
  },
  data: () => ({
    elements: [
      { id: "118739821793871", name: "Tesstt 01", username: null, },
      { id: "218739821733871", name: "Some shitty online forum", username: "super.not.my.account@gmail.com", },
      { id: "318739821113871", name: "Shady shit torrent", username: "justine.creepy@whatthecompany.com", },
      { id: "418739821793871", name: "Creepy porn site", username: "jd.otterfuck@gmail.com", },
      { id: "518732321794471", name: "Lorem ipsum account", username: "yes@no.com", },
    ],
    drawer: false,
    dialog: false,
    detail: null
  }),
  methods: {
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