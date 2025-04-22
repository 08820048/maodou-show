<script setup>
import { ref, onMounted, computed } from 'vue';
import Danmaku from './Danmaku.vue';
import danmakuConfig from '../config/danmaku';

// 好评截图数据
const reviews = [
  { id: 1, image: '/reviews/1.jpg' },
  { id: 2, image: '/reviews/2.jpg' },
  { id: 3, image: '/reviews/3.jpg' },
  { id: 4, image: '/reviews/4.jpg' },
  { id: 5, image: '/reviews/5.jpg' },
  { id: 6, image: '/reviews/6.jpg' },
  { id: 7, image: '/reviews/7.jpg' },
  { id: 8, image: '/reviews/8.jpg' },

];

// 当前活跃的卡片索引
const activeIndex = ref(0);
// 是否正在拖动
const isDragging = ref(false);
// 拖动开始位置
const startX = ref(0);
// 拖动偏移量
const dragOffset = ref(0);
// 是否显示大图
const showFullImage = ref(false);
// 当前查看的大图
const currentFullImage = ref(null);

// 计算每个卡片的样式
const cardStyles = computed(() => {
  return reviews.map((review, index) => {
    // 基础旋转角度 (-8 到 8 度之间的随机值)
    const baseRotation = (Math.random() * 16 - 8).toFixed(2);

    // 基础位置偏移 (-15px 到 15px 之间的随机值)
    const baseOffsetX = (Math.random() * 30 - 15).toFixed(2);
    const baseOffsetY = (Math.random() * 30 - 15).toFixed(2);

    // 计算z-index，活跃卡片最高
    const zIndex = index === activeIndex.value ? 10 : 10 - Math.abs(index - activeIndex.value);

    // 计算卡片位置
    let translateX = `${baseOffsetX}px`;
    let translateY = `${baseOffsetY}px`;
    let translateZ = '0px';
    let rotate = `${baseRotation}deg`;
    let scale = '1';
    let opacity = '1';

    // 如果正在拖动，调整活跃卡片的位置
    if (isDragging.value && index === activeIndex.value) {
      translateX = `calc(${baseOffsetX}px + ${dragOffset.value}px)`;
    }

    // 非活跃卡片的样式
    if (index !== activeIndex.value) {
      // 计算与活跃卡片的距离
      const distance = index - activeIndex.value;

      // 根据距离调整位置和样式
      if (distance < 0) {
        // 在活跃卡片之前的卡片
        translateX = `calc(${baseOffsetX}px - ${Math.abs(distance) * 50}px)`; // 增加偏移量
        translateZ = `-${Math.abs(distance) * 15}px`; // 增加Z轴偏移
        opacity = `${1 - Math.abs(distance) * 0.25}`; // 增强透明度变化
        scale = `${1 - Math.abs(distance) * 0.08}`; // 增强缩放效果
      } else {
        // 在活跃卡片之后的卡片
        translateX = `calc(${baseOffsetX}px + ${distance * 50}px)`; // 增加偏移量
        translateZ = `-${distance * 15}px`; // 增加Z轴偏移
        opacity = `${1 - distance * 0.25}`; // 增强透明度变化
        scale = `${1 - distance * 0.08}`; // 增强缩放效果
      }
    }

    return {
      transform: `translate3d(${translateX}, ${translateY}, ${translateZ}) rotate(${rotate}) scale(${scale})`,
      zIndex,
      opacity
    };
  });
});

// 处理拖动开始
const handleDragStart = (e) => {
  isDragging.value = true;
  startX.value = e.clientX || e.touches[0].clientX;
  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('touchmove', handleDragMove);
  document.addEventListener('mouseup', handleDragEnd);
  document.addEventListener('touchend', handleDragEnd);
};

// 处理拖动移动
const handleDragMove = (e) => {
  if (!isDragging.value) return;

  const clientX = e.clientX || e.touches[0].clientX;
  dragOffset.value = clientX - startX.value;

  // 阻止默认行为，防止页面滚动
  e.preventDefault();
};

