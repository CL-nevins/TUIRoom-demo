import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index';
import { createPinia } from 'pinia';
import VueI18n from '@/TUIRoom/locales/index';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';

createApp(App).use(router).use(createPinia()).use(VueI18n).mount('#app')
