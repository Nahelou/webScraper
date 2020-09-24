/* eslint-disable import/order */
/* eslint-disable import/first */
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import hooks from '@u3u/vue-hooks';
import VueMapbox from 'vue-mapbox';
import Mapbox from 'mapbox-gl';

Vue.use(hooks);
Vue.use(VueCompositionAPI);
Vue.use(VueMapbox, { mapboxgl: Mapbox });

import 'bulma/css/bulma.css';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
