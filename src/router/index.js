import { createRouter, createWebHistory } from 'vue-router';
import authService from '/src/services/auth';
import Home from '../views/Home.vue';
import Login from '../views/auth/Login.vue';
import LoginConfirm from '../views/auth/LoginConfirm.vue';
import ManagePlan from '../views/ManagePlan.vue';
import RecoveryEmail from '../views/RecoveryEmail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/manage_plan/',
    name: 'ManagePlan',
    component: ManagePlan,
    meta: { requiresAuth: true },
  },
  {
    path: '/recovery_email/',
    name: 'RecoveryEmail',
    component: RecoveryEmail,
    meta: { requiresAuth: true },
  },
  {
    path: '/login/',
    name: 'Login',
    component: Login,
    meta: { requiresNotAuth: true },
  },
  {
    path: '/login/confirm/',
    name: 'LoginConfirm',
    component: LoginConfirm,
    meta: { requiresNotAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// Redirect to login if not authenticated
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authService.isAuthenticated()) {
    next({name: 'Login'}); // Redirect to login if not authenticated
  } 
  else if (to.meta.requiresNotAuth && authService.isAuthenticated()) {
    next({name: 'Home'}); // Redirect to home if already authenticated
  }
  else  {
    next(); // Proceed to the route
  }
});

export default router;