// 处理拖动结束
const handleDragEnd = () => {
  if (!isDragging.value) return;

  isDragging.value = false;

  // 如果拖动距离足够大，切换卡片
  if (Math.abs(dragOffset.value) > 100) {
    if (dragOffset.value > 0 && activeIndex.value > 0) {
      // 向右拖动，显示上一张
      activeIndex.value--;
    } else if (dragOffset.value < 0 && activeIndex.value < reviews.length - 1) {
      // 向左拖动，显示下一张
      activeIndex.value++;
    }
  }

  // 重置拖动偏移
  dragOffset.value = 0;

  // 移除事件监听器
  document.removeEventListener('mousemove', handleDragMove);
  document.removeEventListener('touchmove', handleDragMove);
  document.removeEventListener('mouseup', handleDragEnd);
  document.removeEventListener('touchend', handleDragEnd);
};

// 显示大图
const showFullSizeImage = (review) => {
  if (isDragging.value) return;

  currentFullImage.value = review;
  showFullImage.value = true;
};

// 关闭大图
const closeFullImage = () => {
  showFullImage.value = false;
  setTimeout(() => {
    currentFullImage.value = null;
  }, 300);
};

// 切换到上一张
const prevCard = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
  }
};

// 切换到下一张
const nextCard = () => {
  if (activeIndex.value < reviews.length - 1) {
    activeIndex.value++;
  }
};

// 监听键盘事件
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevCard();
    } else if (e.key === 'ArrowRight') {
      nextCard();
    }
  });
});
</script>

<template>
  <section id="testimonials" class="stacked-reviews">
    <div class="container">
      <h2 class="section-title">客户好评</h2>
      <p class="section-description">
        浏览我们客户的真实好评截图，感受用户对我们服务的满意度
      </p>

      <div class="reviews-container">
        <div class="stacked-cards-wrapper">
          <!-- 弹幕区域（放在卡片堆叠区域的背后） -->
          <div class="danmaku-wrapper">
            <Danmaku
              :danmaku-list="danmakuConfig.danmakuList"
              :speed="danmakuConfig.speed"
              :height="danmakuConfig.height"
              :density="danmakuConfig.density"
              :colors="danmakuConfig.colors"
            />
          </div>

          <!-- 卡片堆叠区域 -->
          <div class="stacked-cards">
            <div
              v-for="(review, index) in reviews"
              :key="review.id"
              class="review-card"
              :style="cardStyles[index]"
              @mousedown="handleDragStart"
              @touchstart="handleDragStart"
              @click="showFullSizeImage(review)"
            >
              <div class="card-content">
                <img :src="review.image" :alt="`客户好评 ${review.id}`" class="review-image" @error="(e) => e.target.src = '/placeholder.jpg'">
              </div>
            </div>
          </div>

          <!-- 导航按钮 -->
          <div class="navigation-controls">
            <button
              class="nav-button prev"
              @click="prevCard"
              :disabled="activeIndex === 0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div class="pagination">
              {{ activeIndex + 1 }} / {{ reviews.length }}
            </div>
            <button
              class="nav-button next"
              @click="nextCard"
              :disabled="activeIndex === reviews.length - 1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          <!-- 使用提示 -->
          <div class="usage-hint">
            <p>左右滑动查看更多好评 · 点击查看大图</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 全屏查看模态框 -->
    <div class="fullscreen-modal" v-if="currentFullImage" :class="{ 'show': showFullImage }">
      <div class="modal-overlay" @click="closeFullImage"></div>
      <div class="modal-content">
        <button class="close-button" @click="closeFullImage">×</button>
        <div class="fullsize-image-container">
          <img :src="currentFullImage.image" :alt="`客户好评 ${currentFullImage.id}`" class="fullsize-image">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stacked-reviews {
  padding: 5rem 0;
  background-color: var(--card-bg);
  width: 100vw;
  max-width: 100vw;
  margin: 0;
}

.section-title {
  font-size: 2.5rem;
  text-align: left;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 700;
  padding: 0 2rem;
  width: 100%;
}

.section-description {
  text-align: left;
  max-width: none;
  margin: 0 0 3rem;
  color: var(--text-light);
  font-size: 1.1rem;
  padding: 0 2rem;
  width: 100%;
}

