<template>
    <div class="cart">
        <div class="title">Danh sách sản phẩm</div>
        <a-button @click="createProduct">Tạo sản phẩm mới</a-button>
        <div class="content">
            <a-table :dataSource="data" :columns="columns" :pagination="false">
                <template #bodyCell="{ column,record, index }">
                    <template v-if="column.dataIndex === 'action'">
                        <div style="display: flex; justify-content: space-around">
                            <a-button @click="editProduct(record)">
                                <template #icon>
                                    <edit-outlined />
                                </template>
                            </a-button>
                            <a-button @click="deleteProduct">
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
import { ref, defineComponent , computed} from "vue";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { EditOutlined , DeleteOutlined } from '@ant-design/icons-vue';
const route = useRoute();
const router = useRouter();
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
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
        key: 'action',
        width: 150
    },
];
const data = ref([
    {
        name: 'Iphone 14 Pro Max 256 GB',
        amount: 1,
        price: 10000000,
    },
    {
        name: 'Iphone 14 Pro Max 256 GB',
        amount: 1,
        price: 10000000,
    },
    {
        name: 'Iphone 14 Pro Max 256 GB',
        amount: 1,
        price: 10000000,
    },
])

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


const deleteProduct = () =>{

}

const buy = () =>{
    router.push({
        name: "Pay",
        query: route.query
    })
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
    .buy{
        text-align: right;
        margin-top: 20px;
    }
}
</style>