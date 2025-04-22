<script setup>
import { ref, computed } from 'vue';
import toast from '../utils/toast';

// 成品展示数据
const videos = ref([
  {
    id: 1,
    title: '和谐校园',
    description: '小而美的校园主题风格轻网页',
    thumbnail: '/videos/和谐校园缩略图.png',
    videoUrl: '/videos/和谐校园.mp4',
    originalPrice: 80,
    tech: ['HTML', 'javascript', 'css'],
    sellable: 1 // 1表示可出售，0表示不可出售
  },
  {
    id: 2,
    title: '个人技术主页',
    description: '清爽炫酷的技术人员个人主页，元素丰富，功能齐全',
    thumbnail: '/videos/个人主页缩略图.png',
    videoUrl: '/videos/个人主页.mp4',
    originalPrice: 100,
    tech: ['bootstrap', 'JavaScript', 'CSS'],
    sellable: 1 // 不可出售
  },
  {
    id: 3,
    title: '机器人教育平台',
    description: '以机器人教育为主题的在线教育机类型官网展示',
    thumbnail: '/videos/机器人教育缩略图.png', // 使用现有的缩略图
    videoUrl: '/videos/机器人教育.mp4', // 使用现有的视频
    originalPrice:  150,
    tech: ['javascript', 'HTML', 'CSS'],
    sellable: 1 // 可出售
  },
  {
    id: 4, // 修正ID为4，因为前面已经有ID为3的项目
    title: '3D数题卧室',
    description: '按客户需求美化的3D版本数字空间',
    thumbnail: '/videos/3D数题卧室缩略图.png', // 使用现有的缩略图
    videoUrl: '/videos/3D 数题卧室.mp4', // 使用现有的视频
    originalPrice: 5299,
    tech: ['three.js', 'javascript', 'HTML'],
    sellable: 0 // 不可出售
  },
  {
    id: 5, // 修正ID为4，因为前面已经有ID为3的项目
    title: '旅游首页',
    description: '基于客户提供的设计图开发的页面',
    thumbnail: '/videos/去旅游缩略图.png', // 使用现有的缩略图
    videoUrl: '/videos/去旅游.mp4', // 使用现有的视频
    originalPrice:  55,
    tech: ['HTML', 'javascript', 'HTML'],
    sellable: 0 // 不可出售
  },
  {
    id: 6, // 修正ID为4，因为前面已经有ID为3的项目
    title: '公司官网',
    description: '清爽简约的公式官网',
    thumbnail: '/videos/简版公司官网缩略图.png', // 使用现有的缩略图
    videoUrl: '/videos/简版公司官网.mp4', // 使用现有的视频
    originalPrice:  55,
    tech: ['HTML', 'javascript', 'HTML'],
    sellable: 0 // 不可出售
  },
  {
    id: 7, // 修正ID为4，因为前面已经有ID为3的项目
    title: '算法可视化网站',
    description: '专注于计算机科学和游戏开发等领域的可视化神站',
    thumbnail: '/videos/算法可视化缩略图.png', // 使用现有的缩略图
    videoUrl: '/videos/算法可视化.mp4', // 使用现有的视频
    originalPrice:  231.32,
    tech: ['Three.js', 'JavaScript', 'HTML'],
    sellable: 1
  },
  {
    id: 8, // 修正ID为4，因为前面已经有ID为3的项目
    title: 'AI食品分析',
    description: '采用 AI图片分析技术，分析食品包装的上的相关信息',
    thumbnail: '/videos/AI食品分析缩略图.png', // 使用现有的缩略图
    videoUrl: '/videos/食品信息分析.mp4', // 使用现有的视频
    originalPrice:  200,
    tech: ['Vue3', 'JavaScript', 'Vite','NodeJs'],
    sellable: 1
  },
]);

// Filter functionality
const activeFilter = ref('all');

// Define filter categories based on sellable status
const filterCategories = [
  { id: 'sellable', label: '可出售商品' },
  { id: 'not-sellable', label: '仅供展示商品' }
];

