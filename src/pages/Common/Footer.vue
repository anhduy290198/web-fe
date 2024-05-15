<template>
    <div class="footer">
        Footer
    </div>
</template>

<script setup>
import {ref} from "vue";

const menuActive = ref(1);
</script>

<style lang="scss" scoped>
.footer {
    background: black;
    line-height: 200px;
    height: 200px;
    text-align: center;
    color: #fff;
}
</style>