<template>
<div class="goods-image">
  <!-- 大图片 -->
  <div class="large" v-show="show" :style="[{backgroundImage:`url(${images[currIndex]})`}, bgPosition]"></div>
 <!-- 中图片 -->
  <div class="middle" ref="target">
    <img :src="images[currIndex]" alt="">
    <!-- 遮罩层 -->
     <div class="layer" v-show="show" :style="position"></div>
  </div>
  <!--  小图片 -->
  <ul class="small">
    <li v-for="(item, i) in images" :key="i" :class="{ active: i===currIndex}">
      <img :src="item" alt="" @mouseenter="currIndex=i" />
    </li>
  </ul>
</div>
</template>
<script>
import { reactive, ref, watch } from 'vue-demi'
import { useMouseInElement } from '@vueuse/core'
export default {
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const currIndex = ref(0)
    const { position, bgPosition, show, target } = usePreviewImg()
    return { currIndex, position, bgPosition, show, target }
  }
}
// 定义图片跟随放大镜函数
const usePreviewImg = () => {
  const target = ref(null)
  // 定义放大图片显示与隐藏
  const show = ref(false)
  // 定义设置遮罩层的位置
  const position = reactive({
    left: 0,
    top: 0
  })
  // 定义背景图的位置
  const bgPosition = reactive({
    backgroundPositionX: 0,
    backgroundPositionY: 0
  })
  // elementX 鼠标基于容器左上角X轴偏移
  // elementY 鼠标基于容器左上角Y轴偏移
  // isOutside 鼠标是否在模板容器外
  // 使用@vueuse/core插件
  const { elementX, elementY, isOutside } = useMouseInElement(target)
  // 监听鼠标坐标，及鼠标是否在目标容器内
  watch([elementX, elementY, isOutside], () => {
    // 控制x坐标在0-200内
    if (elementX.value < 100) position.left = 0
    else if (elementX.value > 300) position.left = 200
    else position.left = elementX.value - 100
    // 控制Y坐标在0-200内
    if (elementY.value < 100) position.top = 0
    else if (elementY.value > 300) position.top = 200
    else position.top = elementY.value - 100
    // 设置大图位置
    bgPosition.backgroundPositionX = -position.left * 2 + 'px'
    bgPosition.backgroundPositionY = -position.top * 2 + 'px'
    // 设置遮罩层定位
    position.left = position.left + 'px'
    position.top = position.top + 'px'
    // 设置是否显示放大图和遮罩层
    show.value = !isOutside.value
  })
  return { target, show, position, bgPosition }
}
</script>
<style lang="less" scoped>
.goods-image{
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 555;
  .large{
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0,0 0.1);
    background-repeat: no-repeat;
    background-color: #f8f8f8;
    background-size: 800px 800px;
  }
  .middle{
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    cursor: move;
    position: relative;
    .layer{
      position: absolute;
      width: 200px;
      height: 200px;
      background: rgba(0,0,0,.2);
      left: 0;
      top: 0;
    }
  }
  .small{
    width: 80px;
    li{
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &hover,&.active{
        border: 2px solid @xtxColor;
      }
    }
  }
}

</style>
