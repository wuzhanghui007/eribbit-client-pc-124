<template>
  <div class='xtx-carousel' @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body">
      <li class="carousel-item" v-for="(item,i) in sliders " :key="i"  :class="{fade:index===i}">
        <RouterLink :to="item.hrefUrl" v-if="item.hrefUrl">
          <img :src="item.imgUrl">
        </RouterLink>
        <div v-else class="slider">
          <RouterLink v-for="goods in item" :key="goods.id" :to="`/product/${goods.id}`">
            <img :src="goods.picture" alt=""/>
            <p class="name ellipsis">{{goods.name}}</p>
            <p class="price">&yen;{{goods.price}}</p>
          </RouterLink>
        </div>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)"><i class="iconfont icon-angle-left" ></i></a>
    <a href="javascript:;" class="carousel-btn next" @click="toggle(1)"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <span v-for="(item, i) in sliders" :key="i" :class="{active:index===i}" @mouseenter="index=i"></span>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    // 轮播图数据
    sliders: {
      type: Array,
      default: () => []
    },
    // 轮播时间
    duration: {
      type: Number,
      default: 3000
    },
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    // 轮播图下标值
    const index = ref(0)
    let timer = null
    // 自动轮播函数
    const autoPlayFn = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }
    // 监听数据加载完成后开启轮播
    watch(() => props.sliders, (newVal) => {
      if (newVal.length && props.autoPlay) {
        index.value = 0
        autoPlayFn()
      }
    }, {
      // 立即执行
      immediate: true
    })
    // 鼠标进入停止，移出开启自动，前提条件：autoPlay为true
    const stop = () => {
      if (timer) clearInterval(timer)
    }
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }
    // 上一张下一张
    const toggle = (step) => {
      const newINdex = index.value + step
      if (newINdex >= props.sliders.length) {
        index.value = 0
        return
      }
      if (newINdex < 0) {
        index.value = props.sliders.length - 1
        return
      }
      index.value = newINdex
    }
    return { index, stop, start, toggle }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 1s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  // 轮播商品
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px!important;
      height: 230px!important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: @priceColor;
      margin-top: 15px;
    }
  }
}
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
