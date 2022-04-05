import {createApp} from 'vue';

import App from './App.vue';

import router from './router';
import store from './store';

import Antd from 'ant-design-vue';
import * as Icons from '@ant-design/icons-vue';
import axios from 'axios';

import 'ant-design-vue/dist/antd.css';

// 配置baseURL
axios.defaults.baseURL = process.env.VUE_APP_SERVER;

// 配置请求拦截器
axios.interceptors.request.use(
    function (requestConfig) {
        console.log('请求参数：', requestConfig);
        return requestConfig;
    },
    error => {
        return Promise.reject(error);
    });

// 配置响应拦截器
axios.interceptors.response.use(
    function (response) {
        console.log('返回结果：', response);
        return response;
    },
    error => {
        return Promise.reject(error);
    });


const app = createApp(App)
    .use(store)
    .use(router)
    .use(Antd)

const icons: any = Icons
for (const i in icons) {
    app.component(i, icons[i])
}

app.mount('#app')