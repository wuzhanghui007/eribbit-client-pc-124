<template >
  <div class="home-entry">
    <div class="page-home">
      <div class="container">
        <!-- 左侧分类 -->
        <homeCategory/>
        <!-- 轮播图 -->
        <HomeBanner/>
      </div>
      <!-- 新鲜好物 -->
      <homeNew/>
      <!-- 人气推荐 -->
      <HomeHot/>

    </div>
    </div>
</template>
<script>
import homeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner'
import homeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
export default {
  components: {
    homeCategory,
    HomeBanner,
    homeNew,
    HomeHot
  }

}
</script>

<style lang="less" scoped>

</style>
