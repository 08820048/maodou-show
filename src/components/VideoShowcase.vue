<script setup>
import { ref, computed } from 'vue';
import toast from '../utils/toast';

// 成品展示数据
const videos = ref([
  {
    id: 1,
    typeId: 1,
    title: '和谐校园',
    description: '小而美的校园主题风格轻网页',
    thumbnail: '/videos/和谐校园缩略图.png',
    videoUrl: '/videos/和谐校园.mp4',
    originalPrice: 80,
    tech: ['HTML', 'javascript', 'css'],
    isSellable: true // 1表示可出售，0表示不可出售
  },
  {
    id: 2,
    typeId: 2,
    title: '个人技术主页',
    description: '清爽炫酷的技术人员个人主页，元素丰富，功能齐全',
    thumbnail: '/videos/个人主页缩略图.png',
    videoUrl: '/videos/个人主页.mp4',
    originalPrice: 100,
    tech: ['bootstrap', 'JavaScript', 'CSS'],
    isSellable: true // 不可出售
  },
  {
    id: 3,
    typeId: 3,
    title: '机器人教育平台',
    description: '以机器人教育为主题的在线教育机类型官网展示',
    thumbnail: '/videos/机器人教育缩略图.png', // 使用现有的缩略图
    videoUrl: '/videos/机器人教育.mp4', // 使用现有的视频
    originalPrice:  150,
    tech: ['javascript', 'HTML', 'CSS'],
    isSellable: true // 可出售
  },
  {
    id: 4, // 修正ID为4，因为前面已经有ID为3的项目
    typeId: 4,
    title: '3D数题卧室',
    description: '按客户需求美化的3D版本数字空间',
    thumbnail: '/videos/3D数题卧室缩略图.png', // 使用现有的缩略图
    videoUrl: '/videos/3D 数题卧室.mp4', // 使用现有的视频
    originalPrice: 5299,
    tech: ['three.js', 'javascript', 'HTML'],
    isSellable: false // 不可出售
  },
  {
    id: 5, // 修正ID为4，因为前面已经有ID为3的项目
    typeId: 1,
    title: '旅游首页',
    description: '基于客户提供的设计图开发的页面',
    thumbnail: '/videos/去旅游缩略图.png', // 使用现有的缩略图
    videoUrl: '/videos/去旅游.mp4', // 使用现有的视频
    originalPrice:  55,
    tech: ['HTML', 'javascript', 'HTML'],
    isSellable: false // 不可出售
  },
  {
    id: 6, // 修正ID为4，因为前面已经有ID为3的项目
    typeId: 2,
    title: '公司官网',
    description: '清爽简约的公司官网',
    thumbnail: '/videos/简版公司官网缩略图.png', // 使用现有的缩略图
    videoUrl: '/videos/简版公司官网.mp4', // 使用现有的视频
    originalPrice:  55,
    tech: ['HTML', 'javascript', 'HTML'],
    isSellable: false // 不可出售
  },
  {
    id: 7, // 修正ID为4，因为前面已经有ID为3的项目
    typeId: 3,
    title: '算法可视化网站',
    description: '专注于计算机科学和游戏开发等领域的可视化神站',
    thumbnail: '/videos/算法可视化缩略图.png', // 使用现有的缩略图
    videoUrl: '/videos/算法可视化.mp4', // 使用现有的视频
    originalPrice:  231.32,
    tech: ['Three.js', 'JavaScript', 'HTML'],
    isSellable: true
  },
  {
    id: 8, // 修正ID为4，因为前面已经有ID为3的项目
    typeId: 4,
    title: 'AI食品分析',
    description: '采用 AI图片分析技术，分析食品包装的上的相关信息',
    thumbnail: '/videos/AI食品分析缩略图.png', // 使用现有的缩略图
    videoUrl: '/videos/食品信息分析.mp4', // 使用现有的视频
    originalPrice:  200,
    tech: ['Vue3', 'JavaScript', 'Vite','NodeJs'],
    isSellable: true
  },
  {
    id: 9, // 修正ID为4，因为前面已经有ID为3的项目
    typeId: 1,
    title: '保温杯子对照试验',
    description: '采用 html\css\js\three.js技术',
    thumbnail: '/videos/保温杯对照试验缩略图.png', // 使用现有的缩略图
    videoUrl: '/videos/保温杯对照试验.mp4', // 使用现有的视频
    originalPrice:  100,
    tech: [ 'JavaScript', 'Html','three.js','css'],
    isSellable: false
  },
  {
    id: 10, // 修正ID为4，因为前面已经有ID为3的项目
    typeId: 2,
    title: '网页美化',
    description: '接到小姐姐的美化需求，给他弄出来了，很满意',
    thumbnail: '/videos/网页美化缩略图.png', // 使用现有的缩略图
    videoUrl: '/videos/网页美化.mp4', // 使用现有的视频
    originalPrice:  45,
    tech: [ 'JavaScript', 'Html','css'],
    isSellable: false
  },
  {
    id: 11, // 修正ID为4，因为前面已经有ID为3的项目
    typeId: 3,
    title: '企业官网',
    description: '感谢信任，也是做出了老板想象中的官网',
    thumbnail: '/videos/川韵企业官网开发缩略图.png', // 使用现有的缩略图
    videoUrl: '/videos/川韵企业官网开发.mp4', // 使用现有的视频
    originalPrice:  700,
    tech: [ 'JavaScript', 'Html','css'],
    isSellable: false
  }
]);

