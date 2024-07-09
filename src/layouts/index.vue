<template>
    <el-container class="layout">
        <el-header>
            <HeaderLeft />
            <HeaderRight />
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import HeaderLeft from './components/header/HeaderLeft.vue';
import HeaderRight from './components/header/HeaderRight.vue';
import { useUserStore } from '@/stores/modules/user';
const user = useUserStore();
user.getUserInfo();
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
