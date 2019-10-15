<template>
  <v-dialog v-model="dialog" max-width="640">
    <v-card>
      <v-card-title>Decryption key</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-alert text color="orange" border="left" class="mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Cras tempus felis interdum, sollicitudin enim in, convallis augue.
        </v-alert>
        <v-text-field
          prepend-icon="fas fa-user-lock"
          type="password"
          label="Contaner password"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="red darken-1" text @click="dialog = false">Logout</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Decrypt
          <v-icon right dark>fas fa-angle-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  })
}
</script>