import http from '@/http';
export const getUserInfo = () => {
    return http.get('/user/getUserInfo');
};
export const modifyUserInfoApi = params => {
    return http.post('/user/modifyUserInfo', params);
};
