import http from '@/http';

export const uploadImg = params => {
    return http.post<any>('/upload/image', params);
};
