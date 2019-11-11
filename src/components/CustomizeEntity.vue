<template>
  <div class="customize-entity">
    <v-dialog v-model="dialog" max-width="460">
      <v-card>
        <v-card-title>Customize appearance</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-select
            class="mt-4"
            v-model="selected.color"
            label="Icon color"
            item-text="name"
            :items="entity.colors"
          >
            <template v-slot:item="{ item }">
              <v-icon class="mr-4" :color="item.value">mdi-circle</v-icon>
              {{ item.name }}
            </template>
            <template v-slot:prepend-inner>
              <v-icon
                small
                class="pt-1 pr-1"
                :color="selected.color"
              >mdi-circle</v-icon>
            </template>
          </v-select>
          <v-select
            v-model="selected.icon"
            label="Icon type"
            item-text="name"
            :items="entity.icons"
            :prepend-icon="selected.icon"
          >
            <template v-slot:item="{ item }">
              <v-icon class="pr-3" v-text="item.value"></v-icon>
              {{ item.name }}
            </template>
          </v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            text
            @click="dialog = false"
          >Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="accept"
          >Accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <slot name="activator" :handler="handler"></slot>
  </div>
</template>

<script>
import { colors, icons } from "@/modules/ui";

export default {
  data: () => ({
    selected: {
      color: "",
      icon: ""
    },
    entity: {
      colors: colors.colors,
      icons: icons.icons
    },
    handler: { show: () => { } },
    dialog: false,
  }),
  created() {
    console.log("hello sweetheart.")
    this.handler.show = this.show
  },
  methods: {
    show() {
      this.selected = {
        color: this.value.color,
        icon: this.value.icon
      }
      this.dialog = true
    },
    accept() {
      this.dialog = false
      this.$emit('input', {
        color: this.selected.color,
        icon: this.selected.icon
      })
    }
  },
  props: {
    value: Object
  }
}
</script>