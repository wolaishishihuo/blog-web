<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import { useWindowScroll } from "@vueuse/core";
import { Suspense } from "vue";

const { y } = useWindowScroll();
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <TheHeader :is-scrolled="y > 50" />

    <main class="flex-grow pt-16">
      <RouterView v-slot="{ Component, route }">
        <Suspense>
          <template #default>
            <Transition
              :name="route.meta.transition as string || 'fade'"
              mode="out-in"
              appear
            >
              <component :is="Component" :key="route.path" />
            </Transition>
          </template>
          <template #fallback>
            <div class="flex items-center justify-center py-20">
              <div
                class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"
              ></div>
            </div>
          </template>
        </Suspense>
      </RouterView>
    </main>

    <TheFooter />
  </div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1px);
}

html {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

* {
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}
</style>
