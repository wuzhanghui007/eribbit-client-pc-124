<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{goodsId?'同类商品推荐':'猜你喜欢'}}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel :sliders="sliders" />
  </div>
</template>
<script>
import { findRelGoods } from '@/api/goods'
import { ref } from 'vue'
// 得到需要的数据
const useRelGoodsData = (id) => {
  const sliders = ref([])
  findRelGoods(id).then(data => {
    const size = 4
    // 每页4条数据，得到总页数
    const total = Math.ceil(data.result.length / size)
    for (let i = 0; i < total; i++) {
      // slice(开始截取的位置， 截取结束的位置) 返回数组
      sliders.value.push(data.result.slice(i * size, (i + 1) * size))
    }
  })
  return sliders
}

export default {
  props: {
    goodsId: {
      type: String,
      default: undefined
    }
  },
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant',
  setup (props) {
    const sliders = useRelGoodsData(props.goodsId)
    // console.log(sliders)
    return { sliders }
  }
}
</script>
<style scoped lang='less'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
:deep(.xtx-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0,0,0,0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
}
</style>
