<template>
    <div class="phone">
        <ListProduct :type="type"/>
    </div>
</template>

<script setup>
import ListProduct from "../../components/common/ListProduct.vue";
import { ref, watch, getCurrentInstance,onBeforeMount, computed} from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const type = ref();

//created
onBeforeMount(async () => {
    if(route.query.type){
        type.value = route.query.type;
    }
});


</script>

<style>

</style>