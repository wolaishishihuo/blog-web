<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useBlogStore } from "../stores/blog";
import { storeToRefs } from "pinia";
import BaseButton from "@/components/BaseButton.vue";

const blogStore = useBlogStore();
const { posts, isLoading } = storeToRefs(blogStore);
const searchQuery = ref("");
const selectedTags = ref<Set<string>>(new Set());

const allTags = computed(() => {
  const tags = new Set<string>();
  posts.value.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags);
});

const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesTags =
      selectedTags.value.size === 0 ||
      post.tags.some((tag) => selectedTags.value.has(tag));
    return matchesSearch && matchesTags;
  });
});

const toggleTag = (tag: string) => {
  if (selectedTags.value.has(tag)) {
    selectedTags.value.delete(tag);
  } else {
    selectedTags.value.add(tag);
  }
  // 强制更新响应性
  selectedTags.value = new Set(selectedTags.value);
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedTags.value.clear();
  selectedTags.value = new Set();
};

onMounted(() => {
  blogStore.fetchPosts();
});
</script>

<template>
  <div class="flex flex-col min-h-[calc(100vh-4rem)]">
    <!-- Header Section -->
    <section
      class="relative bg-gradient-to-br from-primary-100 to-primary-50 dark:from-gray-900 dark:to-gray-800 py-12"
    >
      <div
        class="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03]"
      ></div>
      <div class="relative page-container">
        <h1
          class="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-200 text-transparent bg-clip-text"
        >
          博客文章
        </h1>
        <p class="text-gray-600 dark:text-gray-300 text-lg">
          探索最新的技术文章和见解
        </p>
      </div>
    </section>

    <div class="flex-grow page-container py-8">
      <!-- Search and Filter Section -->
      <div class="mb-8 space-y-4">
        <div class="relative group">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索文章..."
            class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent group-hover:border-primary-500 transition-all duration-300"
          />
          <svg
            class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <!-- Tags Filter -->
        <div class="flex flex-wrap gap-2">
          <BaseButton
            v-for="tag in allTags"
            :key="tag"
            :variant="selectedTags.has(tag) ? 'primary' : 'ghost'"
            :class="[
              'transition-all duration-300',
              selectedTags.has(tag)
                ? 'shadow-sm'
                : 'border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50/50 dark:hover:bg-primary-900/20',
            ]"
            size="sm"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </BaseButton>
        </div>
      </div>

      <!-- Posts Grid -->
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center py-20"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mb-4"
        ></div>
        <p class="text-gray-500 dark:text-gray-400">加载中...</p>
      </div>

      <TransitionGroup
        v-else
        tag="div"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform translate-y-4"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-4"
      >
        <article
          v-for="post in filteredPosts"
          :key="post.id"
          class="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-hover transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
          @click="$router.push(`/post/${post.id}`)"
        >
          <div class="flex-1 p-5">
            <div class="h-6 mb-3 flex flex-wrap gap-1.5 overflow-hidden">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="inline-flex px-2.5 py-0.5 text-xs bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-full whitespace-nowrap"
              >
                {{ tag }}
              </span>
            </div>

            <h2
              class="h-14 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors duration-300 line-clamp-2 mb-2"
            >
              {{ post.title }}
            </h2>

            <p
              class="h-18 text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4"
            >
              {{ post.content }}
            </p>
          </div>

          <div
            class="h-10 px-5 py-2 border-t border-gray-100/80 dark:border-gray-700 bg-gray-50/80 backdrop-blur-sm dark:bg-gray-800/50"
          >
            <div
              class="flex items-center justify-between text-xs text-gray-500"
            >
              <div class="flex items-center space-x-4">
                <time class="flex items-center min-w-[5.5rem]">
                  <svg
                    class="w-3.5 h-3.5 mr-1 flex-shrink-0"
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
                  <span class="whitespace-nowrap">{{ post.date }}</span>
                </time>

                <span class="flex items-center min-w-[4.5rem]">
                  <svg
                    class="w-3.5 h-3.5 mr-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span class="whitespace-nowrap">{{ post.readTime }}</span>
                </span>
              </div>
            </div>
          </div>

          <div
            class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-b from-primary-500/5 to-transparent"
          ></div>

          <div
            class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-primary-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
          ></div>
        </article>
      </TransitionGroup>

      <!-- Empty State -->
      <div
        v-if="filteredPosts.length === 0 && !isLoading"
        class="flex flex-col items-center justify-center py-20"
      >
        <div class="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
          <svg
            class="h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          未找到相关文章
        </h3>
        <p class="text-gray-500 dark:text-gray-400 text-center max-w-md">
          试试其他关键词或标签，或者
          <button
            class="text-primary-500 hover:text-primary-600 font-medium"
            @click="resetFilters"
          >
            清除筛选条件
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-grid-slate-900 {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E");
}

.h-18 {
  height: 4.5rem; /* 3 lines * 1.5rem line height */
}

.hover\:shadow-hover:hover {
  box-shadow: var(--card-shadow);
}

:root {
  --card-shadow: 0 0 0 1px rgba(99, 102, 241, 0.05),
    0 4px 12px -2px rgba(99, 102, 241, 0.08),
    0 2px 6px -2px rgba(99, 102, 241, 0.04);
}

.dark {
  --card-shadow: 0 0 0 1px rgba(99, 102, 241, 0.2),
    0 4px 8px -2px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2);
}

/* 添加卡片悬浮动画 */
.group:hover {
  transform: translateY(-2px);
}

/* 优化标签样式 */
.group:hover .rounded-full {
  @apply bg-primary-100 dark:bg-primary-900/40;
}
</style>
