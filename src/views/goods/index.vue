<template>
<div class="container" v-if="goods">
  <!-- 面包屑 -->
  <xtx-bread>
    <xtx-bread-item to='/'>首页</xtx-bread-item>
    <xtx-bread-item :to="'/category/'+goods.categories[1].id">{{goods.categories[1].name}}</xtx-bread-item>
    <xtx-bread-item :to="'/category/sub/'+goods.categories[0].id">{{goods.categories[0].name}}</xtx-bread-item>
    <xtx-bread-item >{{goods.name}}</xtx-bread-item>
  </xtx-bread>
  <!-- 商品信息 -->
  <div class="goods-info">
    <div class="media">
      <GoodsImage  :images="goods.mainPictures"/>
      <GoodsSales/>
    </div>
    <div class="spec">
      <!-- 名字区组件 -->
      <GoodsName  :goods="goods"/>
      <!-- 规格组件 -->
      <GoodsSku :goods="goods" @change="changeSku"/>
      <!-- 数量组件 -->
      <XtxNumbox label="数量" v-model="num" :max="goods.inventory"/>
      <!-- 按钮组件 -->
      <XtxButton size="middle" type="primary"  style="margin-top:20px;">加入购物车</XtxButton>
    </div>
  </div>
  <!-- 推荐商品 -->
  <GoodsRelevant :goodsId="goods.id"/>
  <!-- 商品详情 -->
  <div class="goods-footer">
    <div class="goods-article">
      <!-- 商品+评价 -->
      <div class="goods-tabs">
        <GoodsTabs />
      </div>
      <!-- 注意事项 -->
      <div class="goods-warn">
        <GoodsWarn />
      </div>
    </div>
    <!-- 热榜专题推荐 -->
    <div class="goods-aside">
      <GoodsHot :goodsId="goods.id" :type=1 />
      <GoodsHot :goodsId="goods.id" :type=2 />
     </div>
  </div>
</div>
</template>
<script>
import GoodsHot from './components/goods-hot.vue'
import GoodsTabs from './components/goods-tabs'
import GoodsRelevant from './components/goods-relevan.vue'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsWarn from './components/goods-warn.vue'
import { findGoods } from '@/api/product'
import { nextTick, provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku,
    GoodsTabs,
    GoodsHot,
    GoodsWarn
  },
  setup () {
    const goods = useGoods()
    const num = ref(1)
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }
    provide('goods', goods)
    return { goods, changeSku, num }
  }
}
// 获取商品详情
const useGoods = () => {
  const goods = ref(null)
  const route = useRoute()
  // 监听路由ID是否发生变化
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then(data => {
        // 让商品数据为null然后使用v-if的组件可以重新销毁和创建
        goods.value = null
        nextTick(() => {
          goods.value = data.result
          console.log(data.result)
        })
      })
    }
  }, { immediate: true })

  return goods
}

</script>
<style lang="less" scoped>
.goods-info{
  min-height: 600px;
  background: #fff;
  display: flex;
  .media{
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec{
    flex: 1;
    padding: 30px 30px 30px 0;
  }

}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}

</style>
