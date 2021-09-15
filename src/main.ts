import { createApp } from 'vue';
import App from './App.vue';
import 'mosha-vue-toastify/dist/style.css';
import vfmPlugin from 'vue-final-modal';

import router from './router';

createApp(App).use(router).use(vfmPlugin).mount('#app');
