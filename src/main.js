import { createApp } from 'vue'; 
import App from './App.vue'; 
import router from './router'; 
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

const app = createApp(App); 

app.config.productionTip = false; 

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
      next('/log-in');
    } else {
      next();
    }
});

app.use(router);
app.use(VueToast); // Register VueToast here
app.mount('#app'); 
