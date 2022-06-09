/* 数据进入可视驱后再进行数据加载 */
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
export const useLazyData = (apifn) => {
  // ref 获取dom数据
  const target = ref(null)
  // 储存api请求的数据
  const result = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      // 是否进入可视区
      if (isIntersecting) {
        stop()// 监听一次
        apifn().then(data => {
          result.value = data.result
        })
      }
    },
    {
      threshold: 0
    }
  )
  // 返回--->数据（dom,后台数据）
  return { target, result }
}
