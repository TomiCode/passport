<template>
  <v-dialog
    max-width="640"
    persistent
    :value="visible"
  >
    <v-card>
      <v-card-title>Account decryption</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-alert
          prominent
          text
          class="mt-2"
          color="teal lighten-1"
          icon="mdi-information-variant"
        >
          Please enter the decryption key below to access your personal data.
          The password isn't stored nor send through the web.
        </v-alert>
        <v-text-field
          prepend-icon="mdi-account-lock"
          type="password"
          label="Decryption password"
          v-model="password"
          v-on:keyup.enter="decrypt"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="red darken-1" :disabled="loading">
          <v-icon left dark>mdi-logout-variant</v-icon>
          Logout
        </v-btn>
        <v-btn
          text color="accent darken-1"
          :disabled="loading"
          :loading="loading"
          @click.stop="decrypt"
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