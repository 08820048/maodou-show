<script setup>
import { ref } from 'vue';

// Sample testimonial data - in a real application, this might come from an API or CMS
const testimonials = ref([
  {
    id: 1,
    clientName: '张先生',
    company: '优品电商',
    content: '非常满意这次的网站设计服务！团队专业且高效，他们不仅理解了我们的需求，还提供了许多创新的解决方案。网站上线后，我们的转化率提高了30%。',
    image: '/testimonials/testimonial1.jpg',
    rating: 5,
    project: '电商平台设计'
  },
  {
    id: 2,
    clientName: '李女士',
    company: '未来教育',
    content: '我们的教育平台需要一个直观且吸引人的界面，他们完美地实现了这一点。学生和教师都反馈说新平台使用起来非常方便，注册率比预期高出50%。',
    image: '/testimonials/testimonial2.jpg',
    rating: 5,
    project: '教育网站设计'
  },
  {
    id: 3,
    clientName: '王总',
    company: '环球企业',
    content: '作为一家国际企业，我们需要一个能够反映我们专业形象的网站。设计团队交付的成果超出了我们的期望，网站现在成为了我们品牌形象的重要组成部分。',
    image: '/testimonials/testimonial3.jpg',
    rating: 4,
    project: '企业官网设计'
  },
  {
    id: 4,
    clientName: '陈经理',
    company: '美味餐厅',
    content: '我们餐厅的在线预订系统设计得非常出色，界面简洁明了，客户使用体验极佳。上线后，在线预订量增加了40%，大大提高了我们的运营效率。',
    image: '/testimonials/testimonial4.jpg',
    rating: 5,
    project: '餐饮网站设计'
  },
  {
    id: 5,
    clientName: '赵女士',
    company: '时尚精品',
    content: '我们的时尚品牌需要一个能够展示产品的精美网站，设计团队完美地捕捉到了我们的品牌精神。网站上线后，我们收到了大量积极反馈，销售额也有显著提升。',
    image: '/testimonials/testimonial5.jpg',
    rating: 5,
    project: '时尚网站设计'
  },
  {
    id: 6,
    clientName: '刘先生',
    company: '健康生活',
    content: '我们的健康产品网站需要传达信任和专业性，设计团队做得非常出色。清晰的导航和信息架构使用户能够轻松找到他们需要的信息，大大提高了用户体验。',
    image: '/testimonials/testimonial6.jpg',
    rating: 4,
    project: '健康网站设计'
  }
]);

// Function to generate star rating display
const generateStars = (rating) => {
  return Array(5).fill(0).map((_, index) => index < rating);
};
</script>

<template>
  <section id="testimonials" class="testimonial-showcase" style="width: 100vw; max-width: 100vw; margin: 0; padding: 5rem 0; background-color: var(--card-bg);">
    <div class="container" style="width: 100%; max-width: 100%; padding: 0 2rem;">
      <h2 class="section-title">客户好评</h2>
      <p class="section-description">
        我们的客户对我们的设计服务非常满意，以下是他们的真实反馈
      </p>

      <div class="testimonial-grid" style="display: flex; flex-wrap: wrap; gap: 2.5rem; width: 100%; padding: 0 2rem; justify-content: flex-start;">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="testimonial-item"
          style="flex: 0 0 calc(33.333% - 1.67rem); margin-bottom: 1rem; border-radius: 16px; overflow: hidden; box-shadow: var(--box-shadow); transition: transform 0.3s ease, box-shadow 0.3s ease; padding: 1.8rem; display: flex; flex-direction: column; border: 1px solid var(--border-color); background-color: var(--card-bg);"
        >
          <div class="testimonial-header">
            <div class="client-image">
              <div class="placeholder-avatar">{{ testimonial.clientName.charAt(0) }}</div>
            </div>
            <div class="client-info">
              <h3>{{ testimonial.clientName }}</h3>
              <p class="company">{{ testimonial.company }}</p>
              <div class="rating">
                <span
                  v-for="(isFilled, index) in generateStars(testimonial.rating)"
                  :key="index"
                  class="star"
                  :class="{ 'filled': isFilled }"
                >
                  ★
                </span>
              </div>
            </div>
          </div>
          <div class="testimonial-content">
            <p>"{{ testimonial.content }}"</p>
          </div>
          <div class="testimonial-footer">
            <span class="project-tag">{{ testimonial.project }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-showcase {
  padding: 5rem 0;
  background-color: white;
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

.testimonial-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin: 0 auto;
  padding: 0.5rem 2rem;
  width: 100%;
  justify-content: flex-start;
}

.testimonial-item {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(226, 232, 240, 0.7);
  flex: 0 0 calc(33.333% - 1.67rem);
  margin-bottom: 1rem;
}

@media (max-width: 1200px) {
  .testimonial-item {
    flex: 0 0 calc(50% - 1.25rem);
  }
}

@media (max-width: 768px) {
  .testimonial-item {
    flex: 0 0 100%;
  }
}

.testimonial-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.testimonial-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.client-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  border: 3px solid var(--primary-color);
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
}

.client-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-avatar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  background: var(--placeholder-bg);
}

.client-info {
  flex: 1;
}

.client-info h3 {
  margin: 0 0 0.2rem;
  color: var(--text-color);
  font-weight: 600;
}

.company {
  margin: 0 0 0.5rem;
  color: var(--text-light);
  font-size: 0.9rem;
}

.rating {
  display: flex;
}

.star {
  color: #ddd;
  font-size: 1.2rem;
  margin-right: 0.2rem;
}

.star.filled {
  color: var(--accent-color);
}

.testimonial-content {
  flex: 1;
  margin-bottom: 1.5rem;
}

.testimonial-content p {
  margin: 0;
  color: var(--text-color);
  line-height: 1.6;
  font-style: italic;
  font-size: 0.95rem;
}

.testimonial-footer {
  display: flex;
  justify-content: flex-end;
}

.project-tag {
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary-color);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(59, 130, 246, 0.1);
}

@media (max-width: 768px) {
  .testimonial-grid {
    grid-template-columns: 1fr;
  }
}
</style>
