import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pl from 'vuetify/es5/locale/pl';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { pl },
      current: 'pl',
    },
  icons: {
    iconfont: 'fa',
  },
});
