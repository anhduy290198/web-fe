<template>
    <div class="content">
        <div class="title">{{title}}</div>
        <div class="search">
            <div class="input-search">
                <a-input-search  placeholder="Nhập tên sản phẩm"/>
            </div>
            <div class="filter">
                <div class="filter-detail">
                    <div class="label">
                        Giá
                    </div>
                    <div class="filter-type">
                        <a-select
                            v-model:value="filterPrice"
                            style="width: 160px"
                            @change="handleChange"
                            >
                            <a-select-option value="asc">Từ thấp đến cao</a-select-option>
                            <a-select-option value="desc">Từ cao đến thấp</a-select-option>
                        </a-select>
                    </div>
                </div>
                <div class="filter-detail">
                    <div class="label">
                        Giá
                    </div>
                    <div class="filter-type">
                        <a-select
                            v-model:value="filterPrice"
                            style="width: 160px"
                            @change="handleChange"
                            >
                            <a-select-option value="asc">Từ thấp đến cao</a-select-option>
                            <a-select-option value="desc">Từ cao đến thấp</a-select-option>
                        </a-select>
                    </div>
                </div>
            </div>
        </div>
        <div class="list-product">
            <div class="product" v-for="product in data" :key="product">
                <div class="cursor-pointer" @click="detailProduct(product)">
                    <div class="product-image">
                        <img :src="product.image">
                    </div>
                    <div class="product-name">
                        {{product.name}}
                    </div>
                    <div class="product-price">
                        {{product.price}}
                    </div>
                </div>
                <div class="product-action">
                    <a-button>
                        <template #icon>
                            <shopping-cart-outlined />
                        </template>
                        Thêm vào giỏ
                    </a-button>
                    <a-button>
                        <template #icon>
                            <shopping-cart-outlined />
                        </template>
                        Mua ngay
                    </a-button>
                </div>
            </div>
        </div>
        <div class="pagination">
            <a-pagination v-model:current="currentPage" :total="data.length" show-less-items />
        </div>
    </div>
</template>

<script setup>
import { ref, defineComponent , computed} from "vue";
import { TabletOutlined, HomeOutlined, LaptopOutlined , UsbOutlined , DesktopOutlined , ShoppingCartOutlined , UserOutlined} from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const title = computed(() => {
    let title = 'Trang chủ';
    switch (props.type) {
        case 'phone':
            title = "Điện thoại"
            break;
        case 'laptop':
            title = "Laptop"
            break;
        case 'tivi':
            title = "Tivi"
            break;
        case 'accessory':
            title = "Phụ kiện"
            break;
        default:
            title = "Trang chủ"
            break;
    }
    return title;
});

const props = defineProps({
    type: { type: String },
});

const filterPrice = ref('desc');
const data = ref([
    {
        name: 'Iphone 14 Pro Max 256 GB',
        image: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg',
        amount: 10,
        price: 10000000
    },
    {
        name: 'Iphone 14 Pro Max 256 GB',
        image: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg',
        amount: 10,
        price: 10000000
    },
    {
        name: 'Iphone 14 Pro Max 256 GB',
        image: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg',
        amount: 10,
        price: 10000000
    },
    {
        name: 'Iphone 14 Pro Max 256 GB',
        image: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg',
        amount: 10,
        price: 10000000
    },
    {
        name: 'Iphone 14 Pro Max 256 GB',
        image: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg',
        amount: 10,
        price: 10000000
    },
    {
        name: 'Iphone 14 Pro Max 256 GB',
        image: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg',
        amount: 10,
        price: 10000000
    },
    {
        name: 'Iphone 14 Pro Max 256 GB',
        image: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg',
        amount: 10,
        price: 10000000
    },
]);
const currentPage = ref(1);

const handleChange = () =>{

}

const detailProduct = () => {
    router.push({
        component: 'PhoneDetail',
        query: route.query
    });
}

</script>

<style lang="scss" scoped>
.content{
    width: 70%;
    margin: 0 auto;
    .title{
        text-align: center;
        font-size: 50px;
        line-height: 100px;
        margin: 20px 0;
    }
    .search{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 50px;
        .input-search{
            width: 40%;
        }
        .filter{
            width: 55%;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            .filter-detail{
                display: flex;
                .label{
                    line-height: 32px;
                    margin-right: 10px;
                }
                .filter-type{

                }
            }
        }
    }
    .list-product{
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        gap: 100px;
        justify-content: space-between;
        max-height: 500px;
        overflow: auto;
        box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
        padding-right: 5px;
        .product{
            border: 1px solid #ddd;
            border-radius: 10px;
            width: 300px;
            margin-bottom: 100px;
            padding: 20px 10px;
            box-shadow: 0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12);
            .product-image{
                width: 100%;
                img{
                    width: 100%;
                    height: 200px;
                    object-fit: contain;
                }
            }
            .product-name{
                text-align: center;
                margin-top: 20px;
            }
            .product-price{
                color: red;
                text-align: center;
                margin-bottom: 10px;
            }
            .product-action{
                display: flex;
                justify-content: space-around;
            }
        }
        &::-webkit-scrollbar {
            width: 6px;
            margin-left: 5px;
        }
        /* Track */
        &::-webkit-scrollbar-track {
            background: transparent;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
            background-color: #f1eaea;
            border-radius: 3px;
        }
        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
            background-color: #f1e9e9;
        }
    }
    .pagination{
        display: flex;
        justify-content: end;
        margin-top: 20px;
    }
    .cursor-pointer{
        cursor: pointer;
    }
}
</style>