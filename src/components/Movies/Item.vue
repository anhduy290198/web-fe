<template>
    <div>
        Movie Item {{ props.item }}
    </div>
</template>

<script setup>
const props = defineProps({
    item: Number,
})
</script>

<style lang="scss" scoped>

</style>