<template>
  <div class="entity-details-content">
    <v-navigation-drawer
      temporary floating
      fixed right
      width="340"
      v-model="drawer"
      @transitionend="change_state"
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
                v-if="editing"
                key="store-icon-save"
                color="deep-orange lighten-1"
                @click="save"
              >
                mdi-cloud-upload
              </v-icon>
              <v-icon v-else @click="editing = true" key="store-icon-edit">
                mdi-circle-edit-outline
              </v-icon>
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
            <template v-slot:append>
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
            <template v-slot:append>
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
        <v-list-item class="text-center mt-4">
          <v-btn
            text block
            color="red lighten-1"
            :disabled="!editing"
          >
            <v-icon left>mdi-trash-can</v-icon>
            Remove
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-overlay :value="clipboard_clear" opacity=".9" z-index="999">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" class="text-center">
            <v-icon size="96px">mdi-clipboard-check-outline</v-icon>
          </v-col>
          <v-col cols="12" class="title font-weight-light text-center">
            <p>Your data was successfully copied to the clipboard.</p>
            <p>After it has been inserted, you can clear your clipboard below.</p>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn
              text
              color="primary lighten-2"
              class="mx-2"
              @click="overlay_click(true)"
            >
              <v-icon left>mdi-trash-can-outline</v-icon> Clear
            </v-btn>
            <v-btn
              text
              color="error lighten-2"
              class="mx-2"
              @click="overlay_click(false)"
            >
              <v-icon left>mdi-close</v-icon> Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>
  </div>
</template>

<script>
import PasswordGenerator from '@/components/PasswordGenerator.vue'

import _ from 'lodash'
import { mapState } from "vuex"
import { icons, colors, alert, clipboard, UI_UPDATED_ENTITY } from "@/modules/ui"

export default {
  components: {
    PasswordGenerator
  },
  data: () => ({
    drawer: false,
    visible: false,
    editing: false,
    clipboard_clear: false,
    password: {
      visible: false,
      editing: false
    },
    loaded: {
      id: 0,
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
    store: Object,
    value: Boolean
  },
  watch: {
    value(state) {
      if (state && this.store !== null) {
        this.visible = true
        if (this.store.id !== this.loaded.id)
          this.fetch()
        else
          this.cache()
      }
    }
  },
  methods: {
    fetch: _.throttle(function() {
      this.$store.dispatch('api_load_store', { store: this.store.id })
        .then(store => {
          this.loaded = store
          this.cache()
        })
        .catch(reason => {
          console.log(reason)
        })
    }, 128),
    cache() {
      this.values = Object.assign({}, this.loaded)
      if (this.loaded !== undefined)
        this.values.content = Object.assign({}, this.loaded.content)
      this.editing = false
      this.password.visible = false
      this.password.editing = false
      _.delay(() => this.drawer = true, 64)
    },
    clipboard(value) {
      clipboard.set(value)
      this.drawer = false
      this.clipboard_clear = true
    },
    overlay_click(type) {
      if (type == true)
        clipboard.clear()
      this.clipboard_clear = false
      this.drawer = true
    },
    save() {
      this.$store.dispatch('api_update_store', { store: this.values })
        .then(({ content }) => {
          this.drawer = false
          if (content.category == this.store.category) {
            this.store.color = content.color
            this.store.icon = content.icon
            this.store.name = content.name
            this.store.description = content.description
            this.loaded = this.values
          }
          else
            this.$emit('update')
          alert.status(UI_UPDATED_ENTITY)
        })
        .catch(reason => console.log(reason))
    },
    change_state() {
      if (!this.drawer && !this.clipboard_clear) {
        this.visible = false
        this.$emit('input', false)
      }
    },
    icon: id => icons.icons[id].value,
    color: id => colors.colors[id].value
  },
  computed: mapState({
    categories: state => state.categories
  })
}
</script>