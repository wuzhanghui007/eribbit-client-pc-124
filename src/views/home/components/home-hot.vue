<template>

  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <div ref="target" style="position: relative;height: 426px;">
      <transition name="fade">
          <ul ref="pannel" class="goods-list" v-if="goods.length">
            <li v-for="item in goods" :key="item.id">
              <RouterLink to="/">
                <img :src="item.picture" alt="">
                <p class="name">{{item.title}}</p>
                <p class="desc">{{item.alt}}</p>
              </RouterLink>
            </li>
          </ul>
        <HomeSkeleton v-else />
      </transition>
    </div>
  </HomePanel>

</template>
<script>
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
import { findHot } from '@/api/home'
import { useLazyData } from '@/hooks/index'
export default {
  name: 'HomeHot',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
  /*     const goods = ref([])
    // 获取人气推荐数据
    findHot().then(data => {
      goods.value = data.result
    })
    return { goods } */
    const { target, result } = useLazyData(findHot)
    return { target, goods: result }
  }
}
</script>
<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
