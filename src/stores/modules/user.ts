import { defineStore } from 'pinia';
import { UserState } from '../interface';
import piniaPersistConfig from '../helper';
import { getUserInfo } from '@/api/user';
import useEnv from '@/hooks/useEnv';
import { ElMessage } from 'element-plus';
const { VITE_BASE_URL } = useEnv();

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        token: '',
        userInfo: {
            username: 'Jname_kw',
            userId: '',
            avatar: '',
            secret: '',
            email: '',
            mobile: '',
            nickname: '',
            createAt: ''
        }
    }),
    getters: {
        avatarUrl: state => `${VITE_BASE_URL}/${state.userInfo.avatar}`
    },
    actions: {
        setToken(token: string) {
            this.token = token;
        },
        setUserId(userId: string) {
            this.userInfo.userId = userId;
        },

        async getUserInfo() {
            const { data, success, message } = await getUserInfo();
            if (success) {
                Object.assign(this.userInfo, data);
            } else {
                ElMessage.error(message);
            }
        }
    },
    persist: piniaPersistConfig('user')
});
