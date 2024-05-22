<template>
    <div class="admin">
        <div class="title">Tạo sản phẩm</div>
        <div class="create-product">
            <a-form :model="formState"
                name="basic"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 20 }"
                labelAlign="left"
                >
                <a-form-item
                    label="Tên Sản phẩm"
                    name="name"
                    :rules="[{ required: true, message: 'Vui lòng nhập tên!' }]"
                    >
                    <a-input v-model:value="formState.name" />
                </a-form-item>
                <a-form-item
                    label="Giá"
                    name="price"
                    :rules="[{ required: true, message: 'Vui lòng nhập giá!' }]"
                    >
                    <a-input v-model:value="formState.price" />
                </a-form-item>
                <a-form-item
                    label="Số lượng"
                    name="quantity"
                    :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]"
                    >
                    <a-input-number :min="1" v-model:value="formState.quantity" />
                </a-form-item>
                <a-form-item
                    label="Mô tả"
                    name="note"
                    >
                    <a-input v-model:value="formState.description" />
                </a-form-item>
                <a-form-item
                    label="Ảnh sản phẩm"
                    name="image"
                    >
                    <a-upload
                        v-model:file-list="files"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        list-type="picture"
                        class="upload-list-inline"
                        >
                        <a-button>
                            <upload-outlined></upload-outlined>
                            upload
                        </a-button>
                        </a-upload>
                </a-form-item>

                <a-form-item  :wrapper-col="{ offset: 12, span: 16 }">
                    <a-button :disabled="disabled" @click="create">Tạo sản phẩm</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineComponent , reactive , computed} from "vue";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { PlusOutlined } from '@ant-design/icons-vue';

const route = useRoute();
const router = useRouter();
const formState = reactive({
  name: '',
  price: '',
  quantity: 1,
  description: '',
  image: '',
});
const files = ref([]);

const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

const disabled = computed(() => {
    return !(formState.name && formState.price && formState.quantity && files.value.length);
});

const create = () =>{
    console.log(files.value);
}
</script>

<style lang="scss" scoped>
.admin{
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