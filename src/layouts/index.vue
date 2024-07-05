<template>
    <el-container class="layout">
        <el-header>
            <div class="header-lf mask-image">
                <div class="logo flx-center">
                    <SvgIcon name="logo" :icon-style="{ width: '100px', height: '50px' }" />
                </div>
            </div>
            <div class="header-ri">
                <SwitchTheme />
            </div>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue';
import SwitchTheme from './components/SwitchTheme.vue';
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