// 为每个视频生成商品码和计算现价
const processedVideos = computed(() => {
  // 定义商品类型前缀映射
  const productTypes = [
    { id: 1, prefix: 'EC' }, // 电商网站
    { id: 2, prefix: 'CO' }, // 企业官网
    { id: 3, prefix: 'ED' }, // 教育平台
    { id: 4, prefix: 'RS' }, // 餐饮系统
    { id: 5, prefix: 'FS' }, // 时尚品牌
    { id: 6, prefix: 'TR' }  // 旅游平台
  ];

  return videos.value.map(video => {
    // 根据产品ID查找对应的前缀
    const typeInfo = productTypes.find(type => type.id === video.id) || { prefix: 'PD' };

    // 生成商品码：类型前缀 + 产品ID（两位数字）
    const productCode = `${typeInfo.prefix}${String(video.id).padStart(2, '0')}`;

    // 判断是否可出售
    const isSellable = video.sellable === 1;

    // 如果可出售，计算现价（原价的 55%，保留 2 位小数）
    // 如果不可出售，设置一个特殊标记
    const price = isSellable ? parseFloat((video.originalPrice * 0.55).toFixed(2)) : null;

    // 返回包含商品码、现价和可出售状态的完整对象
    return {
      ...video,
      productCode,
      price,
      isSellable
    };
  });
});

// Filter videos based on sellable status
const filteredVideos = computed(() => {
  if (activeFilter.value === 'all') {
    return processedVideos.value;
  }

  return processedVideos.value.filter(video => {
    if (activeFilter.value === 'sellable') {
      return video.isSellable;
    } else if (activeFilter.value === 'not-sellable') {
      return !video.isSellable;
    }

    return true;
  });
});

// Function to set active filter
const filterVideos = (filterId) => {
  activeFilter.value = filterId;
};

// 复制商品码到剪贴板
const copyProductCode = (code, event) => {
  // 防止事件冒泡，避免触发卡片点击
  if (event) {
    event.stopPropagation();
  }

  navigator.clipboard.writeText(code)
    .then(() => {
      // 显示复制成功提示
      toast.success(`商品码 ${code} 已复制到剪贴板！`);
    })
    .catch(err => {
      console.error('复制失败:', err);
      toast.error('复制失败，请手动复制商品码。');
    });
};

// 处理图片加载错误
const handleImageError = (event, video) => {
  console.error(`缩略图加载失败: ${video.thumbnail}`);
  // 创建一个占位图元素
  const placeholderDiv = document.createElement('div');
  placeholderDiv.className = 'placeholder-image';
  placeholderDiv.textContent = video.title;

  // 替换图片元素
  event.target.parentNode.replaceChild(placeholderDiv, event.target);
};

// Active video for modal display
const activeVideo = ref(null);
const showModal = ref(false);

// Function to open video modal
const openVideoModal = (video) => {
  activeVideo.value = video;
  showModal.value = true;
};

// Function to close video modal
const closeVideoModal = () => {
  showModal.value = false;
  // Reset active video after animation completes
  setTimeout(() => {
    activeVideo.value = null;
  }, 300);
};
</script>

