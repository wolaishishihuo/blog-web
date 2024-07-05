<template>
    <h1>home1</h1>
    <el-button @click="to">Default</el-button>
</template>

<script setup lang="ts" name="home">
import { useRouter } from 'vue-router';

const router = useRouter();
const to = () => {
    router.push('/member');
};
</script>
<style scoped lang="scss"></style>
