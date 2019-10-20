<template>
  <v-dialog v-model="dialog" max-width="640">
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        bottom
        color="pink"
        dark
        fab
        fixed
        right
      >
        <v-icon>fas fa-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Create new entry</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            v-model="store.name"
            label="Title"
            :counter="32"
          ></v-text-field>

          <v-text-field
            v-model="store.description"
            label="Description"
            :counter="64"
          ></v-text-field>

          <v-text-field
            v-model="encrypted.address"
            label="Website / Address"
            :counter="64"
          ></v-text-field>

          <v-text-field
            v-model="encrypted.login"
            label="Login"
          ></v-text-field>

          <v-text-field
            v-model="encrypted.password"
            label="Password"
            prepend-icon="fas fa-magic"
            hint="You can use the password generator on the left side."
            @click:prepend="true"
          >
          </v-text-field>

          <v-textarea
            v-model="encrypted.notes"
            name="input-7-4"
            label="Notes"
            rows="1"
            auto-grow
            no-resize
            :counter="255"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="indigo" text>Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    dialog: false,
    store: {
      name: "",
      description: ""
    },
    encrypted: {
      address: "",
      login: "",
      password: "",
      notes: ""
    }
  }),

}
</script>