<template>
    <div class="member">
        <MemberCard :avatar="avatar" :user-info="userInfo" />
        <EditMember />
    </div>
</template>

<script setup lang="ts" name="member">
import MemberCard from './components/memberCard.vue';
import EditMember from './components/editMember.vue';
import avatar from '@/assets/images/avatar_men.jpeg';
import { useUserStore } from '@/stores/modules/user';
import { computed } from 'vue';
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
