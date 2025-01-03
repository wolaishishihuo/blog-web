<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";

const router = useRouter();
const featuredPosts = ref([
  {
    id: 1,
    title: "Vue 3 与 TypeScript 实战指南",
    excerpt: "深入探讨 Vue 3 组合式 API 与 TypeScript 的完美配合...",
    date: "2024-03-20",
    tags: ["Vue", "TypeScript"],
    readTime: "5 min",
  },
  {
    id: 2,
    title: "现代化前端工程化实践",
    excerpt: "从零开始搭建一个现代化的前端开发环境...",
    date: "2024-03-18",
    tags: ["工程化", "Vite"],
    readTime: "8 min",
  },
]);

const goToPost = (id: number) => {
  router.push(`/post/${id}`);
};

const categories = ref([
  { name: "前端", count: 12, icon: "CodeBracketIcon" },
  { name: "后端", count: 8, icon: "ServerIcon" },
  { name: "移动端", count: 5, icon: "DevicePhoneMobileIcon" },
  { name: "其他", count: 3, icon: "Square3Stack3DIcon" },
]);
</script>

<template>
  <div class="flex flex-col min-h-[calc(100vh-4rem)]">
    <!-- Hero Section -->
    <section
      class="relative py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div class="page-container">
        <div class="max-w-3xl">
          <h1
            class="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-200 text-transparent bg-clip-text"
          >
            技术文章
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            分享前端开发、后端技术、移动端开发等技术文章
          </p>
          <div class="mt-8">
            <BaseButton size="lg" @click="router.push('/blog')">
              浏览文章
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-12 bg-gray-50/50 dark:bg-gray-900/50">
      <div class="page-container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="category in categories"
            :key="category.name"
            class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="flex items-center space-x-4">
              <component
                :is="category.icon"
                class="w-8 h-8 text-primary-500 dark:text-primary-400"
              />
              <div>
                <h3
                  class="font-medium text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors"
                >
                  {{ category.name }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ category.count }} 篇文章
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Posts -->
    <section class="py-16">
      <div class="page-container">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            最新文章
          </h2>
          <RouterLink
            to="/blog"
            class="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
          >
            查看更多 →
          </RouterLink>
        </div>

        <TransitionGroup
          tag="div"
          class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 transform translate-y-4"
          enter-to-class="opacity-100 transform translate-y-0"
        >
          <article
            v-for="post in featuredPosts"
            :key="post.id"
            class="group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300 h-[280px]"
            @click="goToPost(post.id)"
          >
            <div class="p-6 flex flex-col h-full">
              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4 min-h-[28px] items-start">
                <div class="flex flex-wrap gap-2 -mt-1">
                  <span
                    v-for="tag in post.tags"
                    :key="tag"
                    class="mt-1 px-2.5 py-0.5 text-xs bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-full"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Title -->
              <h3
                class="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-2 min-h-[56px]"
              >
                {{ post.title }}
              </h3>

              <!-- Excerpt -->
              <p
                class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-1"
              >
                {{ post.excerpt }}
              </p>

              <!-- Meta Info -->
              <div
                class="flex items-center justify-between text-sm text-gray-500 mt-auto"
              >
                <time class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {{ post.date }}
                </time>
                <span class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  {{ post.readTime }}
                </span>
              </div>
            </div>
          </article>
        </TransitionGroup>
      </div>
    </section>
  </div>
</template>

<style scoped>
[class*="animate-"] {
  animation-fill-mode: both;
  animation-delay: var(--animation-delay, 0);
}

.bg-grid-slate-900 {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E");
}
</style>
