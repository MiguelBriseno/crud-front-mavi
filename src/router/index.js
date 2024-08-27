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
    meta: { requiresAuth: true } // Requiere autenticación
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
  const isAuthenticated = !!localStorage.getItem('user'); // Verifica autenticación desde localStorage

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Si se requiere autenticación
    if (!isAuthenticated) {
      // No está autenticado, redirigir al login
      next({ name: 'Login' });
    } else {
      // Está autenticado, permitir el acceso
      next();
    }
  } else {
    // Rutas públicas
    if (to.name === 'Login' && isAuthenticated) {
      // Si está autenticado y la ruta es el login, redirigir al home
      next({ name: 'HomePage' });
    } else {
      // Permitir el acceso
      next();
    }
  }
});

export default router;
