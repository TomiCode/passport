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
        primary: colors.indigo,
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
