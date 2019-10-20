<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    absolute
    floating
    dark
    right
    width="300"
    color="indigo"
  >
    <v-list dense>
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
    drawer: false
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
      if (value !== null && !this.drawer) {
        this.drawer = true
      }
    }
  }
}
</script>