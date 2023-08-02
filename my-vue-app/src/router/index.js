// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/container/index.vue';

const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: 'article',
                component: () => import('../components/articleManage/index.vue')
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
