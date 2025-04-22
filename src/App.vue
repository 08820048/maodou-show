<script setup>
import VideoShowcase from './components/VideoShowcase.vue'
import StackedReviews from './components/StackedReviews.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import ShopShowcase from './components/ShopShowcase.vue'
</script>

<template>
  <div class="app-container" style="width: 100vw; max-width: 100vw; margin: 0; padding: 0; overflow-x: hidden; background-color: var(--bg-color);">
    <nav class="navbar" style="background-color: var(--navbar-bg); box-shadow: var(--navbar-shadow);">
      <div class="container" style="width: 100%; max-width: 100%; padding: 0 2rem;">
        <div class="logo">@春城率直<span>的毛豆</span></div>
        <div class="nav-links">
          <a href="#showcase">作品展示</a>
          <a href="#testimonials">客户评价</a>
          <a href="#shops" class="contact-btn">下单店铺</a>
          <ThemeToggle />
        </div>
      </div>
    </nav>

    <header class="site-header" style="width: 100vw; max-width: 100vw; margin: 0; padding: 11rem 0 7rem; background: var(--header-bg);">
      <div class="container" style="width: 100%; max-width: 100%; padding: 0 2rem;">
        <div class="header-content" style="text-align: left;">
          <h1 class="site-title">专业网页设计<br><span>打造完美在线形象</span></h1>
          <p class="site-description">我们提供高质量的网页设计服务，帮助企业和个人在数字世界中脱颖而出</p>
          <div class="header-buttons" style="justify-content: flex-start;">
            <a href="#showcase" class="btn btn-primary">查看作品</a>
            <a href="#shops" class="btn btn-outline">下单店铺</a>
          </div>
        </div>
        <div class="header-image">
          <div class="image-container">
            <div class="floating-element e1"></div>
            <div class="floating-element e2"></div>
            <div class="floating-element e3"></div>
          </div>
        </div>
      </div>
    </header>

    <main style="width: 100%; max-width: 100%;">
      <section id="showcase">
        <VideoShowcase />
      </section>

      <section id="testimonials">
        <StackedReviews />
      </section>

      <ShopShowcase />
    </main>

    <footer class="site-footer footer" style="width: 100vw; max-width: 100vw; margin: 0; padding: 3rem 0 2rem;">
      <div class="container" style="width: 100%; max-width: 100%; padding: 0 2rem;">
        <div class="footer-content" style="display: flex; flex-direction: column; margin-bottom: 2rem; width: 100%; align-items: center;">

          <div style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 400px;">
            <div class="footer-qrcode" style="text-align: center; margin-bottom: 2rem;">
              <h3 style="margin-bottom: 1rem; color: var(--footer-text); font-size: 1.2rem;">公众号</h3>
              <div class="qrcode-container">
                <img src="@/assets/code.jpg" alt="公众号二维码" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
              <p style="margin-top: 0.5rem; color: var(--footer-text-light); font-size: 0.9rem;">扫码关注公众号</p>
            </div>

            <div class="footer-blog" style="text-align: center;">
              <a href="https://www.ilikexff.cn/" target="_blank" class="blog-link">
                <span style="color: var(--footer-text); font-weight: 500;">个人博客：</span>www.ilikexff.cn
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom" style="border-top: 1px solid var(--border-color); padding: 1.5rem 2rem 0; text-align: center; color: var(--footer-text-light); width: 100%;">
          <p>&copy; 2025 @春城率直的毛豆. 保留所有权利.</p>
          <div class="disclaimer" style="margin-top: 1rem; font-size: 0.85rem; line-height: 1.5;">
            <p>打上[不可出售]标签的为本站仅仅做展示用途，若有侵权或不愿公开展示，请联系管理员删除</p>
            <p style="margin-top: 0.5rem;">
              <span style="display: inline-flex; align-items: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                QQ联系: 2217021563
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.blog-link {
  color: var(--primary-light);
  font-size: 1.1rem;
  display: inline-block;
  padding: 0.7rem 1.5rem;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: var(--box-shadow);
  text-decoration: none;
}

.dark .blog-link {
  background-color: rgba(96, 165, 250, 0.1);
}

.blog-link:hover {
  background-color: rgba(59, 130, 246, 0.2);
  transform: translateY(-3px);
}

.dark .blog-link:hover {
  background-color: rgba(96, 165, 250, 0.2);
}

