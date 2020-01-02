<template>
<v-row>
  <v-col>
    <category-edit v-model="edit.show" :category="edit.category"></category-edit>
    <v-list>
      <v-list-item v-for="category in categories" :key="category.id" @click="edit_dialog(category)">
        <v-list-item-icon>
          <v-icon v-text="icon(category.icon)"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="category.name"></v-list-item-title>
          <v-list-item-subtitle v-text="category.description"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click.stop="remove_dialog(category)">
            <v-icon color="red darken-1">mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-dialog v-model="remove.dialog" max-width="600">
      <v-card>
        <v-card-title class="headline">Delete category</v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-card-text class="body-1" v-if="remove.category">
          Do you want to remove <span class="font-weight-bold">{{ remove.category.name }}</span> from your categories?
        </v-card-text>
        <v-card-text>
          <v-alert prominent text icon="mdi-folder-move" type="info">
          Select below, where should the entries from <span class="font-weight-bold">{{ remove.category.name }}</span> be assigned to, after the deletion has proceeded.
          </v-alert>
          <v-autocomplete
            clearable persistent-hint label="Migration category"
            hint="Leave this field empty to migrate them to Your Home section."
            v-model="remove.migrate"
            item-value="id"
            item-text="name"
            :items="categories"
          ></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="remove.dialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="accept_remove">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</v-row>
</template>

<script>
import CategoryEdit from "@/components/CategoryEdit"

import { icons, alert, UI_DELETED_CATEGORY } from "@/modules/ui"
import { mapState } from "vuex"

export default {
  data: () => ({
    remove: {
      migrate: 0,
      category: {},
      dialog: false
    },
    edit: {
      category: {},
      show: false
    }
  }),
  components: {
    CategoryEdit
  },
  methods: {
    edit_dialog(category) {
      this.edit.category = category
      this.edit.show = true
    },
    remove_dialog(category){
      this.remove.category = category
      this.remove.dialog = true
    },
    accept_remove() {
      this.$store.dispatch('api_delete_category', {
        category: this.remove.category,
        migrate: this.remove.migrate
      })
        .then(res => {
          this.remove.dialog = false
          alert.status(UI_DELETED_CATEGORY)
        })
        .catch(err => console.log(err))
    },
    icon: id => icons.map(id)
  },
  computed: mapState({
    categories: state => state.categories
  })
}
</script>