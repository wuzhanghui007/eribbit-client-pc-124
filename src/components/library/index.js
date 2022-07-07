
/* import XtxSkeleton from './xtx-skeleton.vue'
import xtxCarousel from './xtx-carousel.vue'
import xtxMore from './xtx-more.vue'
import xtxBread from './xtx-bread.vue'
import xtxBreadItem from './xtx-bread-item.vue' */

// require(目录，是否加载子目录，匹配加载的文件[正则匹配])
import defaultImg from '@/assets/images/200.png'
const importFn = require.context('./', false, /\.vue$/)

export default {
  install (app) {
    // 自定义组件
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(xtxCarousel.name, xtxCarousel)
    // app.component(xtxMore.name, xtxMore)
    // app.component(xtxBread.name, xtxBread)
    // app.component(xtxBreadItem.name, xtxBreadItem)

    // 属性 keys() 获取所有的文件路径的集合
    importFn.keys().forEach(key => {
      // 导入组件 importFn(key).default获取组件名
      const component = importFn(key).default
      // 注册组件
      app.component(component.name, component)
    })
    // 自定义指令
    defineDirective(app)
  }
}
const defineDirective = (app) => {
  // directive('指令名称'，fn)自定义指令
  app.directive('lazy', {
    // vue 2.0用inserted 监听DOM是否创建好
    // vue3.0 用mounted
    mounted (el, binding) { // el监听的元素，binding传入的值
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        // 是否进入可视区
        if (isIntersecting) {
          // 停止观察
          observer.unobserve(el)
          // 图片加载失败
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        // 进入可视区立即开始
        threshold: 0
      })
      // 开启观察
      observer.observe(el)
    }
  })
}
