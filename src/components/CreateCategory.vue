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
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Add new category</v-card-title>
      <v-divider class="mb-4"></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="form">
          <v-text-field
            v-model="category.name"
            label="Title"
            :counter="16"
            :rules="[ validation.name ]"
          ></v-text-field>

          <v-text-field
            v-model="category.description"
            label="Description"
            :counter="32"
            :rules="[ validation.description ]"
          ></v-text-field>

          <v-select
            v-model="category.icon"
            label="Category icon"
            item-text="name"
            return-object
            :items="icons"
            :prepend-icon="category.icon.value"
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
          text
          color="primary"
          @click="create"
          :loading="loading"
        >Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { icons, iconId } from "@/modules/entity";
import { request } from "@/modules/requests";
import { API_CATEGORY_CREATE } from "@/modules/api";

export default {
  data: () => ({
    loading: false,
    dialog: false,
    form: false,
    category: {
      name: "",
      description: "",
      icon: icons.icons[0]
    },
    validation: {
      name: (val) => /^[\w ]{3,16}$/u.test(val) || 'Invalid category name!',
      description: (val) => /^[\w ]{0,32}$/u.test(val) || 'Invalid category description!'
    },
    icons: icons.icons,
  }),
  methods: {
    create() {
      if (!this.$refs.form.validate()) return

      this.loading = true
      this.$store.dispatch('category_create', {
        name: this.category.name,
        description: this.category.description,
        icon: iconId(this.category.icon.value)
      })
        .then(() => this.dialog = false)
        .finally(() => this.loading = false)
    }
  }
}
</script>