
import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../components/Home.vue';
import ProfilePage from '../components/Profile.vue';
import LoginPage from '../components/Login.vue';


const routes = [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  });
  
  export default router;
