import '@/styles/index.scss'; // 全局样式
// element css
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
// svg icons
import 'virtual:svg-icons-register';
// dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 导入本地化语言
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn'); // 使用本地化语言
dayjs.extend(relativeTime);
export const setupAssets = () => ({});
