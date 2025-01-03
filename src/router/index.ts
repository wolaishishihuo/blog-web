import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    meta: { transition: "fade" },
  },
  {
    path: "/blog",
    component: () => import("../views/Blog.vue"),
    meta: { transition: "fade" },
  },
  {
    path: "/post/:id",
    component: () => import("../views/PostDetail.vue"),
    meta: { transition: "fade" },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(savedPosition), 300);
      });
    }
    return { top: 0, behavior: "smooth" };
  },
});
