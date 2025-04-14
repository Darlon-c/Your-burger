import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; 
import Requests from '../views/Requests.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/Requests', component: Requests  },
  ],
});

export default router;