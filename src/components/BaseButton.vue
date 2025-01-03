<script setup lang="ts">
defineProps<{
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}>();
</script>

<template>
  <button
    class="inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-gray-900"
    :class="[
      // 尺寸变体
      {
        'text-sm px-3 py-1.5 rounded-lg gap-1.5': size === 'sm',
        'text-base px-4 py-2 rounded-xl gap-2': size === 'md' || !size,
        'text-lg px-6 py-3 rounded-xl gap-2.5': size === 'lg',
      },
      // 样式变体
      {
        // 主要按钮
        'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 focus:ring-primary-500 dark:from-primary-500 dark:to-primary-400 dark:hover:from-primary-400 dark:hover:to-primary-300':
          variant === 'primary' || !variant,

        // 次要按钮
        'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 shadow-lg shadow-gray-200/50 hover:shadow-gray-300/50 focus:ring-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white dark:shadow-gray-900/50':
          variant === 'secondary',

        // 轮廓按钮
        'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/30':
          variant === 'outline',

        // 幽灵按钮
        'text-primary-500 hover:bg-primary-50 focus:ring-primary-500 dark:text-primary-400 dark:hover:bg-primary-900/30':
          variant === 'ghost',
      },
    ]"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  transform: translateY(0);
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

button:hover {
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

button::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0;
  transform: scale(0.8);
}

button:active::before {
  opacity: 0.1;
  transform: scale(1);
  background: currentColor;
}

button:focus-visible::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  opacity: 0.15;
  background: transparent;
  transition: opacity 0.2s ease;
}
</style>
