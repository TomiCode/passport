<template>
<v-dialog v-model="dialog" max-width="520">
  <v-card>
    <v-card-title>Edit category</v-card-title>
    <v-divider class="mb-4"></v-divider>
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="properties.name"
          label="Title"
          :counter="24"
          :rules="[rules.required, rules.category.name]"
        ></v-text-field>
        <v-text-field
          v-model="properties.description"
          label="Description"
          :counter="32"
          :rules="[rules.category.description]"
        ></v-text-field>
        <v-select
          return-object
          label="Category icon"
          v-model="properties.icon"
          item-text="name"
          :items="icons"
          :prepend-icon="properties.icon.value"
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
      <v-btn text @click="dialog = false" :disabled="loading">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="update" :loading="loading">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
import { icons, alert, validatiors, UI_UPDATED_CATEGORY } from "@/modules/ui";

export default {
  data: () => ({
    dialog: false,
    loading: false,
    properties: {
      name: "",
      description: "",
      icon: 0
    },
    icons: icons.icons,
    rules: validatiors
  }),
  props: {
    category: Object,
    value: Boolean
  },
  methods: {
    update() {
      if (this.$refs.form.validate() == false) {
        return
      }
      this.loading = true
      this.$store.dispatch('api_update_category', {
        category: {
          ...this.properties,
          id: this.category.id,
          icon: icons.num(this.properties.icon.value)
        }
      })
        .then(res => {
          this.dialog = false
          this.category.name = this.properties.name
          this.category.description = this.properties.description
          this.category.icon = icons.num(this.properties.icon.value)
          alert.status(UI_UPDATED_CATEGORY)
        })
        .catch(err => console.log(err))
        .finally(() => this.loading = false)
    }
  },
  watch: {
    value(val) {
      if (val && !this.dialog) {
        this.properties.name = this.category.name
        this.properties.description = this.category.description
        this.properties.icon = icons.icons[this.category.icon]
        this.dialog = true
      }
    },
    dialog(val) {
      if (this.value !== val)
        this.$emit('input', val)
    }
  }
}
</script>