.qrcode-container {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  border: 4px solid var(--border-color);
  background-color: white;
}
:root {
  --primary-color: #3b82f6;
  --primary-light: #60a5fa;
  --primary-dark: #2563eb;
  --secondary-color: #06b6d4;
  --accent-color: #f59e0b;
  --text-color: #334155;
  --text-light: #64748b;
  --light-bg: #f1f5f9;
  --dark-bg: #1e293b;
  --border-color: #e2e8f0;
  --success-color: #10b981;
  --error-color: #ef4444;
  --box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

html, body {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

body {
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  color: var(--text-color);
  line-height: 1.6;
  background-color: var(--light-bg);
  overflow-x: hidden;
}

a {
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

ul {
  list-style: none;
}

.container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
}

/* Navbar Styles */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.2rem 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  flex-direction: row;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.logo span {
  color: var(--secondary-color);
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  font-weight: 500;
  color: var(--text-color);
  position: relative;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.contact-btn {
  background-color: var(--primary-color);
  color: white !important;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Header Styles */
.site-header {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: white;
  padding: 11rem 0 7rem;
  margin-top: 0;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
}

.site-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjNDMzOENBIiBkPSJNMCAwaDEyMDB2NjAwSDB6Ii8+PHBhdGggZD0iTTAgMGw4MDAgNjAwTDAgNjAwVjB6IiBmaWxsPSIjM0I4MkY2IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+');
  background-size: cover;
  opacity: 0.1;
}

.header-content {
  max-width: 600px;
  position: relative;
  z-index: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.site-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  flex-direction: row;
  gap: 2rem;
  padding: 0 2rem;
}

.site-title {
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-weight: 800;
}

.site-title span {
  color: var(--accent-color);
  display: block;
}

.site-description {
  font-size: 1.2rem;
  max-width: 500px;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.header-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
}

.btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--accent-color);
  color: white;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.btn-primary:hover {
  background-color: #ea580c;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
}

.btn-outline {
  border: 2px solid white;
  color: white;
}

.btn-outline:hover {
  background-color: white;
  color: var(--primary-color);
  transform: translateY(-2px);
}

.header-image {
  position: relative;
  width: 500px;
  height: 400px;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.floating-element {
  position: absolute;
  border-radius: 16px;
  box-shadow: var(--box-shadow);
  animation: float 6s ease-in-out infinite;
}

.e1 {
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  top: 50px;
  left: 50px;
  animation-delay: 0s;
}

.e2 {
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  bottom: 50px;
  right: 100px;
  animation-delay: 1s;
}

.e3 {
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  bottom: 150px;
  left: 150px;
  animation-delay: 2s;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

/* Section Styles */
section {
  padding: 5rem 0;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 100%;
}

.section-title {
  font-size: 2.5rem;
  text-align: left;
  margin-bottom: 1rem;
  color: var(--text-color);
  font-weight: 700;
  width: 100%;
  padding: 0 2rem;
}

.section-description {
  text-align: left;
  max-width: none;
  margin: 0 0 3rem;
  color: var(--text-light);
  font-size: 1.1rem;
  width: 100%;
  padding: 0 2rem;
}

/* Footer Styles */
.site-footer {
  background-color: var(--dark-bg);
  color: white;
  padding: 4rem 0 2rem;
  margin-top: 0;
  width: 100%;
  max-width: 100%;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  margin-bottom: 3rem;
  width: 100%;
  justify-content: flex-start;
  padding: 0 2rem;
}

.footer-logo {
  flex: 0 0 25%;
}

.footer-logo p {
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  flex: 0 0 65%;
}

.link-group {
  flex: 0 0 calc(33.333% - 1.33rem);
}

.link-group h3 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: white;
}

.link-group ul li {
  margin-bottom: 0.8rem;
}

.link-group ul li a {
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
}

.link-group ul li a:hover {
  color: white;
  padding-left: 5px;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 2rem 0;
  text-align: left;
  color: rgba(255, 255, 255, 0.7);
  width: 100%;
}

/* 声明和QQ号样式 */
.disclaimer {
  border-top: 1px dashed var(--border-color);
  padding-top: 1rem;
  margin-top: 1rem;
  color: var(--footer-text-light);
}

.disclaimer p {
  max-width: 600px;
  margin: 0 auto;
}

.disclaimer svg {
  color: #12b7f5; /* QQ蓝色 */
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .site-header .container {
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
  }

  .header-content {
    max-width: 100%;
    margin-bottom: 3rem;
    align-items: flex-start;
  }

  .header-buttons {
    justify-content: flex-start;
  }

  .footer-logo {
    flex: 0 0 100%;
    margin-bottom: 2rem;
  }

  .footer-links {
    flex: 0 0 100%;
  }

  .link-group {
    flex: 0 0 calc(50% - 1rem);
  }
}

@media (max-width: 768px) {
  .site-title {
    font-size: 2.5rem;
  }

  .site-description {
    font-size: 1rem;
  }

  .nav-links {
    display: none;
  }

  .link-group {
    flex: 0 0 100%;
  }

  .header-image {
    width: 100%;
    height: 300px;
  }
}
</style>
