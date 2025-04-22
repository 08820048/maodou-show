<script setup>
import { ref, onMounted, watch } from 'vue';

const isDark = ref(false);

// 初始化主题
onMounted(() => {
  // 检查本地存储中的主题设置
  const savedTheme = localStorage.getItem('theme');
  // 检查系统偏好
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // 如果有保存的主题设置，使用它；否则使用系统偏好
  isDark.value = savedTheme === 'dark' || (savedTheme === null && prefersDark);

  // 应用初始主题
  applyTheme();
});

// 监听主题变化
watch(isDark, () => {
  applyTheme();
  // 保存主题设置到本地存储
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
});

// 应用主题
const applyTheme = () => {
  if (isDark.value) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
};

// 切换主题
const toggleTheme = () => {
  isDark.value = !isDark.value;
};
</script>

<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
    :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
  >
    <!-- 太阳图标 (浅色模式) -->
    <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>

    <!-- 月亮图标 (深色模式) -->
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: var(--text-color);
}

.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}

.dark .theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