// Filter functionality
const activeFilter = ref('all');

// Define filter categories based on sellable status
const filterCategories = [
  { id: 'sellable', label: '可出售商品' },
  { id: 'not-sellable', label: '仅供展示商品' }
];

// 搜索状态管理
const searchQuery = ref('');

// 为每个视频生成商品码和计算现价
const processedVideos = computed(() => {
  // 定义商品类型前缀映射
  const productTypes = [
    { id: 1, prefix: 'EC' }, // 电商网站
    { id: 2, prefix: 'CO' }, // 企业官网
    { id: 3, prefix: 'PE' }, // 个人网站
    { id: 4, prefix: 'AP' }  // 应用系统
  ];

  return videos.value.map(video => {
    const typePrefix = productTypes.find(t => t.id === video.typeId)?.prefix || 'XX';
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return {
      ...video,
      productCode: `${typePrefix}${randomNum}`,
      price: video.originalPrice * 0.8 // 8折
    };
  });
});

// Filter videos based on filter and search query
const filteredVideos = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  let filtered = processedVideos.value;
  
  // 首先按照筛选器过滤
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(video => {
      if (activeFilter.value === 'sellable') {
        return video.isSellable;
      } else if (activeFilter.value === 'not-sellable') {
        return !video.isSellable;
      }
      return true;
    });
  }
  
  // 然后按照搜索关键词过滤
  if (query) {
    filtered = filtered.filter(video => {
      return video.title.toLowerCase().includes(query) ||
             video.description.toLowerCase().includes(query) ||
             video.tech.some(tech => tech.toLowerCase().includes(query)) ||
             video.productCode.toLowerCase().includes(query);
    });
  }
  
  return filtered;
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
      <h2 class="section-title" style="font-size: 2.5rem; text-align: left; margin-bottom: 0.5rem; color: #3b82f6; font-weight: 700; padding: 0 2rem; width: 100%;">作品展示</h2>
      <p class="section-description" style="text-align: left; max-width: none; margin: 0 0 3rem; color: #64748b; font-size: 1.1rem; padding: 0 2rem; width: 100%;">
        浏览我们的部分网页设计作品集，部分是仅供展示，部分是可出售的。
      </p>

      <!-- 搜索栏 -->
      <div class="search-container">
        <div class="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="搜索作品标题、描述或技术栈..."
            class="search-input"
          />
        </div>
      </div>

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
            <h3 style="margin-bottom: 0.5rem; color: #3b82f6; font-size: 1.3rem; font-weight: 600;">{{ video.title }}</h3>
            <p style="margin: 0 0 1.5rem; color: #64748b; font-size: 0.95rem; line-height: 1.6;">{{ video.description }}</p>

            <!-- 技术选型标签 -->
            <div class="tech-tags">
              <span v-for="(tech, index) in video.tech" :key="index" class="tech-tag" style="display: inline-block; background: rgba(59, 130, 246, 0.1); color: #3b82f6; padding: 0.3rem 0.8rem; border-radius: 4px; font-size: 0.8rem; font-weight: 500; border: 1px solid rgba(59, 130, 246, 0.2);">{{ tech }}</span>
            </div>

            <!-- 商品码和价格信息 -->
            <div class="product-info">
              <div class="product-code-container">
                <span class="product-code-label" style="color: #64748b; font-size: 0.9rem;">商品码:</span>
                <span class="product-code" style="font-family: monospace; font-weight: 600; background: rgba(59, 130, 246, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px; color: #3b82f6;">{{ video.productCode }}</span>
                <button class="copy-btn" @click.stop="copyProductCode(video.productCode, $event)" title="复制商品码" style="background: none; border: none; cursor: pointer; color: #64748b; padding: 0.2rem; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: all 0.2s ease;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>

              <div class="price-container">
                <span v-if="video.isSellable" class="original-price" style="color: #94a3b8; text-decoration: line-through; font-size: 0.9rem;">原价: ￥{{ video.originalPrice }}</span>
                <span v-if="video.isSellable" class="current-price" style="color: #f43f5e; font-size: 1.4rem; font-weight: 700;">￥{{ video.price }}</span>
                <span v-else class="not-for-sale" style="color: #ef4444; font-size: 1rem; font-weight: 700; background-color: rgba(254, 226, 226, 0.8); padding: 0.4rem 0.8rem; border-radius: 4px; border: 1.5px dashed #dc2626; display: inline-block; letter-spacing: 1px; transform: rotate(-5deg); position: relative; text-transform: uppercase; text-align: center; box-shadow: 0 1px 3px rgba(239, 68, 68, 0.3); transition: all 0.3s ease;">禁止出售</span>
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
              <h3 style="font-size: 1.5rem; font-weight: 600; color: #3b82f6; margin: 0;">{{ activeVideo.title }}</h3>
              <div class="modal-product-code">
                <span style="color: #64748b; font-size: 0.9rem;">商品码: {{ activeVideo.productCode }}</span>
                <button class="copy-btn modal-copy-btn" @click="copyProductCode(activeVideo.productCode, $event)" title="复制商品码" style="background: none; border: none; cursor: pointer; color: #64748b; padding: 0.2rem; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: all 0.2s ease;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="modal-price-container">
              <span v-if="activeVideo.isSellable" class="modal-original-price" style="color: #94a3b8; text-decoration: line-through; font-size: 0.9rem;">原价: ￥{{ activeVideo.originalPrice }}</span>
              <span v-if="activeVideo.isSellable" class="modal-current-price" style="color: #f43f5e; font-size: 1.4rem; font-weight: 700;">￥{{ activeVideo.price }}</span>
              <span v-else class="modal-not-for-sale" style="color: #ef4444; font-size: 1rem; font-weight: 700; background-color: rgba(254, 226, 226, 0.8); padding: 0.4rem 0.8rem; border-radius: 4px; border: 1.5px dashed #dc2626; display: inline-block; letter-spacing: 1px; transform: rotate(-5deg); position: relative; text-transform: uppercase; text-align: center; box-shadow: 0 1px 3px rgba(239, 68, 68, 0.3); transition: all 0.3s ease;">禁止出售</span>
            </div>
          </div>
          <video controls :src="activeVideo.videoUrl" class="modal-video"></video>
          <p>{{ activeVideo.description }}</p>

          <!-- 技术选型标签 -->
          <div class="modal-tech-tags">
            <h4>技术选型</h4>
            <div class="tech-tags">
              <span v-for="(tech, index) in activeVideo.tech" :key="index" class="tech-tag modal-tech-tag" style="display: inline-block; background: rgba(59, 130, 246, 0.1); color: #3b82f6; padding: 0.3rem 0.8rem; border-radius: 4px; font-size: 0.8rem; font-weight: 500; border: 1px solid rgba(59, 130, 246, 0.2);">{{ tech }}</span>
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
  color: #3b82f6;
  font-weight: 700;
  padding: 0 2rem;
  width: 100%;
}

