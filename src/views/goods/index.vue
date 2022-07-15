<template>
<div class="container">
  <!-- 面包屑 -->
  <xtx-bread>
    <xtx-bread-item to='/'>首页</xtx-bread-item>
    <xtx-bread-item to='/'>手机</xtx-bread-item>
    <xtx-bread-item to='/'>华为</xtx-bread-item>
    <xtx-bread-item to='/'>P50</xtx-bread-item>
  </xtx-bread>
  <!-- 商品信息 -->
  <div class="goods-info">商品信息</div>
  <!-- 推荐商品 -->
  <GoodsRelevant/>
  <!-- 商品详情 -->
  <div class="goods-footer">
    <div class="goods-article">
      <!-- 商品+评价 -->
      <div class="goods-tabs">商品+评价</div>
      <!-- 注意事项 -->
      <div class="goods-warn">注意事项</div>
    </div>
    <!-- 热榜专题推荐 -->
    <div class="goods-aside">热榜专题推荐 </div>
  </div>
</div>
</template>
<script>
import GoodsRelevant from './components/goods-relevan.vue'
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsRelevant
  },
  setup () {
  }
}
</script>
