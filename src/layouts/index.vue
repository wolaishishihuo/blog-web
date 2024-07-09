<template>
    <el-container class="layout">
        <el-header>
            <HeaderLeft />
            <HeaderRight />
        </el-header>
        <el-main class="classic-content">
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import HeaderLeft from './components/Header/HeaderLeft.vue';
import HeaderRight from './components/Header/HeaderRight.vue';
import { useUserStore } from '@/stores/modules/user';
const user = useUserStore();
user.getUserInfo();
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
