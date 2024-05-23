<template>
    <div class="detail-product">
        <div class="back">
            <a-button @click="back">
                Quay lại
            </a-button>
        </div>
        <div class="title">
            Chi tiết sản phẩm
        </div>
        <div class="product">
            <div class="product-image">
                <a-carousel arrows>
                     <template #prevArrow>
                        <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                            <left-circle-outlined />
                        </div>
                        </template>
                        <template #nextArrow>
                        <div class="custom-slick-arrow" style="right: 10px">
                            <right-circle-outlined />
                        </div>
                    </template>
                    <div v-for="image in product.image" :key="image"><img :src="image"></div>
                </a-carousel>
            </div>
            <div class="product-info">
                <h1 class="product-name">
                    {{product.name}}
                </h1>
                <h1 class="product-price">
                    {{product.price ? formatPrice(product.price) : 0 + ' VND'}}
                </h1>
                <div class="quantity">Còn hàng</div>
                <div class="product-description">
                    {{product.description}}
                </div>
                <div class="action">
                    <a-button size="large" @click="addToCart(product)">
                        <template #icon>
                            <shopping-cart-outlined />
                        </template>
                        Thêm vào giỏ
                    </a-button>
                    <a-button style="margin-left: 20px" size="large" :disabled="true">
                        Mua ngay
                    </a-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineComponent , computed , onBeforeMount} from "vue";
import { TabletOutlined, HomeOutlined, LaptopOutlined , UsbOutlined , DesktopOutlined , ShoppingCartOutlined , UserOutlined , LeftCircleOutlined , RightCircleOutlined} from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import apiProduct from "../../api/product";
import { message, Modal } from "ant-design-vue";

const route = useRoute();
const router = useRouter();

const props = defineProps({
    id: { type: Number },
});
const product = ref({});

//created
onBeforeMount( async () => {
    let res = await apiProduct.getDetailProduct({
        id: props.id
    });
    if(res.status){
        product.value = res.data;
        product.value.image = JSON.parse(product.value.image);
    }
});

const formatPrice = (price) => {
  return price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

const addToCart = (product) =>{
    let cart = localStorage.getItem("cart");
    let listProduct = [];
    if(cart){
        listProduct = JSON.parse(cart);
    }

    if(listProduct.length){
        let index = listProduct.findIndex(ele => product.id === ele.id);
        if(index > -1){
            listProduct[index].amount++;
        }else{
            product.amount = 1;
            listProduct.push(product);
        }
    }else{
        product.amount = 1;
        listProduct.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(listProduct))

    message.success("Thêm vào giỏ hàng thành công");
}

const back = () =>{
    router.push({
        name: "List",
        query: {
            type: route.query.type
        }
    })
}

</script>

<style lang="scss" scoped>
.detail-product{
    width: 70%;
    margin: 0 auto;
    position: relative;
    .back{
        position: absolute;
        top: 30px;
    }
    .title{
        text-align: center;
        font-size: 50px;
        line-height: 100px;
        margin: 20px 0;
    }
    .product{
        display: flex;
        margin-top: 50px;
        justify-content: space-between;
        .product-image{
            width: 40%;
            img{
                width: 100%;
                object-fit: contain;
            }
        }
        .product-info{
            width: 50%;
            .product-price{
                font-size: 25px;
                color: #fd475a;
            }
            .quantity{
                margin-bottom: 20px;
            }
            .action{
                margin-top: 50px;
            }
        }
    }
    :deep(.slick-arrow.custom-slick-arrow) {
        width: 25px;
        height: 25px;
        font-size: 25px;
        color: #fff;
        background-color: rgba(31, 45, 61, 0.11);
        transition: ease all 0.3s;
        opacity: 0.3;
        z-index: 1;
    }
    :deep(.slick-arrow.custom-slick-arrow:before) {
        display: none;
    }
    :deep(.slick-arrow.custom-slick-arrow:hover) {
        color: #fff;
        opacity: 0.5;
    }
    :deep(.slick-slide) {
        text-align: center;
        background: rgba(184, 178, 178, 0.904);
        overflow: hidden;
    }
}
</style>