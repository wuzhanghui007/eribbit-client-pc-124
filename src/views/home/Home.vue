<template >
  <div class="home-entry">
    <div class="page-home">
      <div class="container">
        <!-- 左侧分类 -->
        <homeCategory/>
        <!-- 轮播图 -->
        <HomeBanner/>
      </div>
    </div>
    </div>
</template>
<script>
import homeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner'
export default {
  components: {
    homeCategory,
    HomeBanner
  }

}
</script>

<style lang="less" scoped>

</style>
