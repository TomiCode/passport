<template>
  <v-dialog v-model="dialog" max-width="640">
    <v-card>
      <v-card-title>Decryption key</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-alert text prominent type="info" class="mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Cras tempus felis interdum, sollicitudin enim in, convallis augue.
        </v-alert>
        <v-text-field
          prepend-icon="fas fa-user-lock"
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
          color="blue darken-1"
          text
          @click="dialog = false"
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
  }),
  mounted() {
    this.dialog = true
  }
}
</script>