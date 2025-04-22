<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

// 定义props
const props = defineProps({
  // 弹幕数据
  danmakuList: {
    type: Array,
    default: () => []
  },
  // 弹幕速度（像素/秒）
  speed: {
    type: Number,
    default: 100
  },
  // 弹幕区域高度
  height: {
    type: Number,
    default: 100
  },
  // 弹幕密度（0-1之间，越大弹幕越密集）
  density: {
    type: Number,
    default: 0.6,
    validator: (value) => value >= 0 && value <= 1
  },
  // 是否暂停
  paused: {
    type: Boolean,
    default: false
  },
  // 弹幕颜色
  colors: {
    type: Array,
    default: () => ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
  }
});

// 弹幕容器引用
const danmakuRef = ref(null);
// 活跃的弹幕列表
const activeDanmaku = ref([]);
// 弹幕轨道数量
const trackCount = ref(0);
// 动画帧ID
let animationFrameId = null;
// 上次更新时间
let lastTime = 0;
// 弹幕发送间隔（毫秒）
const sendInterval = computed(() => 2000 / (props.density * props.danmakuList.length + 1));
// 上次发送弹幕的时间
let lastSendTime = 0;
// 弹幕索引
let danmakuIndex = 0;

// 初始化弹幕系统
const initDanmaku = () => {
  if (!danmakuRef.value) return;

  // 计算轨道数量（根据容器高度和每个弹幕的高度）
  const trackHeight = 30; // 每个弹幕的高度
  trackCount.value = Math.floor(props.height / trackHeight);

  // 开始动画循环
  lastTime = performance.now();
  animationFrameId = requestAnimationFrame(updateDanmaku);
};

// 更新弹幕位置
const updateDanmaku = (currentTime) => {
  if (props.paused) {
    animationFrameId = requestAnimationFrame(updateDanmaku);
    return;
  }

  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  // 移动现有弹幕（从左向右）
  activeDanmaku.value.forEach(danmaku => {
    danmaku.left += props.speed * deltaTime / 1000;
  });

  // 移除已经移出视野的弹幕
  activeDanmaku.value = activeDanmaku.value.filter(danmaku => {
    // 使用窗口宽度而不是容器宽度，确保弹幕在整个屏幕宽度上滑动
    return danmaku.left < window.innerWidth + 100; // 添加一些额外的距离，确保完全移出视野
  });

  // 发送新弹幕
  if (currentTime - lastSendTime > sendInterval.value && props.danmakuList.length > 0) {
    sendDanmaku();
    lastSendTime = currentTime;
  }

  animationFrameId = requestAnimationFrame(updateDanmaku);
};

// 发送新弹幕
const sendDanmaku = () => {
  if (!danmakuRef.value || props.danmakuList.length === 0) return;

  // 获取容器宽度
  const containerWidth = danmakuRef.value.clientWidth;

  // 选择一条弹幕
  const danmakuText = props.danmakuList[danmakuIndex % props.danmakuList.length];
  danmakuIndex = (danmakuIndex + 1) % props.danmakuList.length;

  // 创建弹幕元素来测量宽度
  const testEl = document.createElement('div');
  testEl.className = 'danmaku-item';
  testEl.textContent = danmakuText;
  testEl.style.position = 'absolute';
  testEl.style.visibility = 'hidden';
  document.body.appendChild(testEl);
  const width = testEl.offsetWidth;
  document.body.removeChild(testEl);

  // 选择一个可用的轨道
  const availableTracks = [];
  for (let i = 0; i < trackCount.value; i++) {
    availableTracks.push(i);
  }

  // 过滤掉已经有弹幕的轨道
  const occupiedTracks = new Set();
  activeDanmaku.value.forEach(danmaku => {
    // 如果弹幕还在屏幕左侧一半，则认为该轨道被占用
    // 使用窗口宽度而不是容器宽度
    if (danmaku.left < window.innerWidth * 0.3) {
      occupiedTracks.add(danmaku.track);
    }
  });

  const filteredTracks = availableTracks.filter(track => !occupiedTracks.has(track));

  // 如果没有可用轨道，随机选择一个
  const track = filteredTracks.length > 0
    ? filteredTracks[Math.floor(Math.random() * filteredTracks.length)]
    : Math.floor(Math.random() * trackCount.value);

  // 随机选择一个颜色
  const color = props.colors[Math.floor(Math.random() * props.colors.length)];

  // 添加新弹幕（从左侧开始）
  activeDanmaku.value.push({
    id: Date.now() + Math.random(),
    text: danmakuText,
    left: -width, // 从左侧开始（屏幕外）
    track,
    width,
    color
  });
};

// 组件挂载时初始化
onMounted(() => {
  initDanmaku();
});

// 组件卸载前清理资源
onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<template>
  <div
    ref="danmakuRef"
    class="danmaku-container"
    :style="{ height: `${height}px` }"
  >
    <div
      v-for="danmaku in activeDanmaku"
      :key="danmaku.id"
      class="danmaku-item"
      :style="{
        transform: `translateX(${danmaku.left}px)`,
        top: `${danmaku.track * 30}px`,
        color: danmaku.color
      }"
    >
      {{ danmaku.text }}
    </div>
  </div>
</template>

<style scoped>
.danmaku-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.danmaku-item {
  position: absolute;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
  opacity: 0.8;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5px;
}
</style>
