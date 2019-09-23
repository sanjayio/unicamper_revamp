/* eslint-disable no-new */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/css/style.default.css';
import './assets/vendor/magnific-popup/magnific-popup.css';
import './assets/css/custom.css';
import './assets/vendor/nouislider/nouislider.css';
import * as VueGoogleMaps from 'vue2-google-maps';

if (window.google.maps) {
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAkshHi3pZZ6oWR5FnDzXvJvdiqSyNBf9A',
      libraries: 'places' // necessary for places input
    }
  });
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
