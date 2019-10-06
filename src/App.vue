<template>
  <v-app>
    <v-app-bar app color="indigo darken-3" dark>
       <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title style="width: 300px" class="headline text-uppercase ml-0 pl-4">
        <span>Passport</span>
      </v-toolbar-title>

      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="fas fa-search"
        label="Search"
      ></v-text-field>

      <div class="flex-grow-1"></div>

      <v-btn depressed rounded color="indigo">
        <v-icon left>far fa-user-circle</v-icon>
        Yeet
      </v-btn>

    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
