<template>
    <div class="header">
        <div class="logo">
            <img src="../../../public/image/logo.png" alt="">
            <div class="text">Online Shop</div>
        </div>
        <div class="menu" v-if="!user">
            <a-menu v-model:selectedKeys="menuActive" mode="horizontal" style="width: 600px" @click="changeMenu($event)">
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
        <div class="admin" v-else>Quản trị viên</div>
        <div class="action">
            <div class="user" v-if="user">
                Xin chào <b>{{user.name}}</b> !
            </div>
            <a-button type="link" @click="cart" v-if="!user">
                <template #icon>
                    <shopping-cart-outlined style="color: black"/>
                </template>
            </a-button>
            <a-dropdown>
                <a-button type="link">
                    <template #icon>
                        <user-outlined style="color: black"/>
                    </template>
                </a-button>
                <template #overlay>
                <a-menu>
                    <a-menu-item :disabled="user ? true : false">
                        <div @click="checkModal = true">Đăng nhập</div>
                    </a-menu-item>
                    <a-menu-item :disabled="user ? false : true">
                        <div @click="logout">Đăng xuất</div>
                    </a-menu-item>
                </a-menu>
                </template>
            </a-dropdown>
            
        </div>
        <a-modal :visible="checkModal" title="Đăng nhập" :footer="null" @cancel="checkModal = false">
            <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                labelAlign="left"
            >
                <a-form-item
                label="Tên đăng nhập"
                name="username"
                :rules="[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]"
                >
                <a-input v-model:value="formState.username" />
                </a-form-item>

                <a-form-item
                label="Mật khẩu"
                name="password"
                :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]"
                >
                <a-input-password v-model:value="formState.password" />
                </a-form-item>


                <a-form-item :wrapper-col="{ offset: 19, span: 16 }">
                <a-button type="primary" @click="login" @keyup.enter="login" :disabled="disabledLogin">Đăng nhập</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
    <div class="banner" v-if="!user">
        <a-carousel autoplay>
            <div v-for="banner in listBanner" :key="banner">
                <img :src="banner" >
            </div>
        </a-carousel>
    </div>
</template>

<script setup>
import { ref, defineComponent , reactive , computed , watch , onBeforeMount} from "vue";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { TabletOutlined, HomeOutlined, LaptopOutlined , UsbOutlined , DesktopOutlined , ShoppingCartOutlined , UserOutlined} from '@ant-design/icons-vue';
import { message, Modal } from "ant-design-vue";
import apiUser from "../../api/user";
const route = useRoute();
const router = useRouter();
const menuActive = ref(['home']);


const checkModal = ref(false);
const user = ref(null);
const formState = reactive({
  username: '',
  password: ''
});

const listBanner = [
    "https://static.vecteezy.com/system/resources/thumbnails/004/299/835/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/002/006/605/small/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-pink-backgroud-for-banner-market-ecommerce-free-vector.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/004/299/815/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
];

onBeforeMount( async () => {
    let userLocal = localStorage.getItem('user');
    if(userLocal){
        userLocal = JSON.parse(userLocal);
        if(userLocal.permission === 1){
            user.value = userLocal;
        }
    }
    if(!user.value){
        router.push({
            name: "Home"
        })
    }
});




const checkAdmin = ref(false);

const changeMenu = (data) =>{
    let key = data.key;
    let type = '';
    switch (key) {
        case 'phone':
            type = "Phone"
            break;
        case 'laptop':
            type = "Laptop"
            break;
        case 'tivi':
            type = "Tivi"
            break;
        case 'accessory':
            type = "Accessory"
            break;
        case 'home':
            type = "Home"
            break;
    }
    let query = null
    let name ="Home";
    if(key !== "home"){
        query = {
            type: type
        }
        name = "List"
    }
    router.push({
        name: name,
        query: query
    });
}
const cart = () =>{
    router.push({
        name: "Cart",
        query: route.query
    });
}

const login = () => {
    apiUser.login({
        username: formState.username,
        password: formState.password
    }).then(res =>{
        if(res.status){
            user.value = res.data;
            if(user.value.permission === 1){
                router.push({
                    name: "AdminListProduct"
                })
                checkModal.value = false;
                localStorage.setItem("user",JSON.stringify(user.value))
            }
        }
    }).catch(e => {
        message.error("Đăng nhập thất bại!");
    })
}
const logout = () => {
    user.value = null;
    changeMenu({key: "home"});
    localStorage.removeItem("user",JSON.stringify(user.value))
}

const disabledLogin = computed(() => {
    return !(formState.username && formState.password);
});

watch(checkModal, (value) => {
    if(!value){
        formState.name  = "";
        formState.password = "";
    }
});



</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
    border-bottom: 1px solid #ddd;
    .logo{
        height: 60px;
        width: 300px;
        text-align: center;
        line-height: 60px;
        font-size: 32px;
        display: flex;
        img{
            width: 80px;
            height: 60px;
        }
    }
    .menu{
        padding-top: calc(60px - 46px);
    }
    .admin{
        line-height: 60px;
        font-size: 30px;
    }
    .action{
        padding-top: calc(60px - 33px);
        width: 200px;
        display: flex;
        justify-content: end;
        .user{
            line-height: 32px;
        }
    }
}
.banner{
    width: 70%;
    height: 250px;
    margin: auto;
    background: red;
    img{
        height: 250px;
        width: 100%;
        object-fit: inherit;
    }
}
</style>