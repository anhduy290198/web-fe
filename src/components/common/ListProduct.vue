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
                <div class="filter-detail" style="margin-left: 30px">
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
        <template v-else>
            <a-spin :spinning="loadingData">
                <div class="list-product" >
                    <div class="product" v-for="product in dataSource" :key="product">
                        <div class="cursor-pointer" @click="detailProduct(product)">
                            <div class="product-image">
                                <img :src="product.image[0]">
                            </div>
                            <div class="product-name">
                                {{product.name}}
                            </div>
                            <div class="product-price">
                                {{formatPrice(product.price)}}
                            </div>
                        </div>
                        <div class="product-action">
                            <a-button @click="addToCart(product)">
                                <template #icon>
                                    <shopping-cart-outlined />
                                </template>
                                Thêm vào giỏ
                            </a-button>
                            <a-button :disabled="true">
                                Mua ngay
                            </a-button>
                        </div>
                    </div>
                </div>
            </a-spin>
        </template>
            
        <div class="pagination">
            <a-pagination v-model:current="currentPage" :total="listProduct.length" show-less-items />
        </div>
    </div>
</template>

<script setup>
import apiProduct from "../../api/product"
import { ref, defineComponent , computed,  onBeforeMount , watch , onMounted } from "vue";
import { TabletOutlined, HomeOutlined, LaptopOutlined , UsbOutlined , DesktopOutlined , ShoppingCartOutlined , UserOutlined} from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { message, Modal } from "ant-design-vue";

const route = useRoute();
const router = useRouter();
const idCategory = ref();
const listProduct = ref([]);
const textSearch = ref("");
const loadingData = ref(true);

const filterPrice = ref();
const filterDate = ref();
const currentPage = ref(1);
const props = defineProps({
    type: { type: String },
});

//created
onBeforeMount( () => {
    getListProduct();
    console.log(props.type);
});

onMounted(() => {
    console.log(props.type);
})



watch(props.type, (value) => {
    console.log(value);
});

const getIdCategory = () =>{
    let category = '';
    let data = route.query.type;
    console.log(route.query.type);
    if(data === "Phone"){
        category = 1
    }else if(data === "Laptop"){
        category = 2
    }else if(data === "Tivi"){
        category = 3
    }else{
        category = 4
    }
    return category;
}


const getListProduct = async (type) =>{
    let params = {
        id_category: getIdCategory(props.type)
    }
    if(type){
        params.type = type ? type : null;
        params.filter = type ? type === 'price' ? filterPrice.value : filterDate.value : null
    }
    let res = await apiProduct.getListProduct(params);

    if(res.status){
        res.data.forEach(product => {
            product.image = JSON.parse(product.image);
        });
        listProduct.value  = res.data;
    }
    loadingData.value = false;
}

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
    filterDate.value = '';
    textSearch.value = '';
    getListProduct('price');
}
const handleFilterDate = () =>{
    filterPrice.value = '';
    textSearch.value = '';
    getListProduct('created_at');
}

const detailProduct = (product) => {
    console.log(product.id);
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
            width: 280px;
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
        margin: 20px 0;
        padding-bottom: 50px;
    }
    .cursor-pointer{
        cursor: pointer;
    }
}
</style>