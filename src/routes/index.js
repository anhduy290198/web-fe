import { createRouter, createWebHistory } from "vue-router"

import Home from "../pages/Home/index.vue";
import Phone from "../pages/Phone/index.vue";
import PhoneDetail from "../pages/Phone/detail.vue";
import Cart from "../pages/Cart.vue";
import Pay from "../pages/Pay.vue";
import CreateProduct from "../pages/Admin/createProduct.vue"
import ListProduct from "../pages/Product/List.vue";
import DetailProduct from "../pages/Product/Detail.vue";

const routes = [
    {
        path: '/',
        name: "Home",
        component: Home
    },
    {
        path: '/phone',
        name: "Phone",
        component: Phone ,
        meta: {
            title: 'Điện thoại',
        },
    },
    {
        path: '/list',
        name: "List",
        component: ListProduct ,
        meta: {
            title: 'Danh sách sản phẩm',
        },
    },
    {
        path: '/detail',
        name: "Detail",
        component: DetailProduct ,
        meta: {
            title: 'Chi tiết sản phẩm',
        },
    },
    // {
    //     path: '/phone/:id',
    //     name: "PhoneDetail",
    //     component: PhoneDetail ,
    //     meta: {
    //         title: 'Điện thoại',
    //     },
    // },
    {
        path: '/cart',
        name: "Cart",
        component: Cart ,
        meta: {
            title: 'Giỏ hàng',
        },
    },
    {
        path: '/pay',
        name: "Pay",
        component: Pay ,
        meta: {
            title: 'Thanh toán',
        },
    },
    {
        path: '/admin',
        name: "Admin",
        component: CreateProduct ,
        meta: {
            title: 'Thanh toán',
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;