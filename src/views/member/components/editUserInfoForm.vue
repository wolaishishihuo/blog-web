<template>
    <el-form :model="userForm" label-width="auto" label-suffix=":">
        <el-form-item label="昵称">
            <el-input v-model="userForm.nickname" clearable />
        </el-form-item>
        <el-form-item label="简介">
            <el-input v-model="userForm.desc" :rows="3" type="textarea" show-word-limit maxlength="200" />
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
const userForm = reactive({
    nickname: '',
    desc: ''
});
</script>
<style lang="scss" scoped></style>
