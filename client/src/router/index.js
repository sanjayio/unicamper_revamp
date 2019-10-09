import Vue from 'vue';
import Router from 'vue-router';
import Search from '../pages/Search';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Planner from '../pages/Planner';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import CreatePlan from '../pages/CreatePlan';
import Plan from '../pages/Plan';
import Bushfire from '../static/safety/Bushfire';
import DrinkingWater from '../static/safety/DrinkingWater';
import EssentialTips from '../static/blog/EssentialTips';
import BeforeYouLeave from '../static/blog/BeforeYouLeave';
import Quiz from '../static/quiz/Quiz';
import firebase from 'firebase';
import Profile from '../pages/Profile';
import Guide from '../pages/Guide';

Vue.use(Router);

const router = new Router({
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
    },
    {
      path: '/planner',
      name: 'Planner',
      component: Planner,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/createPlan',
      name: 'CreatePlan',
      component: CreatePlan,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/plan',
      name: 'Plan',
      component: Plan,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/guide',
      name: 'Guide',
      component: Guide
    },
    {
      path: '/safety/bushfire',
      name: 'Bushfire',
      component: Bushfire
    },
    {
      path: '/safety/drinkingwater',
      name: 'DrinkingWater',
      component: DrinkingWater
    },
    {
      path: '/blog/essentialtips',
      name: 'EssentialTips',
      component: EssentialTips
    },
    {
      path: '/blog/beforeyouleave',
      name: 'BeforeYouLeave',
      component: BeforeYouLeave
    },
    {
      path: '/quiz',
      name: 'Quiz',
      component: Quiz,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
