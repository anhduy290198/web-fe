<template>
    <div class="pay">
        <div class="back">
            <a-button @click="back">
                Quay lại
            </a-button>
        </div>
        <div class="title">
            Thanh toán
        </div>
        <div class="price">
            <div class="label">Tổng tiền:</div>
            <div class="cash">{{formatPrice(totalPrice)}}</div>
        </div>
        <div class="user">
            <a-form :model="formState"
                name="basic"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 20 }"
                labelAlign="left"
                >
                <a-form-item
                    label="Tên"
                    name="name"
                    :rules="[{ required: true, message: 'Vui lòng nhập tên!' }]"
                    >
                    <a-input v-model:value="formState.name" />
                </a-form-item>
                <a-form-item
                    label="Địa chỉ"
                    name="address"
                    :rules="[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]"
                    >
                    <a-input v-model:value="formState.address" />
                </a-form-item>
                <a-form-item
                    label="Số điện thoại"
                    name="phone"
                    :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]"
                    >
                    <a-input v-model:value="formState.phone" />
                </a-form-item>
                <a-form-item
                    label="Ghi chú"
                    name="note"
                    >
                    <a-input v-model:value="formState.note" />
                </a-form-item>
                <a-form-item  :wrapper-col="{ offset: 12, span: 16 }">
                    <a-button :disabled="disabled" @click="pay">Thanh toán</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { ref, defineComponent , reactive , computed , onBeforeMount} from "vue";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const formState = reactive({
  name: '',
  address: '',
  phone: '',
  note: '',
});
const totalPrice = ref(0);

//created
onBeforeMount( async () => {
    let cart = await localStorage.getItem("cart");
    let listProduct = [];
    if(cart){
        listProduct = JSON.parse(cart);
    }
    listProduct.forEach(product => {
        totalPrice.value += product.price * product.amount;
    });
});
const disabled = computed(() => {
    return !(formState.name && formState.address && formState.phone || totalPrice.value === 0);
});

const formatPrice = (price) => {
  return price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

const back = () =>{
    router.push({
        name: "Cart",
    })
}

const pay = () =>{
    message.success('Thanh toán thành công!');
    router.push({
        name: "Home"
    })
    localStorage.removeItem("cart");
}
</script>

<style lang="scss" scoped>
.pay{
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
    .price{
        display: flex;
        font-size: 16px;
        margin-bottom: 20px;
        .label{
            font-weight: 500;
        }
        .cash{
            font-weight: 400;
            margin-left: 10px;
        }
    }
}
</style>