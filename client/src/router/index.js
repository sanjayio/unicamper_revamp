import Vue from 'vue';
import Router from 'vue-router';
import Search from '../pages/Search';
import Home from '../pages/Home';
import Detail from '../pages/Detail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
});
