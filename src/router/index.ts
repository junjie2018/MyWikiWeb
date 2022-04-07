import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/home-view.vue';
import AboutView from '../views/about-view.vue';
import AdminEBook from '../views/admin/admin-ebook.vue';

import AntdTable001 from "@/views/antd/table/antd-table-001.vue";
import AntdTable002 from "@/views/antd/table/antd-table-002.vue";
import AntdTable003 from "@/views/antd/table/antd-table-003.vue";

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
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
