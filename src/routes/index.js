import { createRouter, createWebHistory } from "vue-router"

import Home from "../pages/Home/index.vue";
import Cart from "../pages/Cart.vue";
import Pay from "../pages/Pay.vue";
import AdminCreateProduct from "../pages/Admin/AdminCreateProduct.vue";
import AdminListProduct from "../pages/Admin/AdminListProduct.vue";
import ListProduct from "../pages/Product/List.vue";
import DetailProduct from "../pages/Product/Detail.vue";

const routes = [
    {
        path: '/',
        name: "Home",
        component: Home
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
        name: "AdminListProduct",
        component: AdminListProduct ,
        meta: {
            title: 'Quản trị viên',
        },
        children: [
            {
                path: '/create',
                name: "AdminCreateProduct",
                component: AdminCreateProduct ,
                meta: {
                    title: 'Quản trị viên 1',
                },
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;