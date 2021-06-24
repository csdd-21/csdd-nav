// import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import axios from "axios";
import qs from 'qs';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'element-plus/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css'

const app =createApp(App)

app.use(store).use(router).use(ElementPlus).mount('#app')

app.config.globalProperties.axios = axios;
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
      config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      config.transformRequest = [function (data, headers) {
        return qs.stringify(data);
      }];
    }
    return config;
  }, (err) => {
    return Promise.reject(err);
  });


