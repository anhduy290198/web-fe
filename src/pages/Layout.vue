<template>
    <div class="layout">
        <Header></Header>
        <router-view></router-view>
        <!-- <Footer></Footer> -->
    </div>
</template>

<script setup>
import Header from './Common/Header.vue';
import Footer from './Common/Footer.vue';
</script>

<style lang="scss" scoped>
    .layout{
        background: #fff;
    }
</style>