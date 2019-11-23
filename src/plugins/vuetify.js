import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import pl from 'vuetify/es5/locale/pl';
import en from 'vuetify/es5/locale/en';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        secondary: colors.grey.lighten4,
        accent: colors.indigo,
      },
      dark: {
        primary: colors.lightBlue.lighten1,
        secondary: colors.grey.darken3,
        accent: colors.indigo
      }
    },
  },
  lang: {
    locales: { en, pl },
    current: 'en',
  },
  icons: {
    iconfont: 'mdi',
  },
});