<template>
  <section id="showcase" class="video-showcase" style="width: 100vw; max-width: 100vw; margin: 0; padding: 5rem 0; background-color: var(--bg-color);">
    <div class="container" style="width: 100%; max-width: 100%; padding: 0 2rem;">
      <h2 class="section-title">作品展示</h2>
      <p class="section-description">
        浏览我们的部分网页设计作品集，部分是仅供展示，部分是可出售的。
      </p>

      <div class="video-filter" style="display: flex; justify-content: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 3rem; padding: 0 2rem; width: 100%;">
        <button
          class="filter-btn"
          :class="{ 'active': activeFilter === 'all' }"
          @click="filterVideos('all')"
        >
          全部作品
        </button>
        <button
          v-for="category in filterCategories"
          :key="category.id"
          class="filter-btn"
          :class="{ 'active': activeFilter === category.id }"
          @click="filterVideos(category.id)"
        >
          {{ category.label }}
        </button>
      </div>

      <div class="video-grid" style="display: flex; flex-wrap: wrap; gap: 2.5rem; width: 100%; padding: 0 2rem; justify-content: flex-start;">
        <div
          v-for="video in filteredVideos"
          :key="video.id"
          class="video-item"
          @click="openVideoModal(video)"
          style="flex: 0 0 calc(33.333% - 1.67rem); margin-bottom: 1rem; border-radius: 16px; overflow: hidden; box-shadow: var(--box-shadow); transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; background: white; height: 100%; border: 1px solid rgba(226, 232, 240, 0.7);"
        >
          <div class="video-thumbnail">
            <img :src="video.thumbnail" :alt="video.title" @error="handleImageError($event, video)" />
            <div class="play-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div class="video-info">
            <h3>{{ video.title }}</h3>
            <p>{{ video.description }}</p>

            <!-- 技术选型标签 -->
            <div class="tech-tags">
              <span v-for="(tech, index) in video.tech" :key="index" class="tech-tag">{{ tech }}</span>
            </div>

            <!-- 商品码和价格信息 -->
            <div class="product-info">
              <div class="product-code-container">
                <span class="product-code-label">商品码:</span>
                <span class="product-code">{{ video.productCode }}</span>
                <button class="copy-btn" @click.stop="copyProductCode(video.productCode, $event)" title="复制商品码">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>

              <div class="price-container">
                <span v-if="video.isSellable" class="original-price">原价: ￥{{ video.originalPrice }}</span>
                <span v-if="video.isSellable" class="current-price">￥{{ video.price }}</span>
                <span v-else class="not-for-sale">禁止出售</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Video Modal -->
      <div class="video-modal" v-if="activeVideo" :class="{ 'show': showModal }">
        <div class="modal-overlay" @click="closeVideoModal"></div>
        <div class="modal-content">
          <button class="close-button" @click="closeVideoModal">×</button>
          <div class="modal-header">
            <div class="modal-title-container">
              <h3>{{ activeVideo.title }}</h3>
              <div class="modal-product-code">
                <span>商品码: {{ activeVideo.productCode }}</span>
                <button class="copy-btn modal-copy-btn" @click="copyProductCode(activeVideo.productCode, $event)" title="复制商品码">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="modal-price-container">
              <span v-if="activeVideo.isSellable" class="modal-original-price">原价: ￥{{ activeVideo.originalPrice }}</span>
              <span v-if="activeVideo.isSellable" class="modal-current-price">￥{{ activeVideo.price }}</span>
              <span v-else class="modal-not-for-sale">禁止出售</span>
            </div>
          </div>
          <video controls :src="activeVideo.videoUrl" class="modal-video"></video>
          <p>{{ activeVideo.description }}</p>

          <!-- 技术选型标签 -->
          <div class="modal-tech-tags">
            <h4>技术选型</h4>
            <div class="tech-tags">
              <span v-for="(tech, index) in activeVideo.tech" :key="index" class="tech-tag modal-tech-tag">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video-showcase {
  padding: 5rem 0;
  background-color: var(--light-bg);
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

.video-filter {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
  padding: 0 2rem;
  width: 100%;
}

.filter-btn {
  background: none;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.3rem;
}

.filter-btn:hover, .filter-btn.active {
  background-color: var(--primary-color);
  color: white;
}

.video-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin: 0 auto;
  padding: 0.5rem 2rem;
  width: 100%;
  justify-content: flex-start;
}

.video-item {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background: white;
  height: 100%;
  border: 1px solid rgba(226, 232, 240, 0.7);
  flex: 0 0 calc(33.333% - 1.67rem);
  margin-bottom: 1rem;
}

@media (max-width: 1200px) {
  .video-item {
    flex: 0 0 calc(50% - 1.25rem);
  }
}

@media (max-width: 768px) {
  .video-item {
    flex: 0 0 100%;
  }
}

.video-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.video-thumbnail {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background: var(--placeholder-bg);
  transition: transform 0.5s ease;
}

.video-item:hover .video-thumbnail img,
.video-item:hover .placeholder-image {
  transform: scale(1.05);
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.play-button svg {
  width: 30px;
  height: 30px;
}

.video-item:hover .play-button {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.1);
}

.video-info {
  padding: 1.8rem 1.8rem 2rem;
}

.video-info h3 {
  margin: 0 0 0.8rem;
  color: var(--text-color);
  font-size: 1.3rem;
  font-weight: 600;
}

.video-info p {
  margin: 0 0 1.5rem;
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* 技术选型标签 */
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.8rem 0;
}

.tech-tag {
  display: inline-block;
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary-color);
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

/* 商品信息容器 */
.product-info {
  margin-top: 0.8rem;
  border-top: 1px dashed var(--border-color);
  padding-top: 0.8rem;
}

/* 商品码容器 */
.product-code-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
}

.product-code-label {
  color: var(--text-light);
  font-size: 0.9rem;
}

.product-code {
  font-family: monospace;
  font-weight: 600;
  background: rgba(59, 130, 246, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: var(--primary-color);
}

.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-light);
  padding: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  color: var(--primary-color);
  background: rgba(59, 130, 246, 0.1);
}

/* 价格容器 */
.price-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.original-price {
  color: var(--text-light);
  text-decoration: line-through;
  font-size: 0.9rem;
}

.current-price {
  color: #ee4d2d; /* 粉色红色，类似淘宝价格 */
  font-size: 1.4rem;
  font-weight: 700;
}

