import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: () => import('@/pages/home.vue'),
    },
    {
        path: '/room',
        component: () => import('@/pages/room.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
