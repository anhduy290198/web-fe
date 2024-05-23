<template>
    <div class="product">
        <DetailProduct :id="route.query.id"/>
    </div>
</template>

<script setup>
import DetailProduct from "../../components/common/DetailProduct.vue";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

</script>

<style>

</style>