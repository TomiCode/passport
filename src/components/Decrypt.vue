<template>
  <v-dialog
    max-width="640"
    persistent
    :value="visible"
  >
    <v-card>
      <v-card-title>Decryption key</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-alert text color="orange" border="left" class="mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Cras tempus felis interdum, sollicitudin enim in, convallis augue.
        </v-alert>
        <v-text-field
          prepend-icon="mdi-account-lock"
          type="password"
          label="Contaner password"
          v-model="password"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          color="red darken-1"
          text
          :disabled="loading"
        >
          <v-icon left dark>mdi-logout-variant</v-icon>
          Logout
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click.stop="decrypt"
          :disabled="loading"
          :loading="loading"
        >
        <v-icon left dark>mdi-lock-open</v-icon>
          Decrypt
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { alert, UI_INVALID_DECRYPT } from "@/modules/ui";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    loading: false,
    dialog: false,
    password: ""
  }),
  methods: {
    decrypt() {
      this.loading = true
      setTimeout(() => {
        this.$store.dispatch('decrypt_private', { password: this.password })
        .catch(reason => {
          if (reason instanceof Error) {
            alert.status(UI_INVALID_DECRYPT)
          }
        })
        .finally(() => this.loading = false)
      }, 200)
    }
  },
  computed: {
    visible() {
      if (!this.private_decrypted) {
        this.password = ""
      }
      return this.private_loaded && !this.private_decrypted
    },
    ...mapGetters([ 'private_loaded', 'private_decrypted' ]),
  }
}
</script>