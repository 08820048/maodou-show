<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const containerRef = ref(null);
const scene = ref(null);
const camera = ref(null);
const renderer = ref(null);
const controls = ref(null);
const raycaster = ref(new THREE.Raycaster());
const mouse = ref(new THREE.Vector2());
const selectedReview = ref(null);
const isModalOpen = ref(false);

// 好评截图数据
const reviews = [
  // 您可以根据需要修改这些配置
  // id: 唯一标识符
  // image: 图片路径（相对于public目录）
  // position: 在3D空间中的位置 [x, y, z]
  // rotation: 在3D空间中的旋转角度 [x, y, z]
  // scale: 图片的缩放比例

  // 示例配置：
  { id: 1, image: '/reviews/8.jpg', position: [-1.2, 0.5, 0.5], rotation: [0.1, -0.3, 0.1], scale: 1 },
  { id: 2, image: '/reviews/7.jpg', position: [1.3, -0.2, -0.5], rotation: [-0.1, 0.2, -0.1], scale: 0.9 },
  { id: 3, image: '/reviews/6.jpg', position: [0.1, 0.8, -1.2], rotation: [0.2, 0.1, 0], scale: 1.1 },
  { id: 4, image: '/reviews/1.jpg', position: [-0.8, -0.5, -0.8], rotation: [-0.2, -0.2, 0.1], scale: 0.8 },
  { id: 5, image: '/reviews/5.png', position: [0.7, 0.3, 1.0], rotation: [0.1, 0.4, -0.1], scale: 1 },
  { id: 6, image: '/reviews/4.png', position: [-0.3, -0.7, 0.2], rotation: [-0.1, -0.5, 0.2], scale: 0.9 },

  // 添加更多好评截图...
  // { id: 7, image: '/reviews/your-new-review.jpg', position: [0.5, -0.3, 0.7], rotation: [0.1, 0.2, -0.1], scale: 1 },
];

// 创建场景
const initScene = () => {
  // 创建场景
  scene.value = new THREE.Scene();
  scene.value.background = new THREE.Color(0xf1f5f9); // 浅色背景

  // 创建相机
  camera.value = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.value.position.z = 3;

  // 创建渲染器
  renderer.value = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.value.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight);
  renderer.value.setPixelRatio(window.devicePixelRatio);
  containerRef.value.appendChild(renderer.value.domElement);

  // 添加轨道控制
  controls.value = new OrbitControls(camera.value, renderer.value.domElement);
  controls.value.enableDamping = true;
  controls.value.dampingFactor = 0.05;
  controls.value.screenSpacePanning = false;
  controls.value.minDistance = 2;
  controls.value.maxDistance = 5;
  controls.value.maxPolarAngle = Math.PI / 1.5;
  controls.value.autoRotate = true;
  controls.value.autoRotateSpeed = 0.5;

  // 添加灯光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.value.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.value.add(directionalLight);

  // 加载好评截图
  loadReviews();

  // 添加事件监听
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('click', onClick);

  // 开始动画循环
  animate();
};

// 加载好评截图
const loadReviews = () => {
  const textureLoader = new THREE.TextureLoader();

  // 使用占位图作为纹理
  const placeholderTexture = textureLoader.load('/placeholder.jpg', () => {
    render();
  });

  // 为每个好评创建一个平面
  reviews.forEach((review) => {
    // 创建纹理
    const texture = textureLoader.load(review.image, () => {
      render();
    }, undefined, () => {
      // 如果加载失败，使用占位图
      console.log(`Failed to load texture for review ${review.id}, using placeholder`);
    });

    // 创建材质
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });

    // 创建几何体 (16:9 比例)
    const geometry = new THREE.PlaneGeometry(1.6 * review.scale, 0.9 * review.scale);

    // 创建网格
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...review.position);
    mesh.rotation.set(...review.rotation);
    mesh.userData = { reviewId: review.id };

    // 添加到场景
    scene.value.add(mesh);
  });
};

// 窗口大小调整
const onWindowResize = () => {
  if (!camera.value || !renderer.value || !containerRef.value) return;

  camera.value.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight;
  camera.value.updateProjectionMatrix();
  renderer.value.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight);
  render();
};

