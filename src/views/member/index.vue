<template>
    <div class="member">
        <MemberCard :avatar="avatarUrl" :user-info="userStore.userInfo" />
        <EditMember />
    </div>
</template>

<script setup lang="ts" name="member">
import MemberCard from './components/memberCard.vue';
import EditMember from './components/editMember.vue';
import { useUserStore } from '@/stores/modules/user';
import { computed } from 'vue';
const userStore = useUserStore();
const avatarUrl = computed(() => userStore.avatarUrl);
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
