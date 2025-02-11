<template>
<div class="entity-content">
  <slot name="activator" :handler="handler"></slot>
  <div class="entity-details-content">
    <v-navigation-drawer
      temporary fixed right
      v-model="drawer"
      width="340"
    >
      <v-form ref="form" lazy-validation v-if="visible">
        <v-list>
          <customize-entity :value="appearance" @input="update_appearance">
            <template v-slot:activator="{ handler }">
              <v-list-item>
                <v-list-item-avatar >
                  <v-icon
                    class="white--text"
                    v-text="icon(values.icon)"
                    :class="color(values.color)"
                    :disabled="!editing"
                    @click="handler.show"
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
                  <v-icon
                    right
                    v-if="$vuetify.breakpoint.xsOnly"
                    @click="drawer = false"
                  >
                    mdi-close
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </template>
          </customize-entity>
          <v-divider class="mb-4"></v-divider>
          <v-list-item>
            <v-text-field
              label="Title"
              v-model="values.name"
              :class="{ 'v-input--is-disabled': !editing }"
              :readonly="!editing"
              :counter="32"
              :rules="[rules.required, rules.entity.name]"
            >
              <template v-slot:append>
                <v-icon
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
              :counter="64"
              :rules="[rules.entity.description]"
            >
              <template v-slot:append>
                <v-icon
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
              :rules="[rules.entity.other]"
            >
              <template v-slot:append-outer>
                <v-fade-transition mode="out-in">
                  <v-icon
                    key="content.address.restore"
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
              :rules="[rules.entity.login]"
            >
              <template v-slot:append-outer>
                <v-fade-transition mode="out-in">
                  <v-icon
                    key="content.login.restore"
                    v-if="values.content.login != loaded.content.login"
                    @click="values.content.login = loaded.content.login"
                  >
                    mdi-backup-restore
                  </v-icon>
                  <v-icon
                    v-else key="content.login.copy"
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
              :rules="[rules.required, rules.entity.other]"
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
              auto-grow no-resize
              label="Notes"
              rows="1"
              v-model="values.content.notes"
              :class="{ 'v-input--is-disabled': !editing }"
              :readonly="!editing"
              :rules="[rules.entity.notes]"
            ></v-textarea>
          </v-list-item>
          <v-list-item class="text-center mt-4">
            <v-dialog v-model="remove_dialog" max-width="480">
              <template v-slot:activator="{ on }">
                <v-btn text block color="red lighten-1" :disabled="!editing" v-on="on">
                  <v-icon left>mdi-trash-can</v-icon> Delete
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">Delete entry</v-card-title>
                <v-divider class="mb-4"></v-divider>
                <v-card-text class="body-1">
                  Do You really want to remove <span class="font-weight-bold">{{values.name}}</span> from your database?
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary darken-1" text @click="remove_dialog = false">Cancel</v-btn>
                  <v-btn color="red darken-1" text @click="remove">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item>
        </v-list>
      </v-form>
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
              text class="mx-2" color="error lighten-1"
              @click="overlay_click(false)"
            >
              <v-icon left>mdi-close</v-icon> Close
            </v-btn>
            <v-btn
              text class="mx-2" color="primary lighten-1"
              @click="overlay_click(true)"
            >
              <v-icon left>mdi-trash-can-outline</v-icon> Clear
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>
  </div>
</div>
</template>

<script>
import PasswordGenerator from '@/components/PasswordGenerator.vue'
import CustomizeEntity from '@/components/CustomizeEntity.vue'

import _ from 'lodash'
import { mapState } from "vuex"

import {
  icons, colors, alert, clipboard, validatiors, UI_UPDATED_ENTITY
} from "@/modules/ui"

export default {
  components: {
    PasswordGenerator, CustomizeEntity
  },
  data: () => ({
    drawer: false,
    visible: false,
    editing: false,
    clipboard_clear: false,
    remove_dialog: false,
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
    },
    parent: null,
    handler: { show: () => { } },
    rules: validatiors
  }),
  created() {
    this.handler.show = this.show
  },
  methods: {
    show(store) {
      this.parent = store
      if (this.loaded.id === store.id) {
        this.cache()
      }
      else {
        this.visible = false
        this.fetch(store.id)
      }
    },
    fetch(store_id) {
      this.$store.dispatch('api_load_store', { store: store_id })
        .then(store => {
          this.loaded = store
          this.visible = true
          this.cache()
        })
        .catch(reason => console.log(reason))
    },
    cache() {
      this.values = Object.assign({}, this.loaded)
      if (this.loaded !== undefined)
        this.values.content = Object.assign({}, this.loaded.content)
      this.password.visible = false
      this.password.editing = false
      this.editing = false
      _.delay(() => this.drawer = true, 64)
    },
    clipboard(value) {
      clipboard.set(value)
      this.drawer = false
      this.clipboard_clear = true
    },
    overlay_click(type) {
      if (type == true) {
        clipboard.clear()
      }
      this.clipboard_clear = false
      this.drawer = true
    },
    save() {
      if (this.$refs.form.validate() == false) {
        return
      }
      this.$store.dispatch('api_update_store', { store: this.values })
        .then(({ content }) => {
          this.drawer = false
          if (this.parent != null && this.parent.category == content.category) {
            this.parent.color = content.color
            this.parent.icon = content.icon
            this.parent.name = content.name
            this.parent.description = content.description
            this.loaded = this.values
          }
          else {
            this.$emit('update')
          }
          alert.status(UI_UPDATED_ENTITY)
        })
        .catch(reason => console.log(reason))
    },
    remove() {
      this.$store.dispatch('api_delete_store', { store: this.loaded })
        .then(res => {
          if (res.content.id == this.loaded.id) {
            this.drawer = false
            this.$emit('update')
          }
          this.remove_dialog = false
        })
        .catch(err => console.log(err))
    },
    update_appearance({ icon, color }) {
      this.values.icon = icons.num(icon)
      this.values.color = colors.num(color)
    },
    icon: id => icons.icons[id].value,
    color: id => colors.colors[id].value
  },
  computed: {
    appearance() {
      return {
        icon: this.icon(this.values.icon),
        color: this.color(this.values.color)
      }
    },
    ...mapState({
      categories: state => state.categories
    })
  }
}
</script>