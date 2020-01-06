<template>
  <v-dialog persistent max-width="640" :value="visible" :fullscreen="$vuetify.breakpoint.xsOnly">
    <v-card>
      <v-card-title>Account decryption</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="text-center">
          <img src="@/assets/decrypt.svg" height="240"/>
        </div>
        <v-alert
          text color="info"
          icon="mdi-shield-key-outline"
          :dense="$vuetify.breakpoint.xsOnly"
          :prominent="$vuetify.breakpoint.smAndUp"
        >
          To access your encrypted data, you need to enter your decryption password below.
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
          Logout
        </v-btn>
        <v-btn
          text color="primary darken-1"
          :disabled="loading"
          :loading="loading"
          @click.stop="decrypt"
        >
          Decrypt
          <v-icon right dark>mdi-chevron-right</v-icon>
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