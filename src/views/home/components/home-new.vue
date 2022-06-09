<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
         <xtxMore />
      </template>
    </HomePanel>
      <!-- 面板内容 -->
    <div ref="target" style="position: relative;height: 406px;">
        <Transition name="fade">
        <ul class="goods-list" v-if="goods.length">
          <li v-for="item in goods" :key="item.id">
            <RouterLink :to="`/product/${item.id}`">
              <img :src="item.picture" alt="">
              <p class="name ellipsis">{{item.name}}</p>
              <p class="price">&yen;{{item.price}}</p>
            </RouterLink>
          </li>
        </ul>
      <HomeSkeleton bg="#f0f9f4" v-else />
    </Transition>
    </div>
  </div>
</template>
<script>
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
import { findNew } from '@/api/home'
import { useLazyData } from '@/hooks/index'
export default {
  name: 'homeNew',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup (props) {
  /*     const goods = ref([])
    findNew().then((res) => {
      // console.log(res)
      // goods = res.re
      goods.value = res.result
    })
    return { goods } */
    const { target, result } = useLazyData(findNew)
    return { target, goods: result }
  }
}
</script>
<style scoped lang="less">
.home-new{
  width: 1240px;
  margin: 0 auto;
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
}
</style>
