<template>
    <el-container class="layout">
        <el-header>
            <div class="header-lf mask-image">
                <div class="logo flx-center"></div>
                <!-- <ToolBarLeft /> -->
            </div>
            <div class="header-ri">
                <!-- <ToolBarRight /> -->
            </div>
        </el-header>
        <el-main>Main</el-main>
    </el-container>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user';
const user = useUserStore();
user.getUserInfo();
</script>
<style scoped lang="scss">
@import './index.scss';
.layout {
    min-width: 600px;
}
</style>
