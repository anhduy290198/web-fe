<template>
    <div class="admin">
        <div class="back">
            <a-button @click="back">
                Quay lại
            </a-button>
        </div>
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
                    label="Danh mục"
                    name="category"
                    :rules="[{ required: true, message: 'Vui lòng chọn danh mục!' }]"
                    >
                    <div>{{getCategory(formState.category)}}</div>
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
                <!-- <a-button @click="$refs.upload.click();">
                    upload
                </a-button>
                <input type="file" style="display: none" ref="upload" @change="handleInputFile($event)"> -->
                <a-form-item
                    label="Ảnh"
                    name="image"
                    >
                    <div style="display: flex; justify-content: space-between">
                        <a-input v-model:value="urlImage" style="width: 85%;"></a-input>
                        <a-button @click="addImage">Thêm ảnh</a-button>
                    </div>
                    <div class="list-image">
                        <template v-for="(image,index) in files" :key="image">
                            <div class="img">
                                <img :src="image" >
                                <div class="icon-delete" @click="deleteImage(index)">x</div>
                            </div>
                        </template>
                    </div>

                </a-form-item>

                <a-form-item  :wrapper-col="{ offset: 12, span: 16 }">
                    <a-button :disabled="disabled" @click="update">Cập nhật sản phẩm</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineComponent , reactive , computed, onBeforeMount  } from "vue";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { PlusOutlined } from '@ant-design/icons-vue';
import apiProduct from "../../api/product";
import { message, Modal } from "ant-design-vue";
import category from "../../api/category";

const route = useRoute();
const router = useRouter();
const formState = reactive({
  name: '',
  category: 1,
  price: '',
  quantity: 1,
  description: '',
  image: [],
});
const files = ref([]);
const upload = ref();

const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const listCategory = ref([]);
const urlImage= ref("");
const product = ref("");
const user = ref(null);

//created
onBeforeMount( async () => {
    let params ={
        id: route.query.id
    }
    let res = await apiProduct.getDetailProduct(params);
    if(res.status){
        let  product  = res.data;
        formState.name =  product.name;
        formState.category =  product.id_category;
        formState.price =  product.price;
        formState.quantity =  product.quantity;
        formState.description =  product.description;
        files.value = JSON.parse(product.image);
    }
    let userLocal = localStorage.getItem('user');
    if(userLocal){
        userLocal = JSON.parse(userLocal);
        if(userLocal.permission === 1){
            user.value = userLocal;
        }
    }
});

const disabled = computed(() => {
    return !(formState.name && formState.price && formState.quantity && files.value.length);
});

const update = () =>{
    let params = {
        name: formState.name,
        price: formState.price,
        quantity: formState.quantity,
        id_category: formState.category,
        description: formState.description,
        image: files.value,
        id: route.query.id,
        username: user.value.username,
        password: user.value.password
    }
    apiProduct.UpdateProduct(params).then(res => {
        if(res.status){
            message.success('Cập nhật sản phẩm thành công');
        }
    }).catch(e =>{
        message.error('Cập nhật sản phẩm thất bại')
    });

    
}

const addImage = () =>{
    if(!urlImage.value){
        return;
    }
    files.value.push(urlImage.value);
    urlImage.value = "";
}
const deleteImage = (index) =>{
    files.value.splice(index,1);
}


const handleInputFile = (evt)=>{
    files.value = evt.target.files;

}

const back = () =>{
    router.push({
        name: "AdminListProduct"
    })
}

const getCategory = (data) =>{
    let category = '';
    if(data === 1){
        category = "Điện thoại"
    }else if(data === 2){
        category = "Laptop"
    }else if(data === 3){
        category = "Tivi"
    }else{
        category = "Phụ kiện"
    }
    return category;
}
</script>

<style lang="scss" scoped>
.admin{
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
    .buy{
        text-align: right;
        margin-top: 20px;
    }
    .create-product{
        .list-image{
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            .img{
                width: 60px;
                height: 60px;
                position: relative;
                img{
                    width: 60px;
                    height: 60px;
                }
                .icon-delete{
                    position: absolute;
                    right: 0;
                    top: 0;
                    cursor: pointer;
                    background: black;
                    padding:0 5px;
                    font-size: 10px;
                    color: #ffffff;
                    border-radius: 50%;
                }
            }
        }
    }
}
</style>