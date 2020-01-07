<template>
  <div class="about-view">
    <div class="about-banner">
      <div class="about-header">
        <div class="display-1 ">Vinca <strong>Passport</strong></div>
        <div class="subtitle">Open source &amp; secure password manager</div>
      </div>
      <img src="@/assets/about.svg" />
    </div>
    <v-row class="about-description">
      <v-col cols="12" class="text-center">
        <blockquote class="blockquote">heh</blockquote>
      </v-col>
      <v-col cols="12" md="4">
        <v-card flat class="transparent">
          <v-card-text class="text-center">
            <v-icon x-large color="primary lighten-2">mdi-vuejs</v-icon>
          </v-card-text>
          <v-card-title primary-title class="layout justify-center">
            <div class="headline text-center">Reliable technologies</div>
          </v-card-title>
          <v-card-text>
            Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card flat class="transparent">
          <v-card-text class="text-center">
            <v-icon x-large color="primary lighten-2">mdi-shield-lock-outline</v-icon>
          </v-card-text>
          <v-card-title primary-title class="layout justify-center">
            <div class="headline">Encrypted</div>
          </v-card-title>
          <v-card-text>
            Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card flat class="transparent">
          <v-card-text class="text-center">
            <v-icon x-large color="primary lighten-2">mdi-github-circle</v-icon>
          </v-card-text>
          <v-card-title primary-title class="layout justify-center">
            <div class="headline text-center">Open Source</div>
          </v-card-title>
          <v-card-text>
            Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss">
.about-banner {
  max-width: 800px;
  max-height: 640px;
  margin: 0 auto 0;

  .about-header {
    text-align: center;
    padding: 4em 0 0;
  }
  @media screen and (min-width: 768px) {
    .about-header {
      padding: 6em 0 0;
      margin-bottom: -6em;
      text-align: left;
      padding-left: 2.5em;
    }
  }
}

.about-description {
  display: flex;
  max-width: 1200px;
  margin: 0 auto 0;
  padding: 4.5em 0 0;

  @media screen and (max-width: 960px) {
    padding: 4.5em 2.5em 0;
  }
}
</style>