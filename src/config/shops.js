// 店铺配置
// 您可以在这里配置所有店铺信息
// 每个店铺对象包含以下属性：
// - id: 唯一标识符
// - name: 店铺名称
// - description: 店铺描述
// - url: 店铺链接
// - icon: 店铺图标（可以使用 emoji 或图片路径）
// - color: 店铺主题色（支持任何有效的 CSS 颜色值）
// - enabled: 是否启用（true: 可点击跳转，false: 建设中）

export default {
  // 店铺列表
  shops: [
    {
      id: 1,
      name: '闲鱼官方店铺',
      description: '提供各类网页设计服务，价格实惠，服务周到',
      url: 'https://www.goofish.com/personal',
      icon: '🛍️',
      color: '#ef4444',
      enabled: true
    },
    {
      id: 2,
      name: '毛豆小店',
      description: '专业的企业网站定制服务，响应式设计，一站式解决方案',
      url: 'https://shop.example.com/jd',
      icon: '🏢',
      color: '#f59e0b',
      enabled: false
    },
    {
      id: 3,
      name: '小程序店铺',
      description: '专业的企业网站定制服务，响应式设计，一站式解决方案',
      url: 'https://shop.example.com/jd',
      icon: '📱',
      color: '#3b82f6',
      enabled: false
    }
  ],

  // 店铺分类
  categories: [
    { id: 'all', name: '全部店铺' },
    { id: '电商', name: '电商平台' },
    { id: '企业', name: '企业服务' },
    { id: '高端', name: '高端定制' },
    { id: '小程序', name: '小程序开发' }
  ],

  // 展示配置
  displayConfig: {
    // 3D 场景配置
    scene: {
      perspective: 1000,
      rotateSpeed: 0.5,
      hoverScale: 1.1,
      transitionDuration: 0.5
    },
    // 动画配置
    animation: {
      duration: 0.3,
      easing: 'ease-in-out'
    },
    // 响应式断点
    breakpoints: {
      desktop: 1200,
      tablet: 768,
      mobile: 480
    }
  }
}; 