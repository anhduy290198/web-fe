<template>
    <div class="content">
        <div class="title">{{title}}</div>
        <div class="search">
            <div class="input-search">
                <a-input-search v-model:value="textSearch"  placeholder="Nhập tên sản phẩm"/>
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
                            @change="handleFilterPrice"
                            >
                            <a-select-option value="asc">Từ thấp đến cao</a-select-option>
                            <a-select-option value="desc">Từ cao đến thấp</a-select-option>
                        </a-select>
                    </div>
                </div>
                <div class="filter-detail">
                    <div class="label">
                        Sản phẩm mới cũ
                    </div>
                    <div class="filter-type">
                        <a-select
                            v-model:value="filterDate"
                            style="width: 160px"
                            @change="handleFilterDate"
                            >
                            <a-select-option value="new">Từ mới đến cũ</a-select-option>
                            <a-select-option value="old">Từ cũ đến mới</a-select-option>
                        </a-select>
                    </div>
                </div>
            </div>
        </div>
        <a-empty v-if="!dataSource.length" :description="false">
            Không có dữ liệu
        </a-empty>
        <div class="list-product" v-else>
            <div class="product" v-for="product in dataSource" :key="product">
                <div class="cursor-pointer" @click="detailProduct(product)">
                    <div class="product-image">
                        <img :src="product.image">
                    </div>
                    <div class="product-name">
                        {{product.name}}
                    </div>
                    <div class="product-price">
                        {{formatPrice(product.price)}}
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
                        Mua ngay
                    </a-button>
                </div>
            </div>
        </div>
        <div class="pagination">
            <a-pagination v-model:current="currentPage" :total="listProduct.length" show-less-items />
        </div>
    </div>
</template>

<script setup>
import apiProduct from "../../api/product"
import { ref, defineComponent , computed,  onBeforeMount } from "vue";
import { TabletOutlined, HomeOutlined, LaptopOutlined , UsbOutlined , DesktopOutlined , ShoppingCartOutlined , UserOutlined} from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const idCategory = ref();
const listProduct = ref([]);
const textSearch = ref("");
const loadingData = ref(false);

const filterPrice = ref();
const filterDate = ref();
const currentPage = ref(1);
const props = defineProps({
    type: { type: String },
});

//created
onBeforeMount( async () => {
    let res = await apiProduct.getListProduct({
        id_category: 1
    });
    if(res.status){
        res.data.forEach(product => {
            product.image = JSON.parse(product.image);
        });
        listProduct.value  = res.data;
    }
});

const title = computed(() => {
    let title = 'Trang chủ';
    switch (props.type) {
        case 'Phone':
            title = "Điện thoại";
            idCategory.value = 1;
            break;
        case 'Laptop':
            title = "Laptop";
            idCategory.value = 2;
            break;
        case 'Tivi':
            title = "Tivi";
            idCategory.value = 3;
            break;
        case 'Accessory':
            title = "Phụ kiện";
            idCategory.value = 4;
            break;
        default:
            title = "Trang chủ";
            break;
    }
    return title;
});

const dataSource = computed(()=>{
    loadingData.value = true;
    let listSearch = textSearch.value.toLowerCase().split(" ");
    let data = listProduct.value;
    data = data.filter(ele =>{
        let resSearch = listSearch.every(search => 
            vnToStr(ele.name).toLowerCase().indexOf(vnToStr(search)) > -1
        );
        return resSearch
    })

    return data;
})



const handleFilterPrice = () =>{

}
const handleFilterDate = () =>{

}

const detailProduct = (product) => {
    let query = {
        type: route.query.type,
        id :  product.id
    }
    router.push({
        name: 'Detail',
        query: query,
    });
}

const formatPrice = (price) => {
  return price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

const vnToStr = (text) => {
    if (typeof text !== 'string') return;

    text = text.toLowerCase();
    text = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    text = text.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    text = text.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    text = text.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    text = text.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    text = text.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    text = text.replace(/đ/g, "d");
    text = text.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        " "
    );
    text = text.replace(/\s+/g, " ");
    text = text.trim();
    return text;
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
        max-height: 700px;
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