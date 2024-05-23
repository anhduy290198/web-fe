<template>
    <div class="home">
        <div class="title">
            Điện thoại
            <span @click="view('phone')">(Xem tất cả)</span>
        </div>
        <div class="list-product">
            <div class="img" v-for="product in listPhone" :key="product">
                <img :src="product.image[0]" alt="">
            </div>
        </div>

        <div class="title">
            LapTop
            <span @click="view('laptop')">(Xem tất cả)</span>
        </div>
        <div class="list-product">
            <div class="img" v-for="product in listLaptop" :key="product">
                <img :src="product.image[0]" alt="">
            </div>
        </div>

        <div class="title">
            Tivi
            <span @click="view('tivi')">(Xem tất cả)</span>
        </div>
        <div class="list-product">
            <div class="img" v-for="product in listTivi" :key="product">
                <img :src="product.image[0]" alt="">
            </div>
        </div>

        <div class="title">
            Phụ kiện
            <span @click="view('accessory')">(Xem tất cả)</span>
        </div>
        <div class="list-product">
            <div class="img" v-for="product in listAccessory" :key="product">
                <img :src="product.image[0]" alt="">
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, defineComponent , reactive , computed, onBeforeMount  } from "vue";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { PlusOutlined } from '@ant-design/icons-vue';
import apiProduct from "../../api/product";
import apiCategory from "../../api/category";
import { message, Modal } from "ant-design-vue";

const route = useRoute();
const router = useRouter();

const listPhone = ref([]);
const listLaptop = ref([]);
const listTivi = ref([]);
const listAccessory = ref([]);


onBeforeMount( async () => {
    getListProduct();
    
});

const getListProduct = async () =>{

    await apiProduct.getListProduct({
        id_category: 1
    }).then(res => {
        listPhone.value = res.data;
        listPhone.value = listPhone.value.slice(0, 5)
        listPhone.value.forEach(ele => {
            ele.image = JSON.parse(ele.image)
        });
    });

     await apiProduct.getListProduct({
        id_category: 2
    }).then(res => {
        listLaptop.value = res.data;
        listLaptop.value = listLaptop.value.slice(0, 5)
        listLaptop.value.forEach(ele => {
            ele.image = JSON.parse(ele.image)
        });
    });

    await apiProduct.getListProduct({
        id_category: 3
    }).then(res => {
        listTivi.value = res.data;
        listTivi.value = listTivi.value.slice(0, 5)
        listTivi.value.forEach(ele => {
            ele.image = JSON.parse(ele.image)
        });
    });

    apiProduct.getListProduct({
        id_category: 4
    }).then(res => {
        listAccessory.value = res.data;
        listAccessory.value = listAccessory.value.slice(0, 5)
        listAccessory.value.forEach(ele => {
            ele.image = JSON.parse(ele.image)
        });
    });
}

const view = (key) =>{
    
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
</script>

<style lang="scss" scoped>
.home {
    width: 70%;
    margin: 20px auto;
    .title{
        font-size: 20px;
        font-weight: 500;
        margin-top: 50px;
        span{
            font-size: 18px;
            font-weight: 400;
            margin-left: 5px;
            cursor: pointer;
        }
    }
    .list-product{
        display: flex;
        gap: 20px;
        margin-top: 10px;
        .img{
            width: 150px;
            height: 150px;
            img{
                width: 150px;
                height: 150px;
                object-fit: contain;
            }
        }
    }
}
</style>