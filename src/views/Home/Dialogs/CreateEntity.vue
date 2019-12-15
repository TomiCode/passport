<template>
  <v-dialog v-model="dialog" max-width="640">
    <template v-slot:activator="{ on }">
      <v-btn
        class="mb-5"
        style="z-index: 5;"
        v-on="on"
        color="pink accent-3"
        dark fab
        fixed right bottom
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Create new entry</v-card-title>
      <v-divider class="mb-4"></v-divider>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
        >
          <customize-entity v-model="store.appearance">
            <template v-slot:activator="{ handler }">
              <v-text-field
                v-model="store.name"
                label="Title"
                :counter="32"
              >
                <template slot="prepend">
                  <v-btn
                    :class="store.appearance.color"
                    class="white--text"
                    icon
                    @click="handler.show"
                  >
                    <v-icon v-text="store.appearance.icon"></v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </template>
          </customize-entity>

          <v-text-field
            v-model="store.description"
            label="Description"
            :counter="64"
            hint="aaaaa"
          ></v-text-field>

          <v-autocomplete
            v-model="store.category"
            label="Category"
            clearable
            item-value="id"
            item-text="name"
            :items="categories"
          ></v-autocomplete>

          <v-text-field
            v-model="encrypted.address"
            label="Website / Address"
            :counter="64"
          ></v-text-field>

          <v-text-field
            v-model="encrypted.login"
            label="Login"
          ></v-text-field>

          <password-generator @accepted="encrypted.password = $event">
            <template v-slot:activator="{ handler }">
              <v-text-field
                v-model="encrypted.password"
                label="Password"
                hint="You can also use the password generator on the left side."
              >
                <template slot="prepend">
                  <v-btn color="primary lighten-1" icon @click="handler.show">
                    <v-icon>mdi-cards-variant</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </template>
          </password-generator>

          <v-textarea
            v-model="encrypted.notes"
            name="input-7-4"
            label="Notes"
            rows="1"
            auto-grow
            no-resize
            :counter="255"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="create"
          :loading="loading"
        >Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import PasswordGenerator from '@/components/PasswordGenerator.vue'
import CustomizeEntity from '@/components/CustomizeEntity.vue'

import { request, API_STORE_CREATE } from "@/modules/api";
import { key, encrypt, message } from "openpgp";
import { mapState } from "vuex";

import { icons, colors, alert, UI_CREATED_ENTITY } from "@/modules/ui";

export default {
  components: {
    PasswordGenerator, CustomizeEntity
  },
  data: () => ({
    valid: false,
    dialog: false,
    generator: false,
    store: {
      name: "",
      appearance: {
        icon: icons.icons[0].value,
        color: colors.colors[0].value
      },
      description: "",
      category: 0
    },
    encrypted: {
      address: "",
      login: "",
      password: "",
      notes: ""
    },
    loading: false
  }),
  methods: {
    create() {
      this.loading = true
      encrypt({ message: this.msg_packet, publicKeys: this.public, armor: false })
        .then(cipher => request.do(API_STORE_CREATE, {
          data: {
            name: this.store.name,
            description: this.store.description,
            container: this.container,
            category: this.store.category,
            icon: icons.num(this.store.appearance.icon),
            color: colors.num(this.store.appearance.color),
            content: btoa(String.fromCharCode.apply(null, cipher.message.packets.write()))
          }
        }))
        .then(res => {
          this.dialog = false
          alert.status(UI_CREATED_ENTITY)
          if (this.$route.params.category == res.content.category) {
            this.$emit('refresh')
          }
        })
        .catch(reason => {
          console.log(reason)
        })
        .finally(() => this.loading = false)
    },
    clear() {
      this.store = Object.assign({}, {
        name: "",
        appearance: {
          icon: icons.icons[0].value,
          color: colors.colors[0].value
        },
        description: "",
        category: 0
      })
      this.encrypted = Object.assign({}, {
        address: "",
        login: "",
        password: "",
        notes: ""
      })
    },
  },
  computed:{
    msg_packet() {
      return message.fromText(JSON.stringify(this.encrypted))
    },
    ...mapState({
      categories: state => state.categories,
      public: state => state.openpgp.public,
      container: state => state.auth.container
    })
  },
  watch: {
    dialog(value) {
      if (value) {
        this.store.category = parseInt(this.$route.params.category)
      }
      else {
        setTimeout(() => this.clear(), 150)
      }
    }
  }
}
</script>