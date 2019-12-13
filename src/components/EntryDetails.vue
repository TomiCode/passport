<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    floating
    fixed
    right
    width="360"
    @transitionend="visible = drawer ? visible : false"
  >
    <v-list v-if="visible">
      <v-list-item>
        <v-list-item-avatar>
          <v-icon class="indigo lighten-1 white--text">mdi-earth</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Test</v-list-item-title>
          <v-list-item-subtitle>Test test</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon>
          <v-slide-x-reverse-transition
            mode="out-in"
          >
            <v-icon
              :key="`icon-${isEditing}`"
              :color="isEditing ? 'success' : 'info'"
              @click="isEditing = !isEditing"
              v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
            ></v-icon>
          </v-slide-x-reverse-transition>
        </v-list-item-icon>
      </v-list-item>
      <v-divider class="mb-4"></v-divider>
      <v-list-item>
        <v-text-field
          label="Title"
          append-outer-icon="mdi-content-copy"
        >
        </v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field
          label="Description"
          prepend-inner-icon="mdi-content-copy"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field
          label="Website"
          value="https://login.example.com"
          prepend-inner-icon="mdi-content-copy"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
          <v-text-field
            label="Login"
            value="aaaa@aaa.com"
          ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field
          type="password"
          label="Password"
          value="aaaa@aaa.com"
        >
          <template v-slot:append-outer>
            <v-slide-x-reverse-transition mode="out-in">
              <v-icon
                :key="`icon-${isEditing}-outer`"
                :color="isEditing ? 'success' : 'info'"
                @click="isEditing = !isEditing"
                v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
              ></v-icon>
            </v-slide-x-reverse-transition>
          </template>
          <template v-slot:append>
            <v-fade-transition mode="out-in">
              <v-icon
                :key="`icon-${isEditing}-append`"
                @click="isEditing = !isEditing"
                v-text="isEditing ? 'mdi-check-outline' : 'mdi-eye'"
              ></v-icon>
            </v-fade-transition>
          </template>
        </v-text-field>
      </v-list-item>

      <v-list-item>
        <v-textarea
          label="Notes"
          rows="1"
          auto-grow
          no-resize
        ></v-textarea>
      </v-list-item>

      <v-list-item>
        <v-btn text>Update</v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    visible: false,
    editing: false,
    loaded: {
      content: {
        address: "",
        login: "",
        password: "",
        notes: ""
      },
      name: "",
      description: "",
      category: "",
      icon: 0,
      color: 0
    },
    defaults: {
      content: {
        address: "",
        login: "",
        password: "",
        notes: ""
      },
      name: "",
      description: "",
      category: "",
      icon: 0,
      color: 0
    },
    isEditing: false
  }),
  props: {
    store: Object
  },
  watch: {
    store (val, old) {
      // console.log("watcher object value:", value)
      // Load encrypted container from server and decrypt it.
      if (val !== null) {
        if (!this.visible) {
          this.visible = true
        }
        // if (!this.drawer) {
        //   this.drawer = true
        // }
      }
      if (val !== null) {
        this.fetch(val)
      }
    }
  },
  methods: {
    fetch() {
      this.$store.dispatch('api_load_store', { store: this.store.id })
        .then(store => {
          this.drawer = true
          console.log(store)
        })
        .catch(reason => console.log(reason))
    }
  }
}
</script>