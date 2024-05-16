<template>
    <div class="header">
        <div class="logo">
            <div class="text">Zin</div>
        </div>
        <div class="menu">
            <a-menu v-model:selectedKeys="menuActive" mode="horizontal" style="width: 600px" @click="changeMenu()">
                <a-menu-item key="home">
                    <template #icon>
                        <home-outlined />
                    </template>
                    Trang chủ
                </a-menu-item>
                <a-menu-item key="phone">
                    <template #icon>
                        <tablet-outlined />
                    </template>
                    Điện thoại
                </a-menu-item>
                <a-menu-item key="laptop">
                    <template #icon>
                        <laptop-outlined />
                    </template>
                    Laptop
                </a-menu-item>
                <a-menu-item key="tivi">
                    <template #icon>
                        <desktop-outlined />
                    </template>
                    Tivi
                </a-menu-item>
                <a-menu-item key="accessory">
                    <template #icon>
                        <usb-outlined />
                    </template>
                    Phụ kiện
                </a-menu-item>
            </a-menu>
        </div>
        <div class="action">
            <a-button type="link">
                <template #icon>
                    <shopping-cart-outlined style="color: black"/>
                </template>
            </a-button>
            <a-button type="link">
                <template #icon>
                    <user-outlined style="color: black"/>
                </template>
            </a-button>
        </div>
    </div>
</template>

<script setup>
import { ref, defineComponent} from "vue";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { TabletOutlined, HomeOutlined, LaptopOutlined , UsbOutlined , DesktopOutlined , ShoppingCartOutlined , UserOutlined} from '@ant-design/icons-vue';

const route = useRoute();
const router = useRouter();
const menuActive = ref(['home']);

const changeMenu = () =>{
    let key = menuActive.value[0];
    console.log(key);
    let name = '';
    switch (key) {
        case 'phone':
            name = "Phone"
            break;
        case 'laptop':
            name = "Laptop"
            break;
        case 'tivi':
            name = "Tivi"
            break;
        case 'accessory':
            name = "Accessory"
            break;
        case 'home':
            name = "Home"
            break;
    }
    router.push({
        name: "Phone",
        query: route.query
    });
}

</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
    border-bottom: 1px solid #ddd;
    .logo{
        height: 60px;
        width: 200px;
        text-align: center;
        line-height: 60px;
        font-size: 40px
    }
    .menu{
        padding-top: calc(60px - 46px);
    }
    .action{
        padding-top: calc(60px - 33px);
        width: 200px;
        display: flex;
        justify-content: end;
    }
}
</style>