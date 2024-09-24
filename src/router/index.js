import { createRouter, createWebHistory } from 'vue-router';

// Import your views
import LoginPage from '../views/LoginPage.vue';
import ChatRoom from '../views/ChatRoom.vue';

// Define your routes
const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/room/:roomId',
    name: 'ChatRoom',
    component: ChatRoom,
    props: true,
  },
];

// Create the router instance using Vue 3 syntax
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
