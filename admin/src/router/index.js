// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/container/index.vue';

const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/',
                component: () => import('../components/articleList/index.vue')
            },
            {
                path: 'createArticle',
                component: () => import('../components/createArticle/index.vue')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('../components/login/index.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
