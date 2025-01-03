<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBlogStore } from "../stores/blog";
import { storeToRefs } from "pinia";
import { marked } from "marked";
import { useTitle } from "@vueuse/core";
import BaseButton from "@/components/BaseButton.vue";

// 配置 marked 选项
marked.setOptions({
  gfm: true,
  breaks: true,
  silent: false,
  pedantic: false,
});

const route = useRoute();
const router = useRouter();
const blogStore = useBlogStore();
const { currentPost, isLoading, error } = storeToRefs(blogStore);

const fetchPost = async () => {
  const id = Number(route.params.id);
  if (isNaN(id)) {
    router.push("/blog");
    return;
  }
  await blogStore.fetchPostById(id);
};

// 设置页面标题
watch(currentPost, (post) => {
  if (post) {
    useTitle(`${post.title} - My Blog`);
  }
});

onMounted(fetchPost);
</script>

<template>
  <div class="flex flex-col min-h-[calc(100vh-4rem)]">
    <div v-if="isLoading" class="flex-grow flex items-center justify-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"
      ></div>
    </div>

    <article v-else-if="currentPost" class="flex-grow">
      <!-- Cover Image -->
      <div
        v-if="currentPost.coverImage"
        class="relative h-[300px] md:h-[400px]"
      >
        <img
          :src="currentPost.coverImage"
          :alt="currentPost.title"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent"
        ></div>
        <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            {{ currentPost.title }}
          </h1>
          <div class="flex items-center gap-4 text-sm">
            <time class="flex items-center">
              <svg
                class="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {{ currentPost.date }}
            </time>
            <span class="flex items-center">
              <svg
                class="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ currentPost.readTime }}
            </span>
            <span v-if="currentPost.author" class="flex items-center">
              <svg
                class="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {{ currentPost.author }}
            </span>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="page-container py-8">
        <div class="flex flex-wrap gap-2 mb-8">
          <span
            v-for="tag in currentPost.tags"
            :key="tag"
            class="px-3 py-1 text-sm bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-full"
          >
            {{ tag }}
          </span>
        </div>

        <!-- 如果没有封面图，在这里显示标题 -->
        <template v-if="!currentPost.coverImage">
          <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {{ currentPost.title }}
          </h1>
          <div class="flex items-center gap-4 text-sm text-gray-500 mb-8">
            <time class="flex items-center">
              {{ currentPost.date }}
            </time>
            <span>{{ currentPost.readTime }}</span>
            <span v-if="currentPost.author">{{ currentPost.author }}</span>
          </div>
        </template>

        <div
          class="prose prose-lg dark:prose-invert max-w-none"
          v-html="marked(currentPost.content)"
        ></div>
      </div>
    </article>

    <!-- 返回按钮 -->
    <div class="page-container py-4">
      <BaseButton variant="secondary" size="sm" @click="router.push('/blog')">
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>返回列表</span>
      </BaseButton>
    </div>

    <div
      v-if="error"
      class="flex-grow flex flex-col items-center justify-center py-20"
    >
      <svg
        class="w-16 h-16 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">
        {{ error }}
      </h3>
      <BaseButton variant="primary" @click="router.push('/blog')">
        返回文章列表
      </BaseButton>
    </div>
  </div>
</template>

<style>
/* 自定义 Markdown 样式 */
.prose pre {
  @apply bg-gray-100 dark:bg-gray-800 !important;
}

.prose code {
  @apply text-primary-600 dark:text-primary-400 !important;
}

.prose a {
  @apply text-primary-600 dark:text-primary-400 no-underline hover:underline !important;
}
</style>
