<template>
  <v-dialog v-model="dialog" max-width="520" :fullscreen="$vuetify.breakpoint.xsOnly">
    <template v-slot:activator="{ on }">
      <v-btn
        class="mb-5"
        style="z-index: 5;"
        v-on="on"
        color="deep-orange accent-3"
        dark fab
        fixed right bottom
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Create category</v-card-title>
      <v-divider class="mb-4"></v-divider>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="category.name"
            label="Title"
            :counter="24"
            :rules="[rules.required, rules.category.name]"
          ></v-text-field>
          <v-text-field
            v-model="category.description"
            label="Description"
            :counter="32"
            :rules="[rules.category.description]"
          ></v-text-field>

          <v-select
            return-object
            label="Category icon"
            v-model="category.icon"
            item-text="name"
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-btn
          text color="primary"
          @click="create"
          :loading="loading"
        >
          Create Category
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { request, API_CATEGORY_CREATE } from "@/modules/api";
import { icons, validatiors } from "@/modules/ui";

export default {
  data: () => ({
    loading: false,
    dialog: false,
    category: {
      name: "",
      description: "",
      icon: icons.icons[0]
    },
    rules: validatiors,
    icons: icons.icons,
  }),
  methods: {
    create() {
      if (!this.$refs.form.validate()) {
        return
      }
      this.loading = true
      this.$store.dispatch('api_create_category', {
        category: {
          ...this.category,
          icon: icons.num(this.category.icon.value)
        }
      })
        .then(() => this.dialog = false)
        .finally(() => this.loading = false)
    },
    clear() {
      this.category.name = ""
      this.category.description = ""
      this.category.icon = icons.icons[0]
      this.$refs.form.resetValidation()
    }
  },
  watch: {
    dialog(value) {
      if (!value) setTimeout(() => this.clear(), 256)
    }
  }
}
</script>