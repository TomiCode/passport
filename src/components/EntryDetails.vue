<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    floating
    fixed
    right
    width="300"
    @transitionend="transitionend"
  >
    <v-list dense v-if="visible">
      <v-list-item>
        <v-list-item-avatar>
          <v-icon class="indigo lighten-1 white--text">fas fa-globe</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Test</v-list-item-title>
          <v-list-item-subtitle>Test test</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-text-field
            label="Title"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-text-field
            label="Description"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-text-field
            label="Website"
            value="https://login.example.com"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-text-field
            label="Login"
            value="aaaa@aaa.com"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-text-field
            type="password"
            label="Password"
            value="aaaa@aaa.com"
            append-icon="fas fa-eye"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-textarea
            label="Notes"
            rows="1"
            auto-grow
            no-resize
          ></v-textarea>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-btn outlined small>Update</v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    visible: false
  }),
  created() {
    console.log("Hello my dear.")
  },
  props: {
    store: Object
  },
  watch: {
    store (value) {
      console.log("watcher object value:", value)
      // Load encrypted container from server and decrypt it.
      if (value !== null) {
        if (!this.visible) {
          this.visible = true
        }
        if (!this.drawer) {
          this.drawer = true
        }
      }
    }
  },
  methods: {
    transitionend (obj) {
      if (!this.drawer) {
        this.visible = false
      }
    }
  }
}
</script>