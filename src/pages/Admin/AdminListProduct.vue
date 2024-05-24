<template>
    <div class="cart">
        <div class="title">Danh sách sản phẩm</div>
        <div class="search">
            
                <div class="filter">
                    <div class="input-search">
                        <a-input-search v-model:value="textSearch"  placeholder="Nhập tên sản phẩm"/>
                    </div>
                    <div class="filter-detail">
                        <div class="label">
                            Danh mục
                        </div>
                        <div class="filter-type">
                            <a-select
                                v-model:value="categoryId"
                                style="width: 160px"
                                @change="getListProduct"
                                >
                                <a-select-option v-for="category in listCategory" :value="category.id" :key="category.id">{{category.name}}</a-select-option>
                            </a-select>
                        </div>
                    </div>
                </div>
                <a-button @click="createProduct">Tạo sản phẩm mới</a-button>
            </div>
        <div class="content">
            <a-table :dataSource="dataSource" :columns="columns" :loading="loadingData">
                <template #bodyCell="{ column,record }">
                    <template v-if="column.dataIndex === 'action'">
                        <div style="display: flex; justify-content: space-around">
                            <a-button @click="editProduct(record)">
                                <template #icon>
                                    <edit-outlined />
                                </template>
                            </a-button>
                            <a-button @click="deleteProduct(record)">
                                <template #icon>
                                    <delete-outlined />
                                </template>
                            </a-button>
                        </div>
                    </template>
                </template>
            </a-table>
        </div>

    </div>
</template>

<script setup>
import { ref, defineComponent , computed , onBeforeMount , createVNode } from "vue";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { EditOutlined , DeleteOutlined , ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { message, Modal } from "ant-design-vue";
const route = useRoute();
const router = useRouter();
import apiProduct from "../../api/product";
import apiCategory from "../../api/category";
import category from "../../api/category";
const columns = [
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
        key: 'action',
        width: 150
    },
];
const listProduct = ref([]);
const listCategory = ref([]);
const categoryId = ref('');
const textSearch = ref('');
const loadingData = ref(true);
const user = ref(null);

//created
onBeforeMount( () => {
    getListProduct();
    getListCategory();

    let userLocal = localStorage.getItem('user');
    if(userLocal){
        userLocal = JSON.parse(userLocal);
        if(userLocal.permission === 1){
            user.value = userLocal;
        }
    }
});


const getListCategory = async () =>{
    let res = await apiCategory.listCategory();
    if(res.status){
        listCategory.value  = res.data
    }
}


const getListProduct = async () =>{
    let params = {}
    if(categoryId.value){
        params.id_category = categoryId.value
    }
    let res = await apiProduct.getListProduct(params);
    if(res.status){
        listProduct.value  = res.data;
    }
    loadingData.value = false;
}

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

const createProduct = () =>{
    router.push({
        name: "AdminCreateProduct"
    })
}

const editProduct = (product) =>{
    router.push({
        name: "AdminUpdateProduct",
        query: {
            id: product.id
        }
    })
}


const deleteProduct = (product) =>{
    

    // Modal.confirm({
    //     title: 'Xóa sản phẩm?',
    //     icon: createVNode(ExclamationCircleOutlined),
    //    content: createVNode('div', { style: 'color:#000000D9;' }, 'Bạn có chắc chắn muốn xóa sản phẩm này?'),
    //     onOk() {
    //         apiProduct.DeleteProduct({
    //             id: product.id
    //         }).then(res =>{
    //             if(res.status){
    //                 message.success("Xóa sản phẩm thành công");
    //                 getListProduct();
    //             }
    //         }).catch(e =>{
    //             message.error("Xóa sản phẩm thất bại");
    //         })
    //     },
    //     onCancel() {
    //     },
    //     okText: "Xóa",
    //     cancelText: "Huỷ",
    //   });
        console.log(user);
        apiProduct.DeleteProduct({
            id: product.id,
            username: user.value.username,
            password: user.value.password
        }).then(res =>{
            if(res.status){
                message.success("Xóa sản phẩm thành công");
                getListProduct();
            }
        }).catch(e =>{
            message.error("Xóa sản phẩm thất bại");
        })
}

const buy = () =>{
    router.push({
        name: "Pay",
        query: route.query
    })
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
.cart{
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
            width: 80%;
            display: flex;
            gap: 10px;
            .filter-detail{
                display: flex;
                .label{
                    line-height: 32px;
                    margin-right: 10px;
                }
                .filter-type{
                    margin-left: 5px;
                }
            }
        }
    }
    .buy{
        text-align: right;
        margin-top: 20px;
    }
}
</style>