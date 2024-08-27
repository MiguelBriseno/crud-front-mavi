import Vue from 'vue';
import Router from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomePage from '../views/HomeView.vue';
import ClientsView from '../views/ClientsView.vue'; 

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/clients',
    name: 'ClientsView',
    component: ClientsView,
    meta: { requiresAuth: true }
  }
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    if (to.name === 'Login' && isAuthenticated) {
      next({ name: 'HomePage' });
    } else {
      next();
    }
  }
});

export default router;
