<template>
    <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a href="javascript:;" :class="{disabled:index===0}" class="iconfont icon-angle-left prev" @click="toggle(-1)"></a>
      <a href="javascript:;" :class="{disabled:index===1}" class="iconfont icon-angle-right next" @click="toggle(1)"></a>
    </template>
    <div class="box" ref="target" >
      <Transition name="fade">
        <ul class="list" v-if="result.length" :style="{transform:`translateX(${-index*1240}px)`}">
          <li v-for="i in result" :key="i">
            <RouterLink to="/">
              <img :src="i.picture" alt="">
            </RouterLink>
          </li>
        </ul>
         <div v-else class="skeleton">
           <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px"/>
         </div>
      </Transition >
    </div>
  </HomePanel>
</template>
<script>
import HomePanel from './home-panel'
import { findBrand } from '@/api/home'
import { ref } from 'vue'
import { useLazyData } from '@/hooks/index'
export default {
  components: {
    HomePanel
  },
  setup () {
    /* 获取数据 */
    const { target, result } = useLazyData(() => findBrand(10))
    // 切换效果，前提只有 0 1 两页
    const index = ref(0)
    const toggle = (step) => {
      const newIndex = index.value + step
      if (newIndex < 0 || newIndex > 1) return
      index.value = newIndex
    }
    return { index, toggle, target, result }
  }
}
</script>
<style scoped lang='less'>
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
    .skeleton {
    width: 100%;
    display: flex;
    .item {
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
</style>
