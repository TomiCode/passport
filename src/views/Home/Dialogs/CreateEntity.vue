<template>
  <v-dialog v-model="dialog" max-width="640">
    <template v-slot:activator="{ on }">
      <v-btn
        fixed right bottom
        dark fab
        color="pink accent-3"
        class="mb-5"
        style="z-index: 5;"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>New password entry</v-card-title>
      <v-divider class="mb-4"></v-divider>
      <v-card-text>
        <v-form ref="form">
          <customize-entity v-model="store.appearance">
            <template v-slot:activator="{ handler }">
              <v-text-field
                label="Name"
                v-model="store.name"
                :counter="32"
                :rules="[rules.required, rules.entity.name]"
              >
                <template slot="prepend">
                  <v-btn
                    icon class="white--text"
                    @click="handler.show"
                    :class="store.appearance.color"
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
            :rules="[rules.entity.description]"
          ></v-text-field>

          <v-autocomplete
            clearable label="Category"
            v-model="store.category"
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
            :rules=[rules.entity.login]
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
            auto-grow no-resize
            label="Notes"
            rows="1"
            v-model="encrypted.notes"
            :counter="255"
            :rules=[rules.entity.notes]
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text color="primary"
          @click="create"
          :loading="loading"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import PasswordGenerator from '@/components/PasswordGenerator.vue'
import CustomizeEntity from '@/components/CustomizeEntity.vue'

import { mapState } from "vuex";
import { key, encrypt, message } from "openpgp";
import { request, API_STORE_CREATE } from "@/modules/api";
import {
  icons, colors, alert, validatiors, UI_CREATED_ENTITY
} from "@/modules/ui";

export default {
  components: {
    PasswordGenerator, CustomizeEntity
  },
  data: () => ({
    dialog: false,
    loading: false,
    generator: false,
    store: {
      name: "",
      category: 0,
      description: "",
      appearance: {
        icon: icons.icons[0].value,
        color: colors.colors[0].value
      }
    },
    encrypted: {
      login: "",
      password: "",
      address: "",
      notes: ""
    },
    rules: validatiors
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
          if (this.$route.params.category == res.content.category) {
            this.$emit('refresh')
          }
          alert.status(UI_CREATED_ENTITY)
        })
        .catch(reason => console.log(reason))
        .finally(() => this.loading = false)
    },
    clear() {
      this.store = Object.assign({}, {
        name: "",
        category: 0,
        description: "",
        appearance: {
          icon: icons.icons[0].value,
          color: colors.colors[0].value
        }
      })
      this.encrypted = Object.assign({}, {
        login: "",
        password: "",
        address: "",
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