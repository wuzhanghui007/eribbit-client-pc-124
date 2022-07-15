<template>
  <div class="sub-categroy">
    <div class="container">
    <!-- 面包屑 -->
    <sub-bread/>
    <!-- 分类过滤 -->
    <subFilter @filter-change="filterChange"/>

    <!-- 商品面板（排序+列表） -->
    <div class="goods-list">
          <!-- 排序区 -->
      <sub-sort @sort-change="sortChange" />
    <!-- 列表 -->
      <ul>
        <li v-for="goods in goodsList" :key="goods.id" >
          <GoodsItem :goods="goods" />
        </li>
      </ul>
      <!-- 加载 -->
      <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
    </div>
  </div>
  </div>
</template>
<script>
import subBread from './sub-bread.vue'
import subFilter from './sub-filter.vue'
import subSort from './sub-sort.vue'
import GoodsItem from './goods-item.vue'
import { ref, watch } from 'vue'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
export default {
  components: {
    subBread,
    subFilter,
    subSort,
    GoodsItem
  },
  setup () {
    // 1. 基础布局
    // 2. 无限加载组件
    // 3. 动态加载数据且渲染
    // 4. 任何筛选条件变化需要更新列表
    const route = useRoute()

    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    // 查询参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    // 获取数据函数
    const getData = () => {
      loading.value = true
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          // 加载完毕
          finished.value = true
        }
        // 请求结束
        loading.value = false
      })
    }

    // 切换二级分类重新加载
    watch(() => route.params.id, (newVal) => {
      if (newVal && route.path === ('/category/sub/' + newVal)) {
        goodsList.value = []
        reqParams = {
          page: 1,
          pageSize: 20
        }
        finished.value = false
      }
    })
    // 监听筛选区改变
    const filterChange = (filterParams) => {
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
      finished.value = false
    }
    // 监听排序改变
    const sortChange = (sortParams) => {
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
      finished.value = false
    }

    return { loading, finished, goodsList, getData, filterChange, sortChange }
  }
}
</script>
<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
