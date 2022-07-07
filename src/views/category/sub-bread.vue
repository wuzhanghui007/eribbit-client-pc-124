<template>
  <xtxBread>
    <xtxBreadItem to='/'>首页</xtxBreadItem>
    <xtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</xtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <xtxBreadItem v-if="category.sub" :key="category.sub.id" >{{category.sub.name}}</xtxBreadItem>
    </Transition>
  </xtxBread>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  setup () {
    // 获取当前router的参数
    const route = useRoute()
    // 获取Vuex中的类目数据
    const store = useStore()
    // 通过计算属性获取
    const category = computed(() => {
      const obj = {}
      // 遍历一级类目
      store.state.category.list.forEach(top => {
        // 遍历二级类目
        top.children && top.children.forEach(sub => {
          // 路由访问ID与类目id一致时
          if (sub.id === route.params.id) {
            // 设置二级类目
            obj.sub = { id: sub.id, name: sub.name }
            // 设置一级类目
            obj.top = { id: top.id, name: top.name }
          }
        })
      })
      return obj
    })
    return { category }
  }
}
</script>
