<template>
    <el-card class="edit-member-card">
        <el-tabs v-model="activeName">
            <el-tab-pane label="修改个人信息" name="userInfo">
                <editUserInfoForm />
            </el-tab-pane>
            <el-tab-pane label="上传头像" name="avatar">
                <UploadImg v-model:image-url="avatar" @finish="uploadFinish" width="300px" height="300px" :file-size="3">
                    <template #empty>
                        <el-icon><Avatar /></el-icon>
                        <span>请上传头像</span>
                    </template>
                    <template #tip> 头像大小不能超过 3M </template>
                </UploadImg>
            </el-tab-pane>
        </el-tabs>
        <div class="footer-btn" v-if="activeName === 'first'">
            <el-button type="primary" @click="onSubmit">确认修改</el-button>
            <el-button>重置</el-button>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import editUserInfoForm from './editUserInfoForm.vue';
import UploadImg from '@/components/Uploads/UploadImg.vue';
import { useUserStore } from '@/stores/modules/user';
import { modifyUserInfoApi } from '@/api/user';

const userStore = useUserStore();
const activeName = ref('userInfo');
const avatarUrl = computed(() => userStore.avatarUrl);
const avatar = ref(avatarUrl.value);

const uploadFinish = async () => {
    const { success } = await modifyUserInfoApi({ avatar: avatar.value });
    if (success) {
        userStore.getUserInfo();
    }
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
