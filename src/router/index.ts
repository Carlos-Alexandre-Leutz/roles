import { createRouter, createWebHashHistory } from 'vue-router'

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase.ts';
import { roleService } from '@/services/roles/roleService.ts'

import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/Auth/LoginView.vue';
import RegisterView from '@/views/Auth/RegisterView.vue';
import ForgotPasswordView from '@/views/Auth/ForgotPasswordView.vue';
import Dashbord from '@/views/Dashboard/Roles/launcherComponent.vue';
import FriendsView from '@/views/Dashboard/FriendsView/launcherComponent.vue';
import SettingsComponent from '@/components/layout/components/settingsComponent.vue';
import EdtRole from '@/views/Dashboard/EdtRole/launcherComponent.vue';
import SearchFriends from '@/views/Dashboard/SearchFriends.vue';

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
      component: SettingsComponent,
    },
    {
      path: '/edit-role/:id',
      name: 'edit-role',
      meta: { requiresAuth: true },
      component: EdtRole,
      props: { mode: 'edit' },
      beforeEnter: async (to, from, next) => {
        const roleId = to.params.id;
        const isOwner = await roleService.canEditRole(roleId);

        if (isOwner) {
          next();
        } else {
          next({ name: 'view-role', params: { id: roleId } });
        }
      }
    },
    {
      path: '/view-role/:id',
      name: 'view-role',
      meta: { requiresAuth: true },
      component: EdtRole,
      props: { mode: 'view' }
    },
    {
      path: '/search-friends',
      name: 'search-friends',
      meta: { requiresAuth: true },
      component: SearchFriends,
    }

  ],
})

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
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = await getCurrentUser();

  if (requiresAuth && !user) {
    next('/login');
  } else if ((to.name === 'login' || to.name === 'register') && user) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router