.section-description {
  text-align: left;
  max-width: none;
  margin: 0 0 3rem;
  color: #64748b;
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
  color: #3b82f6;
  font-size: 1.3rem;
  font-weight: 600;
}

.video-info p {
  margin: 0 0 1.5rem;
  color: #64748b;
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
  color: #3b82f6;
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
  color: #64748b;
  font-size: 0.9rem;
}

.product-code {
  font-family: monospace;
  font-weight: 600;
  background: rgba(59, 130, 246, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: #3b82f6;
}

.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

/* 价格容器 */
.price-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.original-price {
  color: #94a3b8;
  text-decoration: line-through;
  font-size: 0.9rem;
}

.current-price {
  color: #f43f5e;
  font-size: 1.4rem;
  font-weight: 700;
}

.not-for-sale {
  color: #ef4444;
  font-size: 1rem;
  font-weight: 700;
  background-color: rgba(254, 226, 226, 0.8);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  border: 1.5px dashed #dc2626;
  display: inline-block;
  letter-spacing: 1px;
  transform: rotate(-5deg);
  position: relative;
  text-transform: uppercase;
  text-align: center;
  box-shadow: 0 1px 3px rgba(239, 68, 68, 0.3);
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
  transform: rotate(-7deg) scale(1.05);
  box-shadow: 0 2px 5px rgba(185, 28, 28, 0.3);
}

/* 深色模式下的样式 */
.dark .not-for-sale {
  color: #fca5a5;
  background-color: rgba(127, 29, 29, 0.7);
  border-color: #ef4444;
  box-shadow: 0 1px 3px rgba(239, 68, 68, 0.3);
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.video-modal.show {
  opacity: 1;
  visibility: visible;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  background: var(--modal-bg);
  border-radius: 16px;
  padding: 2rem;
  z-index: 1001;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.modal-header {
  margin-bottom: 1.5rem;
}

.modal-title-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-right: 2rem;
}

.modal-title-container h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #3b82f6;
  margin: 0;
  flex: 1;
}

.modal-product-code {
  color: #64748b;
  font-size: 0.9rem;
}

.dark .modal-title-container h3 {
  color: #60a5fa;
}

.dark .modal-product-code {
  color: #94a3b8;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    padding: 1.5rem;
    margin: 1rem;
  }

  .modal-title-container {
    flex-direction: column;
    gap: 0.8rem;
  }

  .modal-title-container h3 {
    font-size: 1.3rem;
  }

  .modal-product-code {
    font-size: 0.85rem;
  }

  .close-button {
    top: 0.8rem;
    right: 0.8rem;
    width: 2rem;
    height: 2rem;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 1rem;
    margin: 0.5rem;
  }

  .modal-title-container h3 {
    font-size: 1.2rem;
  }

  .modal-product-code {
    font-size: 0.8rem;
  }
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

/* 搜索栏样式 */
.search-container {
  width: 100%;
  padding: 0 2rem;
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  background: var(--card-bg);
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.search-box:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px -1px rgba(59, 130, 246, 0.2);
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: var(--text-color);
  outline: none;
}

.search-input::placeholder {
  color: #94a3b8;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #94a3b8;
}

/* 深色模式适配 */
.dark .search-box {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .search-box:focus-within {
  border-color: #60a5fa;
}

.dark .search-input::placeholder {
  color: #64748b;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .search-container {
    padding: 0 1rem;
  }

  .search-box {
    border-radius: 8px;
  }

  .search-input {
    padding: 0.8rem 0.8rem 0.8rem 2.5rem;
    font-size: 0.95rem;
  }

  .search-icon {
    left: 0.8rem;
    width: 1.1rem;
    height: 1.1rem;
  }
}

@media (max-width: 480px) {
  .search-container {
    padding: 0 0.8rem;
  }

  .search-input {
    padding: 0.7rem 0.7rem 0.7rem 2.2rem;
    font-size: 0.9rem;
  }

  .search-icon {
    left: 0.7rem;
    width: 1rem;
    height: 1rem;
  }
}
</style>
