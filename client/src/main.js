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
import firebase from 'firebase';

if (window.google.maps) {
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAkshHi3pZZ6oWR5FnDzXvJvdiqSyNBf9A',
      libraries: 'places' // necessary for places input
    }
  });
}

Vue.config.productionTip = false;
let app = '';

//keep the config out of this file in prod.
const config = {
  apiKey: 'AIzaSyBOYCBiW2b4DYJQQWkFGl68DU-sSSsBxtg',
  authDomain: 'unicamper-firebase.firebaseapp.com',
  databaseURL: 'https://unicamper-firebase.firebaseio.com',
  projectId: 'unicamper-firebase',
  storageBucket: '',
  messagingSenderId: '689606992745',
  appId: '1:689606992745:web:661b42b66c42569f8713f8',
  measurementId: 'G-PX7EEGJW1F'
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
