<template>
  <v-row>
  <v-dialog v-model="dialog" max-width="640">
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        bottom
        color="pink"
        dark
        fab
        fixed
        right
      >
        <v-icon>fas fa-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Create new entry</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            v-model="store.name"
            label="Title"
            :counter="32"
          ></v-text-field>

          <v-text-field
            v-model="store.description"
            label="Description"
            :counter="64"
          ></v-text-field>

          <v-text-field
            v-model="encrypted.address"
            label="Website / Address"
            :counter="64"
          ></v-text-field>

          <v-text-field
            v-model="encrypted.login"
            label="Login"
          ></v-text-field>

          <password-generator>
            <template v-slot:activator="{ handler }">
              <p>{{ props }}</p>
              <v-text-field
                v-model="encrypted.password"
                label="Password"
                prepend-icon="fas fa-magic"
                hint="You can also use the password generator on the left side."
                @click:prepend.stop="handler.show"
              >
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
          color="indigo"
          text
          @click="create"
          :loading="loading"
        >Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-row>
</template>

<script>
import PasswordGenerator from '@/components/PasswordGenerator.vue'

import { request } from "@/modules/requests"
import { API_STORE_CREATE } from "@/modules/api"
import { key, encrypt, message } from "openpgp";

export default {
  components: {
    PasswordGenerator
  },
  data: () => ({
    valid: false,
    dialog: false,
    generator: false,
    store: {
      name: "",
      description: ""
    },
    encrypted: {
      address: "",
      login: "",
      password: "",
      notes: ""
    },
    loading: false,
  }),
  methods: {
    async create() {
      this.loading = true

      let options = {
        message: message.fromText(JSON.stringify(this.encrypted)),
        publicKeys: (await key.readArmored(this.$store.state.crypto.certificate)).keys[0],
        privateKeys: [ this.$store.state.crypto.open_private ]
      }
      encrypt(options).then(ci => {
        request.do(API_STORE_CREATE, {
        data: {
          name: this.store.name,
          container: 1,
          category: 0,
          icon: "fas fa-user",
          color: 0,
          content: btoa(ci.data),
        }
      })
        .then(resp => {
          console.log(resp)
        })
        .finally(() => {
          this.loading = false
        })
      })

    }
  }
}
</script>