.not-for-sale {
  color: #b91c1c; /* 红色文字，类似印章 */
  font-size: 1rem;
  font-weight: 700; /* 加粗字体 */
  background-color: rgba(254, 226, 226, 0.7); /* 浅红色背景 */
  padding: 0.4rem 0.8rem;
  border-radius: 4px; /* 小圆角，更像矩形 */
  border: 1.5px dashed #dc2626; /* 虚线边框，更像印章 */
  display: inline-block;
  letter-spacing: 1px; /* 增加字母间距 */
  transform: rotate(-5deg); /* 轻微倾斜，增强印章感 */
  position: relative;
  text-transform: uppercase; /* 大写字母 */
  text-align: center;
  box-shadow: 0 1px 3px rgba(185, 28, 28, 0.2); /* 添加红色阴影 */
  transition: all 0.3s ease;
}

/* 添加印章效果 */
.not-for-sale::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 5px,
    rgba(185, 28, 28, 0.05) 5px,
    rgba(185, 28, 28, 0.05) 10px
  );
  border-radius: 3px;
  z-index: -1;
}

/* 悬停效果 */
.not-for-sale:hover {
  transform: rotate(-7deg) scale(1.05); /* 略微放大并增加倾斜 */
  box-shadow: 0 2px 5px rgba(185, 28, 28, 0.3);
}

/* 深色模式下的样式 */
.dark .not-for-sale {
  color: #fca5a5; /* 浅红色文字 */
  background-color: rgba(127, 29, 29, 0.7); /* 深红色背景 */
  border-color: #ef4444; /* 红色边框 */
  box-shadow: 0 1px 3px rgba(239, 68, 68, 0.3); /* 红色阴影 */
}

/* 深色模式下的悬停效果 */
.dark .not-for-sale:hover {
  box-shadow: 0 2px 5px rgba(239, 68, 68, 0.4);
}

/* Modal Styles */
.video-modal {
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

.video-modal.show {
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
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  z-index: 1001;
  transform: scale(0.9);
  transition: transform 0.3s ease;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.video-modal.show .modal-content {
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
}

.close-button:hover {
  background-color: var(--primary-color);
  color: white;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.modal-title-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modal-product-code {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-light);
}

.modal-product-code span {
  display: flex;
  align-items: center;
}

.modal-copy-btn {
  padding: 0.3rem;
}

.modal-content h3 {
  font-size: 1.8rem;
  margin-bottom: 0;
  color: var(--text-color);
}

.modal-price-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.modal-original-price {
  color: var(--text-light);
  text-decoration: line-through;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
}

.modal-current-price {
  color: #ee4d2d;
  font-size: 1.5rem;
  font-weight: 700;
}

.modal-not-for-sale {
  color: #b91c1c; /* 红色文字，类似印章 */
  font-size: 1.2rem;
  font-weight: 700; /* 加粗字体 */
  background-color: rgba(254, 226, 226, 0.7); /* 浅红色背景 */
  padding: 0.5rem 1rem;
  border-radius: 4px; /* 小圆角，更像矩形 */
  border: 2px dashed #dc2626; /* 虚线边框，更像印章 */
  display: inline-block;
  letter-spacing: 1px; /* 增加字母间距 */
  transform: rotate(-5deg); /* 轻微倾斜，增强印章感 */
  position: relative;
  text-transform: uppercase; /* 大写字母 */
  text-align: center;
  box-shadow: 0 1px 3px rgba(185, 28, 28, 0.2); /* 添加红色阴影 */
  transition: all 0.3s ease;
  margin-top: 0.5rem; /* 增加与原价的间距 */
}

/* 添加印章效果 */
.modal-not-for-sale::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 5px,
    rgba(185, 28, 28, 0.05) 5px,
    rgba(185, 28, 28, 0.05) 10px
  );
  border-radius: 3px;
  z-index: -1;
}

/* 悬停效果 */
.modal-not-for-sale:hover {
  transform: rotate(-7deg) scale(1.05); /* 略微放大并增加倾斜 */
  box-shadow: 0 2px 5px rgba(185, 28, 28, 0.3);
}

/* 深色模式下的样式 */
.dark .modal-not-for-sale {
  color: #fca5a5; /* 浅红色文字 */
  background-color: rgba(127, 29, 29, 0.7); /* 深红色背景 */
  border-color: #ef4444; /* 红色边框 */
  box-shadow: 0 1px 3px rgba(239, 68, 68, 0.3); /* 红色阴影 */
}

/* 深色模式下的悬停效果 */
.dark .modal-not-for-sale:hover {
  box-shadow: 0 2px 5px rgba(239, 68, 68, 0.4);
}

.modal-tech-tags {
  margin-top: 1.5rem;
  border-top: 1px solid var(--border-color);
  padding-top: 1.5rem;
}

.modal-tech-tags h4 {
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: var(--text-color);
}

.modal-tech-tag {
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
}

.modal-video {
  width: 100%;
  border-radius: 8px;
  margin: 1rem 0 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.modal-content p {
  color: var(--text-light);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
