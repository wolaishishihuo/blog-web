<template>
    <div class="theme">
        <SvgIcon :name="isDark ? 'sun' : 'moon'" @click="toggleDark()" :icon-style="{ width: '25px', height: '25px' }" />
    </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
<style scoped lang="scss"></style>
