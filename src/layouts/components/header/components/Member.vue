<template>
    <div class="header-member">
        <el-tooltip effect="dark" content="个人中心">
            <el-avatar :size="25" :src="circleUrl" @click="toMember" />
        </el-tooltip>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
const router = useRouter();
const toMember = () => {
    router.push('/member');
};
</script>
<style scoped lang="scss">
.header-member {
    cursor: pointer;
}
</style>
