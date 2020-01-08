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
        <blockquote class="blockquote">
          Daily we use a lot of services on the internet. That means remembering (and typing) lots of login details and passwords. We are here to make it easier, safer and more accessible.
        </blockquote>
      </v-col>
      <v-col cols="12" md="4">
        <v-card flat class="transparent">
          <v-card-text class="text-center">
            <v-icon x-large color="primary lighten-2">mdi-vuejs</v-icon>
          </v-card-text>
          <v-card-title primary-title class="layout justify-center">
            <div class="headline text-center">Innovative</div>
          </v-card-title>
          <v-card-text class="text-justify">
            Created from scratch with security and ease of use in mind, we decided to use trending and open source technologies. It allowed us to create way better user experiences and performance-wise software.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card flat class="transparent">
          <v-card-text class="text-center">
            <v-icon x-large color="red lighten-2">mdi-shield-lock-outline</v-icon>
          </v-card-text>
          <v-card-title primary-title class="layout justify-center">
            <div class="headline">Encrypted</div>
          </v-card-title>
          <v-card-text class="text-justify">
            Passwords and login details are client-side encrypted, which means that the data is securely stored on our servers. Nobody can access them. Even for us, your data is invisible.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card flat class="transparent">
          <v-card-text class="text-center">
            <v-icon x-large color="purple lighten-2">mdi-github-circle</v-icon>
          </v-card-text>
          <v-card-title primary-title class="layout justify-center">
            <div class="headline text-center">Open Source</div>
          </v-card-title>
          <v-card-text class="text-justify">
            When it comes to passwords and personal data, we should trust nobody. That’s why our application and server source codes are publicly available to inspect, test, and even make improvements.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" class="py-12">
        <v-card flat outlined style="max-width: 740px; margin: 0 auto;">
          <v-card-text class="text-center">
            <div class="title">Still not convinced?</div>
            <div class="body-1 pa-2">
              We are happy to hear from You. Send us an email at:
              <a>mail@example.com</a>
            </div>
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

  blockquote.blockquote {
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>