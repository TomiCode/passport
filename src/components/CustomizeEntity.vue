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
            :items="colors"
          >
            <template v-slot:item="{ item }">
                <v-icon small class="mr-4" :color="item.value">fas fa-circle</v-icon>
                {{ item.name }}
            </template>
            <template v-slot:prepend-inner>
              <v-icon
                small
                class="pt-1 pr-1"
                :color="selected.color"
              >fas fa-circle</v-icon>
            </template>
          </v-select>
          <v-select
            v-model="selected.icon"
            label="Icon type"
            item-text="name"
            :items="icons"
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
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="primary">Accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { colors, icons } from "@/modules/entity";

export default {
  data: () => ({
    selected: {
      color: "",
      icon: "fas fa-address-book"
    },
    colors: colors,
    icons: icons,
    dialog: false,
  }),
  mounted() {
    console.log("hello sweetheart.")
    this.dialog = true
  }
}
</script>