<template>
    <div class="phone">
        <ListProduct :type="type"/>
    </div>
</template>

<script setup>
import ListProduct from "../../components/common/ListProduct.vue";
import { ref, watch, getCurrentInstance, onBeforeMount, computed , onMounted} from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const type = ref("");

//created
onMounted(async () => {
    if(route.query.type){
        type.value = route.query.type;
    }
});

watch(route, (value) => {
    type.value = value.query.type;
});


</script>

<style>

</style>