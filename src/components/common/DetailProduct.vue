<template>
    <div class="detail-product">
        123
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { TabletOutlined, HomeOutlined, LaptopOutlined , UsbOutlined , DesktopOutlined , ShoppingCartOutlined , UserOutlined} from '@ant-design/icons-vue';

const route = useRoute();
const router = useRouter();
</script>

<style lang="scss" scoped>
.detail-product{
    width: 70%;
    margin: 0 auto;
}
</style>