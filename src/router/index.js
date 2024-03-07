import { createRouter, createWebHistory } from 'vue-router';
import LogIn from '@/views/LogIn.vue';
import SignUp from '@/views/SignUp.vue';
import UserInvoice from '@/views/UserInvoice.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/log-in',
      name: 'LogIn',
      component: LogIn
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp
      },
      {
        path: '/',
        name: 'UserInvoice',
        component: UserInvoice,
        meta: { requiresAuth: true }
      }
  ]
});

export default router; 