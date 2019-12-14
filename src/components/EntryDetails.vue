<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary floating
    fixed right
    width="380"
    @transitionend="visible = drawer ? visible : false"
  >
    <v-list v-if="visible">
      <v-list-item>
        <v-list-item-avatar>
          <v-icon
            class="white--text"
            v-text="icon(values.icon)"
            :class="color(values.color)"
          ></v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="values.name"></v-list-item-title>
          <v-list-item-subtitle v-text="values.description"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon>
          <v-slide-x-reverse-transition mode="out-in">
            <v-icon
              :key="`store-icon-${editing}`"
              :color="editing ? 'red lighten-1' : 'primary'"
              @click="editing = !editing"
              v-text="editing ? 'mdi-cloud-upload' : 'mdi-circle-edit-outline'"
            ></v-icon>
          </v-slide-x-reverse-transition>
        </v-list-item-icon>
      </v-list-item>
      <v-divider class="mb-4"></v-divider>
      <v-list-item>
        <v-text-field
          label="Title"
          v-model="values.name"
          :class="{ 'v-input--is-disabled': !editing }"
          :readonly="!editing"
        >
          <template v-slot:append-outer>
            <v-icon
              color="accent"
              v-if="values.name != loaded.name"
              @click="values.name = loaded.name"
            >
              mdi-backup-restore
            </v-icon>
          </template>
        </v-text-field>
      </v-list-item>
      <v-list-item>
        <v-text-field
          label="Description"
          v-model="values.description"
          :class="{ 'v-input--is-disabled': !editing }"
          :readonly="!editing"
        >
          <template v-slot:append-outer>
            <v-icon
              color="accent"
              v-if="values.description != loaded.description"
              @click="values.description = loaded.description"
            >
              mdi-backup-restore
            </v-icon>
          </template>
        </v-text-field>
      </v-list-item>
      <v-list-item>
        <v-autocomplete
          v-model="values.category"
          label="Category"
          clearable
          item-value="id"
          item-text="name"
          :items="categories"
          :disabled="!editing"
        >
          <template v-slot:append-outer>
            <v-icon
              color="accent"
              v-if="values.category != loaded.category"
              @click="values.category = loaded.category"
            >
              mdi-backup-restore
            </v-icon>
          </template>
        </v-autocomplete>
      </v-list-item>
      <v-list-item>
        <v-text-field
          label="Website / Address"
          v-model="values.content.address"
          :class="{ 'v-input--is-disabled': !editing }"
          :readonly="!editing"
        >
          <template v-slot:append-outer>
            <v-fade-transition mode="out-in">
              <v-icon
                key="content.address.restore"
                color="accent"
                v-if="values.content.address != loaded.content.address"
                @click="values.content.address = loaded.content.address"
              >
                mdi-backup-restore
              </v-icon>
              <v-icon
                v-else
                key="content.address.copy"
                @click="clipboard(values.content.address)"
              >
                mdi-content-copy
              </v-icon>
            </v-fade-transition>
          </template>
        </v-text-field>
      </v-list-item>
      <v-list-item>
        <v-text-field
          label="Login"
          v-model="values.content.login"
          :class="{ 'v-input--is-disabled': !editing }"
          :readonly="!editing"
        >
          <template v-slot:append-outer>
            <v-fade-transition mode="out-in">
              <v-icon
                key="content.login.restore"
                color="accent"
                v-if="values.content.login != loaded.content.login"
                @click="values.content.login = loaded.content.login"
              >
                mdi-backup-restore
              </v-icon>
              <v-icon
                v-else
                key="content.login.copy"
                @click="clipboard(values.content.login)"
              >
                mdi-content-copy
              </v-icon>
            </v-fade-transition>
          </template>
        </v-text-field>
      </v-list-item>
      <v-list-item>
        <v-text-field
          label="Password"
          v-model="values.content.password"
          :class="{ 'v-input--is-disabled': !password.editing }"
          :readonly="!password.editing"
          :type="password.visible || password.editing ? 'text' : 'password'"
        >
          <template v-slot:append-outer>
            <password-generator @accepted="values.content.password = $event">
              <template v-slot:activator="{ handler }">
                <v-slide-x-reverse-transition mode="out-in">
                  <v-icon
                    key="password.editing.generator.icon"
                    v-if="editing && password.editing"
                    @click="handler.show"
                  >
                    mdi-cards-variant
                  </v-icon>
                  <v-icon
                    key="password.edit.icon"
                    v-else-if="editing"
                    @click="password.editing = true"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    v-else
                    key="password.copy.icon"
                    @click="clipboard(values.content.password)"
                  >
                    mdi-content-copy
                  </v-icon>
                </v-slide-x-reverse-transition>
              </template>
            </password-generator>
          </template>
          <template v-slot:append>
            <v-icon
              v-if="!password.editing"
              v-text="password.visible ? 'mdi-eye-off' : 'mdi-eye'"
              @click="password.visible = !password.visible"
            ></v-icon>
            <v-icon
              v-else-if="values.content.password != loaded.content.password"
              @click="values.content.password = loaded.content.password"
            >
              mdi-backup-restore
            </v-icon>
            <v-icon v-else @click="password.editing = false">
              mdi-pencil-off
            </v-icon>
          </template>
        </v-text-field>
      </v-list-item>
      <v-list-item>
        <v-textarea
          label="Notes"
          rows="1"
          auto-grow no-resize
          v-model="values.content.notes"
          :class="{ 'v-input--is-disabled': !editing }"
          :readonly="!editing"
        ></v-textarea>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import PasswordGenerator from '@/components/PasswordGenerator.vue'

import { mapState } from "vuex";
import { icons, colors, alert, clipboard } from "@/modules/ui";

export default {
  components: {
    PasswordGenerator
  },
  data: () => ({
    drawer: false,
    visible: false,
    editing: false,
    password: {
      visible: false,
      editing: false
    },
    loaded: {
      content: { }
    },
    values: {
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
    }
  }),
  props: {
    store: Object
  },
  watch: {
    store (val, old) {
      if (val !== null) {
        if (!this.visible)
          this.visible = true
        if (old === null || old.id !== val.id)
          this.fetch(val)
        else
          this.cache()
      }
    }
  },
  methods: {
    fetch() {
      this.$store.dispatch('api_load_store', { store: this.store.id })
        .then(store => {
          this.loaded = store
          this.cache()
        })
        .catch(reason => console.log(reason))
    },
    cache() {
      this.values = Object.assign({}, this.loaded)
      if (this.loaded !== undefined)
        this.values.content = Object.assign({}, this.loaded.content)
      this.editing = false
      this.drawer = true
    },
    clipboard(value) {
      clipboard.set(value)
      this.drawer = false
      this.$store.state.clipboard_clear = true
    },
    icon: id => icons.icons[id].value,
    color: id => colors.colors[id].value
  },
  computed: mapState({
    categories: state => state.categories
  })
}
</script>