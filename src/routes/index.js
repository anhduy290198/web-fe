import { createRouter, createWebHistory } from "vue-router"

import Home from "../pages/Home/index.vue";
import Phone from "../pages/Phone/index.vue";
import PhoneDetail from "../pages/Phone/detail.vue";

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/phone',
        component: Phone ,
        meta: {
            title: 'Điện thoại',
        },
    },
    {
        path: '/phone:id',
        component: PhoneDetail ,
        meta: {
            title: 'Điện thoại',
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;