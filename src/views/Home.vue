<template>
  <v-container fluid>
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
    <p>Home.vue</p>

    <v-fade-transition hide-on-leave>
      <router-view v-if="!dialog"></router-view>
      <v-list v-else>
        <v-list-item>
          <v-list-item-content>
          <v-skeleton-loader type="avatar, sentences"></v-skeleton-loader>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-fade-transition>
  </v-container>

</template>

<script>
export default {
  data: () => ({
    dialog: false
  }),
  methods: {
    nothing() {
      console.log("nothing.")
    }
  },
  mounted() {
    this.dialog = true
  }
}
</script>
