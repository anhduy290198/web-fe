<template>
    <div class="content">
        <div class="title">{{props.type}}</div>
        <div class="search">
            <div class="input-search">
                <a-input-search  placeholder="Nhập tên sản phẩm"/>
            </div>
            <div class="filter">
                <div class="filter-detail">
                    <div class="label">
                        Giá
                    </div>
                    <div class="filter-type">
                        <a-select
                            ref="select"
                            v-model:value="value1"
                            style="width: 120px"
                            @focus="focus"
                            @change="handleChange"
                            >
                            <a-select-option value="jack">Jack</a-select-option>
                            <a-select-option value="lucy">Lucy</a-select-option>
                            <a-select-option value="disabled" disabled>Disabled</a-select-option>
                            <a-select-option value="Yiminghe">yiminghe</a-select-option>
                        </a-select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineComponent , computed} from "vue";

const title = computed(() => {
    let title = 'Trang chủ';
    switch (props.type) {
        case 'phone':
            title = "Điện thoại"
            break;
        case 'laptop':
            title = "Laptop"
            break;
        case 'tivi':
            title = "Tivi"
            break;
        case 'accessory':
            title = "Phụ kiện"
            break;
        default:
            title = "Trang chủ"
            break;
    }
    return check;
});

const props = defineProps({
    type: { type: String },
});

</script>

<style lang="scss" scoped>
.content{
    width: 80%;
    margin: 0 auto;
    .title{
        text-align: center;
        font-size: 30px;
        line-height: 60px;
    }
    .search{
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        .input-search{
            width: 40%;
        }
        .filter{
            width: 55%;
            .filter-detail{
                display: flex;
                .label{
                    line-height: 32px;
                }
                .filter-type{

                }
            }
        }
    }
}
</style>