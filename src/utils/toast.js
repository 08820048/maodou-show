import { createApp } from 'vue';
import Toast from '../components/Toast.vue';

// 创建一个Toast实例并挂载到DOM
const createToast = (options) => {
  // 创建一个div作为Toast的容器
  const mountNode = document.createElement('div');
  document.body.appendChild(mountNode);
  
  // 创建Toast实例
  const app = createApp(Toast, {
    ...options,
    onClose: () => {
      // 关闭后销毁组件
      app.unmount();
      document.body.removeChild(mountNode);
      options.onClose && options.onClose();
    }
  });
  
  // 挂载Toast
  app.mount(mountNode);
  
  // 返回一个关闭函数
  return {
    close: () => {
      app.unmount();
      document.body.removeChild(mountNode);
    }
  };
};

// Toast服务
const toast = {
  // 成功提示
  success(message, duration = 3000, onClose) {
    return createToast({
      message,
      type: 'success',
      duration,
      onClose
    });
  },
  
  // 错误提示
  error(message, duration = 3000, onClose) {
    return createToast({
      message,
      type: 'error',
      duration,
      onClose
    });
  },
  
  // 警告提示
  warning(message, duration = 3000, onClose) {
    return createToast({
      message,
      type: 'warning',
      duration,
      onClose
    });
  },
  
  // 信息提示
  info(message, duration = 3000, onClose) {
    return createToast({
      message,
      type: 'info',
      duration,
      onClose
    });
  }
};

export default toast;
