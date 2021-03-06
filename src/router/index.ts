import { createWebHistory, createRouter } from 'vue-router';
import { createToast } from 'mosha-vue-toastify';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import CreateAccount from '@/views/CreateAccount.vue';

import ForgotPassword from '@/views/ForgotPassword.vue';
import RecoverPassword from '@/views/RecoverPassword.vue';
import UpdatePassword from '@/views/UpdatePassword.vue';

import CreateItem from '@/views/CreateItem.vue';
import ReadItems from '@/views/ReadItems.vue';
import UpdateItem from '@/views/UpdateItem.vue';
import OpenItem from '@/views/OpenItem.vue';
import Share from '@/views/Share.vue';

import Unauthorized from '@/views/Unauthorized.vue';
import NotFound from '@/views/NotFound.vue';
import store from '../store';
import { computed } from 'vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/criar-conta',
    name: 'CreateAccount',
    component: CreateAccount,
  },
  {
    path: '/esqueci-a-senha',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/recuperar-senha',
    name: 'RecoverPassword',
    component: RecoverPassword,
  },
  {
    path: '/atualizar-senha',
    name: 'UpdatePassword',
    component: UpdatePassword,
  },
  {
    path: '/criar-item',
    name: 'CreateItem',
    component: CreateItem,
  },
  {
    path: '/listar-itens',
    name: 'ReadItems',
    component: ReadItems,
  },
  {
    path: '/compartilhar/:id',
    name: 'Share',
    component: Share,
  },
  {
    path: '/alterar-item/:id',
    name: 'UpdateItem',
    component: UpdateItem,
  },
  {
    path: '/item/:id',
    name: 'OpenItem',
    component: OpenItem,
  },
  {
    path: '/401',
    component: Unauthorized,
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = computed(
    () => store.getters['isAuthenticated']
  ).value;
  if (!isAuthenticated && to.path !== '/login' && to.path !== '/criar-conta') {
    createToast('Acesso negado. Necess??rio login.', { type: 'danger' });
    router.push('/login');
  } else {
    next();
  }
});

export default router;
