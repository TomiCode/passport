<template>
  <v-dialog v-model="dialog" max-width="520">
    <template v-slot:activator="{ on }">
      <v-btn
        style="z-index: 100;"
        v-on="on"
        color="deep-orange"
        bottom
        dark
        fab
        fixed
        right
      >
        <v-icon>fas fa-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Add new category</v-card-title>
      <v-divider class="mb-4"></v-divider>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            v-model="category.name"
            label="Title"
            :counter="16"
          ></v-text-field>

          <v-text-field
            v-model="category.description"
            label="Description"
            :counter="32"
          ></v-text-field>

          <v-select
            v-model="category.icon"
            label="Category icon"
            item-text="name"
            :items="icons"
            :prepend-icon="category.icon"
          >
            <template v-slot:item="{ item }">
              <v-icon class="pr-3" v-text="item.value"></v-icon>
              {{ item.name }}
            </template>
          </v-select>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          :loading="loading"
        >Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { icons } from "@/modules/entity";

export default {
  data: () => ({
    loading: false,
    dialog: false,
    form: false,
    category: {
      name: "",
      description: "",
      icon: ""
    },
    icons: icons
  })
}
</script>