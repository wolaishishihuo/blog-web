<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useDark, useToggle, onClickOutside } from "@vueuse/core";
import BaseButton from "@/components/BaseButton.vue";

const isDark = useDark();
const toggleTheme = useToggle(isDark);
const route = useRoute();
const isMenuOpen = ref(false);
const mobileNav = ref<HTMLElement | null>(null);

defineProps<{
  isScrolled: boolean;
}>();

const navItems = [
  { name: "首页", path: "/" },
  { name: "博客", path: "/blog" },
  { name: "关于", path: "/about" },
];

const isActive = (path: string) => route.path === path;

const handleThemeToggle = () => {
  toggleTheme();
};

// 点击外部关闭菜单
onClickOutside(mobileNav, () => {
  isMenuOpen.value = false;
});

// 监听 Escape 键关闭菜单
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isMenuOpen.value) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});
</script>

<template>
  <header
    class="fixed w-full top-0 z-50 transition-all duration-500"
    :class="[
      isScrolled
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg'
        : 'bg-transparent',
    ]"
  >
    <nav
      class="page-container h-16 flex items-center justify-between"
      :class="{ 'border-b border-gray-200 dark:border-gray-700': isScrolled }"
    >
      <RouterLink
        to="/"
        class="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-200 text-transparent bg-clip-text hover:opacity-80 transition-opacity"
      >
        Blog
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="px-4 py-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
          :class="{
            'text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30':
              isActive(item.path),
          }"
        >
          {{ item.name }}
        </RouterLink>

        <BaseButton
          variant="ghost"
          size="sm"
          @click="handleThemeToggle"
          class="ml-4"
        >
          <svg
            v-if="isDark"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd"
            />
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            />
          </svg>
        </BaseButton>
      </div>

      <!-- Mobile Menu Button -->
      <BaseButton
        variant="ghost"
        size="sm"
        class="md:hidden"
        @click="isMenuOpen = !isMenuOpen"
        aria-label="打开菜单"
        :aria-expanded="isMenuOpen"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="!isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </BaseButton>

      <!-- Mobile Navigation -->
      <div
        v-show="isMenuOpen"
        ref="mobileNav"
        class="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <div class="page-container py-4 space-y-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="block px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
            :class="{
              'text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30':
                isActive(item.path),
            }"
            @click="isMenuOpen = false"
          >
            {{ item.name }}
          </RouterLink>

          <!-- Mobile Theme Toggle -->
          <BaseButton
            variant="ghost"
            size="sm"
            @click="handleThemeToggle"
            class="w-full flex items-center space-x-3"
          >
            <svg
              v-if="isDark"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              />
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              />
            </svg>
            <span>{{ isDark ? "切换到亮色模式" : "切换到暗色模式" }}</span>
          </BaseButton>
        </div>
      </div>
    </nav>
  </header>
</template>
