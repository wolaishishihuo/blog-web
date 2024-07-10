<template>
    <el-card class="edit-member-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="修改个人信息" name="first">
                <editUserInfoForm />
            </el-tab-pane>
            <el-tab-pane label="上传照片" name="second">
                <UploadImg />
            </el-tab-pane>
        </el-tabs>
        <div class="footer-btn" v-if="activeName === 'first'">
            <el-button type="primary" @click="onSubmit">确认修改</el-button>
            <el-button>重置</el-button>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import editUserInfoForm from './editUserInfoForm.vue';
import UploadImg from '@/components/Uploads/UploadImg.vue';
import type { TabsPaneContext } from 'element-plus';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
};
const onSubmit = () => {
    console.log('submit!');
};
</script>
<style scoped lang="scss">
.edit-member-card {
    flex: 1;
    height: 500px;
    .footer-btn {
        display: flex;
        justify-content: center;
    }
}
</style>
