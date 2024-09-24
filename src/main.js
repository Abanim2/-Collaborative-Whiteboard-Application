import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Create the Vue app and apply the router
createApp(App).use(router).mount('#app');
