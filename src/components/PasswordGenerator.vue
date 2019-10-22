<template>
  <v-dialog v-model="dialog" max-width="480">
    <v-card>
      <v-card-title>Password generator</v-card-title>
      <v-divider></v-divider>
      <v-card-text>

        <v-text-field
          class="my-4"
          v-model="password"
          label="Password"
          counter
        ></v-text-field>

      <v-slider
          v-model="lenght"
          label="Lenght"
          min="6"
          max="32"
          thumb-label
        ></v-slider>

    <v-row justify="center">
      <v-subheader>Password options</v-subheader>
      <v-btn-toggle
        v-model="options"
        group
        color="indigo"
        multiple
        mandatory
        dense
      >

        <v-btn value="uppercase">
          A-Z
        </v-btn>
        <v-btn class="text-lowercase" value="lowercase">
          a-z
        </v-btn>

        <v-btn value="numbers">
          0-9
        </v-btn>
        <v-btn value="specials">
          #?!
        </v-btn>
      </v-btn-toggle>
    </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          color="green"
          text
        >New password</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="indigo"
          text
        >Accept</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    password: "",
    lenght: 16,
    options: ['uppercase', 'lowercase', 'numbers'],
  }),
  props: {
    value: Boolean
  },
  watch: {
    value() {
      this.dialog = true;
    }
  }
}
</script>