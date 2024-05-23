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
                    <a-select
                        v-model:value="formState.category"
                        style="width: 120px"
                        >
                        <a-select-option v-for="category in listCategory" :key="category.id" :value="category.id">{{category.name}}</a-select-option>
                        </a-select>
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
                    <a-button :disabled="disabled" @click="create">Tạo sản phẩm</a-button>
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
import apiCategory from "../../api/category";
import { message, Modal } from "ant-design-vue";

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

//created
onBeforeMount( async () => {
    let res = await apiCategory.listCategory();
    if(res.status){
        listCategory.value  = res.data
    }
});

const disabled = computed(() => {
    return !(formState.name && formState.price && formState.quantity && files.value.length);
});

const create = () =>{
    let params = {
        name: formState.name,
        price: formState.price,
        quantity: formState.quantity,
        category: formState.category,
        description: formState.description,
        image: files.value
    }
    apiProduct.CreateProduct(params).then(res =>{
        if(res.status){
            message.success('Tạo sản phẩm thành công');
        }
    });
    
}

const addImage = () =>{
    if(!urlImage.value){
        return
    }
    files.value.push(urlImage.value);
    urlImage.value = "";
}
const deleteImage = (index) =>{
    files.value.splice(index,1);
}


const handleInputFile = (evt)=>{
    files.value = evt.target.files;

    // let file = evt.target.files[0];
    // nameFile.value = file.name;
    // fileImport.value = file;
}

const back = () =>{
    router.push({
        name: "AdminListProduct"
    })
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