.reviews-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  margin: 0 auto;
}

.stacked-cards-wrapper {
  width: 100%;
  max-width: 1000px; /* 增加最大宽度 */
  height: 550px; /* 增加高度 */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.danmaku-wrapper {
  width: 100vw; /* 使用视口宽度 */
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%; /* 居中定位 */
  transform: translateX(-50%); /* 居中定位 */
  z-index: 1; /* 将弹幕放在卡片堆叠区域的背后 */
  pointer-events: none; /* 允许鼠标事件穿透到卡片 */
  overflow: hidden; /* 防止水平滚动条出现 */
}

.stacked-cards {
  width: 100%;
  height: 450px; /* 调整高度 */
  position: relative;
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2; /* 将卡片堆叠区域放在弹幕的前面 */
}

/* 删除重复的样式 */

.stacked-cards {
  width: 100%;
  height: 450px; /* 增加高度以适应更大的卡片 */
  position: relative;
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.review-card {
  position: absolute;
  width: 350px; /* 增加卡片宽度 */
  height: 450px; /* 增加卡片高度 */
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: grab;
  transform-origin: center center;
  overflow: hidden;
  user-select: none;
}

.review-card:active {
  cursor: grabbing;
}

.card-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem; /* 减少内边距，使图片能够更好地填充卡片 */
  box-sizing: border-box;
}

.review-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 5px;
}

.navigation-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem; /* 减少与卡片的间距 */
  gap: 1.5rem; /* 增加按钮之间的间距 */
}

.nav-button {
  background: none;
  border: none;
  width: 48px; /* 增加按钮大小 */
  height: 48px; /* 增加按钮大小 */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--text-color);
  background-color: var(--bg-color);
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.nav-button:hover:not(:disabled) {
  background-color: var(--primary-color);
  color: white;
  transform: scale(1.1);
}

.nav-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-button svg {
  width: 24px; /* 增加图标大小 */
  height: 24px; /* 增加图标大小 */
}

.pagination {
  font-size: 1.1rem; /* 增大字体 */
  color: var(--text-color);
  min-width: 70px; /* 增加宽度 */
  text-align: center;
  font-weight: 500; /* 增加字重 */
  background-color: var(--bg-color); /* 添加背景色 */
  padding: 0.5rem 0.8rem; /* 添加内边距 */
  border-radius: 20px; /* 添加圆角 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08); /* 添加阴影 */
}

.usage-hint {
  margin-top: 1.5rem;
  text-align: center;
  color: var(--text-light);
  font-size: 1rem; /* 增大字体 */
  font-style: italic;
  background-color: var(--bg-color); /* 添加背景色 */
  padding: 0.8rem 1.5rem; /* 添加内边距 */
  border-radius: 30px; /* 添加圆角 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05); /* 添加阴影 */
  display: inline-block; /* 使其仅占据必要的宽度 */
}

/* 全屏查看模态框 */
.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.fullscreen-modal.show {
  opacity: 1;
  visibility: visible;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 1000px;
  background: var(--card-bg);
  border-radius: 16px;
  padding: 2rem;
  z-index: 1001;
  transform: scale(0.9);
  transition: transform 0.3s ease;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.fullscreen-modal.show .modal-content {
  transform: scale(1);
}

.close-button {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  font-size: 1.8rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.3s ease;
  z-index: 1002;
}

.close-button:hover {
  background-color: var(--primary-color);
  color: white;
}

.fullsize-image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fullsize-image {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
}

/* 深色模式适配 */
:deep(.dark-mode) .review-card {
  background-color: var(--card-bg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stacked-cards-wrapper {
    height: 450px; /* 调整高度 */
  }

  .stacked-cards {
    height: 350px; /* 调整高度 */
  }

  .review-card {
    width: 260px; /* 增加宽度 */
    height: 350px; /* 增加高度 */
  }

  .section-title {
    font-size: 2rem;
  }

  .usage-hint {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }

  .pagination {
    font-size: 1rem;
    min-width: 60px;
    padding: 0.4rem 0.6rem;
  }
}
</style>
