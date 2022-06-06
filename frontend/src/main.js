import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import * as VueGoogleMaps from "vue2-google-maps";
import dotenv from 'dotenv';
import VCalendar from 'v-calendar';

dotenv.config();
Vue.config.productionTip = false;
Vue.use(CKEditor);
Vue.use(VCalendar);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAoIFwJ1C9WfNqHiCTwKJf3U_U-I4rDq1w",
    libraries: "places"
  },
  installComponents: true,
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
