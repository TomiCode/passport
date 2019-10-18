<template>
  <v-dialog persistent v-model="dialog" max-width="680">
    <v-card>
      <v-card-title>Setup container</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-alert text prominent type="info" class="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Cras tempus felis interdum, sollicitudin enim in, convallis augue.
        </v-alert>
        <v-text-field
          prepend-icon="fas fa-user-lock"
          v-model="password"
          type="password"
          label="Contaner password"
        ></v-text-field>
        <v-text-field
          prepend-icon="fas fa-lock"
          type="password"
          label="Password confirmation"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          text
          color="indigo"
          :loading="loading"
          @click="create_container"
        >
          Accept &amp; Continue
          <v-icon right dark>fas fa-angle-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    loading: false,
    password: ""
  }),
  mounted() {
    this.dialog = true
  },
  methods: {
    create_container() {
      this.loading = true
      this.$store.dispatch('create_container', this.password)
        .finally(() => this.dialog = false)
    }
  }
}
</script>