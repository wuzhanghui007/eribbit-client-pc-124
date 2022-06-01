<template>
  <div class="home-banner">
    <XtxCarousel :sliders="sliders" :duration="3000" :autoPlay="true" />
  </div>
</template>
<script>
import { findBanner } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    const sliders = ref([])
    findBanner().then((data) => {
      sliders.value = data.result
    })
    return { sliders }
  }
}
</script>
<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  .xtx-carousel {
  ::v-deep(.carousel-btn.prev) {
    left: 270px;
  }
  ::v-deep(.carousel-indicator) {
    padding-left: 250px;
  }
}
}
</style>
