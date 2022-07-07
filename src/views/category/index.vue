<template>
 <div class="top-category">
   <div class="container">
      <!-- 面包屑 -->
      <xtxBread>
        <xtxBreadItem to="/">首页</xtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <xtxBreadItem :key="topCategory.id">{{topCategory.name}}</xtxBreadItem>
        </Transition>
      </xtxBread>
       <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height:500px"  :autoPlay="true"/>
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 商品分类 -->
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{item.name}} -</h3>
          <p class="tag">{{item.desc}}</p>
          <XtxMore />
        </div>
        <div class="body">
          <goodsItem v-for="g in item.goods" :key="g.id" :goods="g" />
        </div>
      </div>
   </div>
 </div>
<!--   <div class="test">
     <xtxBread>
       <xtxBreadItem>123</xtxBreadItem>
       <xtxBreadItem>456</xtxBreadItem>
     </xtxBread>
  </div> -->
</template>
<script>
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import goodsItem from './goods-item.vue'
export default {
  name: 'TopCategory',
  components: {
    goodsItem
  },
  setup () {
    // 轮播图
    const sliders = ref([])
    // 面包屑+所有分类
    findBanner().then(data => {
      sliders.value = data.result
    })
    const store = useStore()
    const route = useRoute()
    // 查找路由产品ID与路由ID一致的一项数据
    const topCategory = computed(() => {
      let cate = {}
      const item = store.state.category.list.find(item => {
        return item.id === route.params.id
      })
      // 找到后赋值给cate
      if (item) cate = item
      return cate
    })
    // 获取推荐商品
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children
      })
    }
    // 监听路由ID发生变化时发送请求
    watch(() => route.params.id, (newVal) => {
      // newVal && getSubList()
      // 存在值且请求的为二级类目路由
      if (newVal && `/category/${newVal}` === route.path) getSubList()
    }, { immediate: true })
    return { sliders, topCategory, subList }
  }
}
</script>
<style lang="less" scoped>
 .top-category{
   h3{
     font-size: 28px;
     color: #666;
     font-weight: normal;
     text-align: center;
     line-height: 100px;
   }
   .sub-list{
     margin-top: 20px;
     background-color: #fff;
        ul{
     display: flex;
     padding: 0 32px;
     flex-wrap: wrap;
     li{
       width: 168px;
       height: 160px;
       a{
         text-align: center;
         display: block;
         font-size: 16px;
         img{
           width: 100px;
           height: 100px;
           p{
             line-height: 40px;
         }
       }
        &:hover{
          color: @xtxColor;
          }
        }
     }
   }
   }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
 }
</style>
