import { createRouter, createWebHashHistory } from 'vue-router'

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase.ts';

import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/Auth/LoginView.vue';
import RegisterView from '@/views/Auth/RegisterView.vue';
import ForgotPasswordView from '@/views/Auth/ForgotPasswordView.vue';
import Dashbord from '@/views/Dashboard/HomeView.vue';
import FriendsView from '@/views/Dashboard/FriendsView.vue';
import settingsComponent from '@/components/layout/components/settingsComponent.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { requiresAuth: true },
      component: Dashbord,
    },
    {
      path: '/friends',
      name: 'friends',
      meta: { requiresAuth: true },
      component: FriendsView,
    },
    {
      path: '/settings',
      name: 'settings',
      meta: { requiresAuth: true },
      component: settingsComponent,
    }

  ],
})

// Função auxiliar para checar o usuário atual de forma assíncrona
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};
// O "Guarda" das rotas
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = await getCurrentUser();

  if (requiresAuth && !user) {
    // Se a rota exige login e não tem usuário, manda pro login
    next('/login');
  } else if ((to.name === 'login' || to.name === 'register') && user) {
    // Se o usuário já está logado e tenta ir pro login/registro, manda pro dashboard
    next('/dashboard');
  } else {
    // Se estiver tudo ok, segue viagem
    next();
  }
});

export default router
