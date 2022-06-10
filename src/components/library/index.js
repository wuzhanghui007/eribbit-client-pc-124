
import XtxSkeleton from './xtx-skeleton.vue'
import xtxCarousel from './xtx-carousel.vue'
import xtxMore from './xtx-more.vue'
import defaultImg from '@/assets/images/200.png'
export default {
  install (app) {
    // 自定义组件
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(xtxCarousel.name, xtxCarousel)
    app.component(xtxMore.name, xtxMore)
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
