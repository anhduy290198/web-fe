<template>
    <div class="cart">
        <div class="title">Giỏ hàng</div>
        <div class="content">
            <a-table :dataSource="data" :columns="columns" :pagination="false">
                <template #bodyCell="{ column,record, index }">
                    <template v-if="column.dataIndex === 'action'">
                        <a-button @click="deleteProduct(record,index)">
                                <template #icon>
                                    <delete-outlined />
                                </template>
                            </a-button>
                    </template>
                </template>
            </a-table>
        </div>

        <div class="buy">
            <a-button @click="buy" :disabled="!data.length">
                Đặt hàng
            </a-button>
        </div>
    </div>
</template>

<script setup>
import { ref, defineComponent , computed, onBeforeMount, watch} from "vue";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { EditOutlined , DeleteOutlined , ExclamationCircleOutlined } from '@ant-design/icons-vue';

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
        title: '',
        dataIndex: 'action',
        key: 'action',
        align: 'center'
    },
];
const data = ref([]);

//created
onBeforeMount( async () => {
    getListProduct();
});



const getListProduct = async () =>{
    let cart = await localStorage.getItem("cart");
    let listProduct = [];
    if(cart){
        listProduct = JSON.parse(cart);
    }
    data.value = listProduct;

}

const deleteProduct = async (product,index) =>{
    data.value.splice(index,1);
    let cart = await localStorage.getItem("cart");
    let listProduct = JSON.parse(cart);
    index = listProduct.findIndex(ele => ele.id === product.id);
    if(index > -1){
        listProduct.splice(index,1);
        localStorage.setItem("cart", JSON.stringify(listProduct))
    }
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