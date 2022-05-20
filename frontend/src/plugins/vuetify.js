import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Ripple from 'vuetify/lib/directives/ripple';
Vue.use(Vuetify, {
  icons: {
    iconfont: ['fa', 'mdi'],
  },
  directives: {
    Ripple,
  },
});

export default new Vuetify({});
