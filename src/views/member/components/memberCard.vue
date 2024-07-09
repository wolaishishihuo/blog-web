<template>
    <div class="music-card playing">
        <div class="image">
            <img :src="avatar" />
        </div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="info">
            <div class="title">{{ userInfo.nickname || 'nickname' }}</div>
            <div class="time">{{ time }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
import { User } from '@/api/interface';
import { computed, PropType } from 'vue';
const { userInfo } = defineProps({
    avatar: {
        type: String,
        default: () => 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    },
    userInfo: {
        type: Object as PropType<User.UserInfo>,
        default: () => ({})
    }
});
const time = computed(() => dayjs(userInfo.createAt).fromNow());
</script>
<style scoped lang="scss">
@import 'https://fonts.googleapis.com/css?family=Reem+Kufi';
@keyframes wave {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.music-card {
    background: #fff;
    box-shadow: 0px 8px 28px -9px rgba(0, 0, 0, 0.45);
    overflow: hidden;
    position: relative;
    width: 300px;
    height: 500px;
    border-radius: 6px;
}

.image {
    position: absolute;
    z-index: 1;
    opacity: 0.3;
    width: 300px;
    height: 500px;
    img {
        object-fit: cover;
    }
}

.wave {
    position: absolute;
    height: 750px;
    width: 750px;
    opacity: 0.6;
    left: 0;
    top: 0;
    margin-left: -70%;
    margin-top: -130%;
    background: radial-gradient(#353535, #383737);
}

.wave:nth-child(2),
.wave:nth-child(3) {
    top: 10px;
}

.playing .wave {
    border-radius: 40%;
    animation: wave 3000ms infinite linear;
}
/* when stop */
.wave {
    border-radius: 40%;
    animation: wave 55s infinite linear;
}

.playing .wave:nth-child(2) {
    animation-duration: 4000ms;
}
/* when stop */
.wave:nth-child(2) {
    animation-duration: 50s;
}

.playing .wave:nth-child(3) {
    animation-duration: 5000ms;
}
/* when stop */
.wave:nth-child(3) {
    animation-duration: 45s;
}

.info {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    text-align: center;
}

.title {
    font-size: 1.4em;
    font-weight: 400;
    color: #333;
    margin-bottom: 8px;
    text-transform: uppercase;
    font-family: 'Reem Kufi', sans-serif;
}

.time {
    color: #333;
    font-size: 1.2em;
    letter-spacing: 0.08em;
    font-family: 'Reem Kufi', sans-serif;
    margin-top: -10px;
}

.fa {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 18px;
    cursor: pointer;
    color: #555;
}

.fa-play {
    display: none;
}
</style>
