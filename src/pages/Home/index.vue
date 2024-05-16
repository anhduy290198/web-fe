<template>
    <!-- <div class="home">
        Content
    </div> -->
    <div>
        <ListProduct :type="'phone'" />
    </div>
</template>

<script setup>
import ListProduct from "../../components/common/ListProduct.vue";

</script>

<style lang="scss" scoped>
.home {
    line-height: 500px;
    height: 500px;
    text-align: center;
    color: #fff;
}
</style>