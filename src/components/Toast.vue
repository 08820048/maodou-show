<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 定义props
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success', // success, error, warning, info
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  },
  onClose: {
    type: Function,
    default: () => {}
  }
});

// 控制Toast的显示状态
const visible = ref(false);
let timer = null;

// 显示Toast
const show = () => {
  visible.value = true;

  // 设置定时器，自动关闭
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close();
    }, props.duration);
  }
};

// 关闭Toast
const close = () => {
  visible.value = false;
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  props.onClose();
};

// 组件挂载时显示Toast
onMounted(() => {
  show();
});

// 组件卸载前清理定时器
onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
});
</script>

<template>
  <transition name="toast-fade">
    <div v-if="visible" :class="['toast', `toast-${type}`]">
      <div class="toast-icon">
        <!-- 成功图标 -->
        <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>

        <!-- 错误图标 -->
        <svg v-else-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>

        <!-- 警告图标 -->
        <svg v-else-if="type === 'warning'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>

        <!-- 信息图标 -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
      <div class="toast-content">{{ message }}</div>
    </div>
  </transition>
</template>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 9999;
  min-width: 300px;
  max-width: 80%;
  font-weight: 500;
}

.toast-icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
}

.toast-icon svg {
  width: 22px;
  height: 22px;
}

.toast-content {
  font-size: 15px;
  line-height: 1.5;
  letter-spacing: 0.3px;
}

/* 不同类型的Toast样式 - 增强对比度 */
.toast-success {
  background-color: #67c23a;
  border: 1px solid #5daf34;
  color: white;
}

.toast-success .toast-icon {
  color: white;
}

.toast-error {
  background-color: #f56c6c;
  border: 1px solid #e65656;
  color: white;
}

.toast-error .toast-icon {
  color: white;
}

.toast-warning {
  background-color: #e6a23c;
  border: 1px solid #d99736;
  color: white;
}

.toast-warning .toast-icon {
  color: white;
}

.toast-info {
  background-color: #909399;
  border: 1px solid #82848a;
  color: white;
}

.toast-info .toast-icon {
  color: white;
}

/* 过渡动画 */
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -30px);
}
</style>
