<template>
    <div class="cart">
        <div class="title">Giỏ hàng</div>
        <div class="content">
            <a-table :dataSource="data" :columns="columns" :pagination="false"/>
        </div>

        <div class="buy">
            <a-button @click="buy">
                Đặt hàng
            </a-button>
        </div>
    </div>
</template>

<script setup>
import { ref, defineComponent , computed} from "vue";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

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