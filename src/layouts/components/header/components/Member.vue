<template>
    <div class="header-member">
        <el-tooltip effect="dark" content="个人中心">
            <el-avatar :size="25" :src="avatarUrl" @click="toMember" class="avatar" />
        </el-tooltip>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const avatarUrl = computed(() => userStore.avatarUrl || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"');

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
