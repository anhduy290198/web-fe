import { createRouter, createWebHistory } from "vue-router"

import Home from "../pages/Home/index.vue";

const routes = [
    { path: '/', component: Home },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;