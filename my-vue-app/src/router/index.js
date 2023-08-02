// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/container/index.vue';

const routes = [
    {
        path: '/',
        component: Home
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