// 点击事件
const onClick = (event) => {
  if (!camera.value || !scene.value || !containerRef.value) return;

  // 计算鼠标位置
  const rect = containerRef.value.getBoundingClientRect();
  mouse.value.x = ((event.clientX - rect.left) / containerRef.value.clientWidth) * 2 - 1;
  mouse.value.y = -((event.clientY - rect.top) / containerRef.value.clientHeight) * 2 + 1;

  // 射线检测
  raycaster.value.setFromCamera(mouse.value, camera.value);
  const intersects = raycaster.value.intersectObjects(scene.value.children);

  if (intersects.length > 0) {
    const object = intersects[0].object;
    if (object.userData && object.userData.reviewId) {
      const review = reviews.find(r => r.id === object.userData.reviewId);
      if (review) {
        selectedReview.value = review;
        isModalOpen.value = true;
      }
    }
  }
};

// 渲染场景
const render = () => {
  if (!renderer.value || !scene.value || !camera.value) return;
  renderer.value.render(scene.value, camera.value);
};

// 动画循环
const animate = () => {
  if (!controls.value) return;

  requestAnimationFrame(animate);
  controls.value.update();
  render();
};

// 关闭模态框
const closeModal = () => {
  isModalOpen.value = false;
  setTimeout(() => {
    selectedReview.value = null;
  }, 300);
};

// 组件挂载时初始化场景
onMounted(() => {
  if (containerRef.value) {
    initScene();
  }
});

// 组件卸载前清理资源
onBeforeUnmount(() => {
  if (renderer.value && renderer.value.domElement) {
    containerRef.value?.removeChild(renderer.value.domElement);
  }

  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('click', onClick);

  // 释放资源
  if (scene.value) {
    scene.value.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (object.material.map) object.material.map.dispose();
        object.material.dispose();
      }
    });
  }

  if (renderer.value) {
    renderer.value.dispose();
  }
});

// 检测深色模式变化
const updateBackgroundColor = (isDarkMode) => {
  if (scene.value) {
    scene.value.background = new THREE.Color(isDarkMode ? 0x0f172a : 0xf1f5f9);
    render();
  }
};

// 监听深色模式变化
const checkDarkMode = () => {
  const isDarkMode = document.body.classList.contains('dark-mode');
  updateBackgroundColor(isDarkMode);
};

// 设置定时器检查深色模式变化
let darkModeInterval;
onMounted(() => {
  checkDarkMode();
  darkModeInterval = setInterval(checkDarkMode, 1000);
});

onBeforeUnmount(() => {
  clearInterval(darkModeInterval);
});
</script>

<template>
  <section id="testimonials" class="reviews-gallery">
    <div class="container">
      <h2 class="section-title">客户好评</h2>
      <p class="section-description">
        浏览我们客户的真实好评截图，感受用户对我们服务的满意度
      </p>

      <div class="gallery-container" ref="containerRef"></div>

      <div class="gallery-instructions">
        <p>拖动可旋转视图 · 滚轮可缩放 · 点击截图可查看大图</p>
      </div>
    </div>

    <!-- 好评截图模态框 -->
    <div class="review-modal" v-if="selectedReview" :class="{ 'show': isModalOpen }">
      <div class="modal-overlay" @click="closeModal"></div>
      <div class="modal-content">
        <button class="close-button" @click="closeModal">×</button>
        <div class="review-image-container">
          <img :src="selectedReview.image" :alt="`客户好评 ${selectedReview.id}`" class="review-image">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews-gallery {
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

.gallery-container {
  width: 100%;
  height: 600px;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: var(--box-shadow);
}

.gallery-instructions {
  text-align: center;
  margin-top: 1.5rem;
  color: var(--text-light);
  font-size: 0.9rem;
  font-style: italic;
}

/* 模态框样式 */
.review-modal {
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

.review-modal.show {
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

.review-modal.show .modal-content {
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

.review-image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.review-image {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
}

@media (max-width: 768px) {
  .gallery-container {
    height: 400px;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
