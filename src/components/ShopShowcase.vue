<script setup>
import { ref } from 'vue';
import shopsConfig from '../config/shops';

// 当前选中的店铺
const activeShop = ref(null);

// 处理店铺点击
const handleShopClick = (shop) => {
  if (!shop.enabled) return;
  activeShop.value = shop;
  // 延迟跳转，让用户看到点击效果
  setTimeout(() => {
    window.open(shop.url, '_blank');
  }, 300);
};
</script>

<template>
  <section id="shops" class="shops-section">
    <div class="container">
      <h2 class="section-title">下单店铺</h2>
      <p class="section-description">
        选择您喜欢的店铺进行下单，我们将为您提供专业的网页设计服务，更多下单方式正在陆续上架中。
      </p>

      <!-- 店铺展示区域 -->
      <div class="shops-showcase">
        <div
          v-for="shop in shopsConfig.shops"
          :key="shop.id"
          class="shop-item"
          :class="{ active: activeShop === shop }"
          :style="{ '--shop-color': shop.color }"
          @click="handleShopClick(shop)"
        >
          <div class="shop-icon">{{ shop.icon }}</div>
          <div class="shop-info">
            <h3>
              {{ shop.name }}
              <span v-if="!shop.enabled" class="status-badge">建设中</span>
            </h3>
            <p>{{ shop.description }}</p>
          </div>
          <div class="shop-arrow" v-if="shop.enabled">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.shops-section {
  padding: 5rem 0;
  background-color: var(--card-bg);
  width: 100vw;
  max-width: 100vw;
  margin: 0;
}

.container {
  width: 100%;
  max-width: 100%;
  padding: 0 2rem;
}

.section-title {
  font-size: 2.5rem;
  text-align: left;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 700;
}

.section-description {
  text-align: left;
  max-width: none;
  margin: 0 0 3rem;
  color: var(--text-light);
  font-size: 1.1rem;
}

/* 店铺展示区域样式 */
.shops-showcase {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  transform: rotate(-2deg);
}

/* 店铺项样式 */
.shop-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: var(--card-bg);
  border-radius: 16px;
  border: 2px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  transform: rotate(2deg);
}

.shop-item:nth-child(odd) {
  transform: rotate(-2deg);
}

.shop-item:nth-child(3n) {
  transform: rotate(4deg);
}

.shop-item:nth-child(4n) {
  transform: rotate(-4deg);
}

.shop-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--shop-color), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.shop-item:hover::before,
.shop-item.active::before {
  opacity: 0.1;
}

.shop-item:hover {
  transform: rotate(0deg) scale(1.05);
  border-color: var(--shop-color);
  z-index: 1;
}

.shop-item.active {
  transform: rotate(0deg) scale(1.05);
  border-color: var(--shop-color);
  z-index: 1;
}

/* 店铺图标样式 */
.shop-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--shop-color);
  color: white;
  border-radius: 12px;
  flex-shrink: 0;
}

/* 店铺信息样式 */
.shop-info {
  flex: 1;
}

.shop-info h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.shop-info p {
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.5;
}

/* 箭头样式 */
.shop-arrow {
  color: var(--shop-color);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.shop-item:hover .shop-arrow,
.shop-item.active .shop-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* 响应式样式 */
@media (max-width: 1200px) {
  .shops-showcase {
    grid-template-columns: 1fr;
    max-width: 600px;
  }
}

@media (max-width: 768px) {
  .shops-showcase {
    padding: 1rem;
  }

  .shop-item {
    padding: 1rem;
    gap: 1rem;
  }

  .shop-icon {
    font-size: 2rem;
    width: 50px;
    height: 50px;
  }

  .shop-info h3 {
    font-size: 1.1rem;
  }

  .shop-info p {
    font-size: 0.9rem;
  }
}

/* 状态标签样式 */
.status-badge {
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  background-color: #f3f4f6;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-left: 0.5rem;
  vertical-align: middle;
}

/* 未启用店铺样式 */
.shop-item:not(.enabled) {
  opacity: 0.8;
  cursor: not-allowed;
}

.shop-item:not(.enabled):hover {
  transform: none;
  border-color: var(--border-color);
}

.shop-item:not(.enabled)::before {
  display: none;
}
</style> 