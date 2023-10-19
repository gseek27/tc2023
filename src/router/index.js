<<<<<<< HEAD
version https://git-lfs.github.com/spec/v1
oid sha256:d04512481f0ffd35d33d7a8366e448dd2236e20debf962bd794a88b0973a7845
size 615
=======
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
>>>>>>> 2190573f (wed14)
