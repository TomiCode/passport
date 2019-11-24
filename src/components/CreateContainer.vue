<template>
  <v-dialog
    persistent
    max-width="680"
    :value="no_container"
  >
    <v-card>
      <v-card-title>Encrypt your account</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-alert
          prominent
          text
          color="deep-orange lighten-1"
          icon="mdi-cloud-lock"
          class="mt-4"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Cras tempus felis interdum, sollicitudin enim in, convallis augue.
        </v-alert>
        <v-form>
        <v-text-field
          prepend-icon="mdi-database-lock"
          v-model="password"
          type="password"
          label="Contaner password"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-lock-question"
          type="password"
          label="Password confirmation"
        ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="indigo"
          :loading="loading"
          @click="create_container"
        >
          Accept &amp; Continue
          <v-icon right dark>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    loading: false,
    password: ""
  }),
  methods: {
    create_container() {
      this.loading = true
      this.$store.dispatch('api_create_container', { password: this.password })
        .finally(() => this.loading = false)
    }
  },
  computed: mapGetters([ 'no_container' ])
}
</script>