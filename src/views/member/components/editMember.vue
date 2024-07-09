<template>
    <el-card class="edit-member-card">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="修改个人信息" name="first">
                <editUserInfoForm />
            </el-tab-pane>
            <el-tab-pane label="上传照片" name="second">Config</el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import editUserInfoForm from './editUserInfoForm.vue';
import type { TabsPaneContext } from 'element-plus';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
};
</script>
<style scoped lang="scss">
.edit-member-card {
    flex: 1;
    height: 500px;
}
</style>
