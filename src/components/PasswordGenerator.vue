<template>
  <div class="password-generator">
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

          >
            <template slot="append-outer">
              <v-btn
                color="indigo"
                icon
                @click="new_password"
              >
                <v-icon small>fas fa-redo-alt</v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <v-slider
            v-model="length"
            label="Length"
            min="6"
            max="42"
            thumb-label
            thumb-size="24"
            @change="new_password"
          ></v-slider>
          <v-row justify="center">
            <v-subheader>Password options</v-subheader>
            <v-btn-toggle
              v-model="options"
              color="indigo"
              dense
              group
              multiple
              mandatory
              @change="new_password"
            >
              <v-btn value="uppercase">A-Z</v-btn>
              <v-btn class="text-lowercase" value="lowercase">a-z</v-btn>
              <v-btn value="numbers">0-9</v-btn>
              <v-btn value="special">#?!</v-btn>
            </v-btn-toggle>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="indigo"
            text
            @click="accept"
          >Accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <slot name="activator" :handler="activator"></slot>
  </div>
</template>

<script>
import { generate } from "@/modules/password";

export default {
  created() {
    this.activator = Object.assign({}, { show: this.show_dialog })
  },
  data: () => ({
    dialog: false,
    password: "",
    length: 16,
    options: ['uppercase', 'lowercase', 'numbers'],
    activator: { }
  }),
  methods: {
    new_password() {
      this.password = generate(this.options, this.length)
    },
    show_dialog() {
      this.new_password()
      this.dialog = true
    },
    accept() {
      this.$emit('accepted', this.password)
      this.dialog = false
    }
  }
}
</script>