<template>
    <div class="list-movie">
        <div>
            <div>List Movie</div>
            <div>Text</div>
        </div>

        <div class="slider">
            <Carousel v-bind="carouselSetting">
                <Slide v-for="slide in 10" :key="slide">
                    <MovieItem :item="slide"></MovieItem>
                </Slide>
    
                <template #addons>
                    <Navigation />
                </template>
            </Carousel>
        </div>
    </div>
</template>

<script setup>
import MovieItem from './Item.vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { reactive, ref } from 'vue';

const carouselSetting = reactive({
    itemsToShow: 5,
    snapAlign: 'center',
    wrapAround: true,
});
</script>

<style lang="scss" scoped>
.list-movie {
    background-color: #c0c0c0;
    margin: 60px 0;
}
</style>