<template>
  <v-col>
  <v-list two-line subheader>
      <v-subheader inset>Last used entries</v-subheader>
      <v-list-item
        v-for="item in elements"
        :key="item.id"
        @click="nothing"
      >
        <v-list-item-avatar>
          <v-icon class="indigo lighten-1 white--text">fas fa-globe</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle v-text="item.username"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey" small>fas fa-at</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey" small>fas fa-key</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
       <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
    >
      <v-icon>fas fa-plus</v-icon>
    </v-btn>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    elements: [
      { id: "218739821793871", name: "Tesstt 01", username: "i.am.random@wtf.com", },
      { id: "218739821733871", name: "Some shitty online forum", username: "super.not.my.account@gmail.com", },
      { id: "218739821113871", name: "Shady shit torrent", username: "justine.creepy@whatthecompany.com", },
      { id: "218739821793871", name: "Creepy porn site", username: "jd.otterfuck@gmail.com", },
      { id: "218732321794471", name: "Lorem ipsum account", username: "yes@no.com", },
    ]
  })
}
</script>