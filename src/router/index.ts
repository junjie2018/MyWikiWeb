import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/home-view.vue';
import AboutView from '../views/about-view.vue';
import AdminEBook from '../views/admin/admin-ebook.vue';

import AntdTable001 from "@/views/antd/table/antd-table-001.vue";
import AntdTable002 from "@/views/antd/table/antd-table-002.vue";
import AntdTable003 from "@/views/antd/table/antd-table-003.vue";


import VueRequest001 from "@/views/vue-request/vue-request-001.vue";
import VueRequest002 from "@/views/vue-request/vue-request-002.vue";
import VueRequest003 from "@/views/vue-request/vue-request-003.vue";
import VueRequest004 from "@/views/vue-request/vue-request-004.vue";
import VueRequest005 from "@/views/vue-request/vue-request-005.vue";
import VueRequest006 from "@/views/vue-request/vue-request-006.vue";
import VueRequest007 from "@/views/vue-request/vue-request-007.vue";

import Axios001 from "@/views/axios/axios-001.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView
    },
    {
        path: '/admin/ebook',
        name: '/admin/ebook',
        component: AdminEBook
    },
    {
        path: '/antd/table/antd-table-001',
        name: '/antd/table/antd-table-001',
        component: AntdTable001
    },
    {
        path: '/antd/table/antd-table-002',
        name: '/antd/table/antd-table-002',
        component: AntdTable002
    },
    {
        path: '/antd/table/antd-table-003',
        name: '/antd/table/antd-table-003',
        component: AntdTable003
    },
    {
        path: '/antd/table/antd-table-004',
        name: '/antd/table/antd-table-004',
        component: AntdTable001
    },
    {
        path: '/antd/table/antd-table-005',
        name: '/antd/table/antd-table-005',
        component: AntdTable001
    },
    {
        path: '/antd/table/antd-table-006',
        name: '/antd/table/antd-table-006',
        component: AntdTable001
    },

    {
        path: '/vue-request/vue-request-001',
        name: '/vue-request/vue-request-001',
        component: VueRequest001
    },
    {
        path: '/vue-request/vue-request-002',
        name: '/vue-request/vue-request-002',
        component: VueRequest002
    },
    {
        path: '/vue-request/vue-request-003',
        name: '/vue-request/vue-request-003',
        component: VueRequest003
    },
    {
        path: '/vue-request/vue-request-004',
        name: '/vue-request/vue-request-004',
        component: VueRequest004
    },
    {
        path: '/vue-request/vue-request-005',
        name: '/vue-request/vue-request-005',
        component: VueRequest005
    },
    {
        path: '/vue-request/vue-request-006',
        name: '/vue-request/vue-request-006',
        component: VueRequest006
    },
    {
        path: '/vue-request/vue-request-007',
        name: '/vue-request/vue-request-007',
        component: VueRequest007
    },
    {
        path: '/vue-request/vue-request-008',
        name: '/vue-request/vue-request-008',
        component: VueRequest002
    },
    {
        path: '/axios/axios-001',
        name: '/axios/axios-001',
        component: Axios001
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
