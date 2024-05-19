<template>
    <div class="pay">
        <div class="title">
            Thanh toán
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
                    <a-button :disabled="disabled">Đặt hàng</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineComponent , reactive , computed} from "vue";
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
const disabled = computed(() => {
    return !(formState.name && formState.address && formState.phone);
});
</script>

<style lang="scss" scoped>
.pay{
    width: 70%;
    margin: 0 auto;
    .title{
        text-align: center;
        font-size: 50px;
        line-height: 100px;
        margin: 20px 0;
    }
}
</style>