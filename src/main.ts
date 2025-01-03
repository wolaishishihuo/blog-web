import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./styles/main.scss";
import App from "./App.vue";
import { router } from "./router";

const app = createApp(App);

// 开发环境下的性能监控
if (import.meta.env.DEV) {
  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        let value: string;

        if (entry.entryType === "layout-shift") {
          value = (entry as LayoutShift).value.toFixed(3);
        } else {
          value = entry.startTime.toFixed(0);
        }

        console.log(
          `%c性能指标%c ${entry.entryType}: ${value}${
            entry.entryType === "layout-shift" ? "" : "ms"
          }`,
          "color: #6366f1; font-weight: bold",
          "color: inherit"
        );
      });
    });

    observer.observe({
      entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"],
    });
  } catch (e) {
    console.warn("性能监控不可用:", e instanceof Error ? e.message : String(e));
  }
}

// 全局错误处理
app.config.errorHandler = (err: unknown, instance: any, info: string) => {
  if (err instanceof Error) {
    console.error(`应用错误 [${info}]:`, err.message);

    if (import.meta.env.DEV) {
      console.error("错误详情:", {
        error: err,
        component: instance,
        info,
      });
    }
  }
};

app.use(createPinia()).use(router).use(ElementPlus).mount("#app");
