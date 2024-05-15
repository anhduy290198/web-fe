<template>
    <div class="home">
        Content
    </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import MoviesList from '../../components/Movies/List.vue';
</script>

<style lang="scss" scoped>
.home {
    background: blue;
    line-height: 500px;
    height: 500px;
    text-align: center;
    color: #fff;
}
</style>