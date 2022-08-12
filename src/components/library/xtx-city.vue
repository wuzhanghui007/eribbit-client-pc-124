<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="togggleDialog">
      <span class="placeholder" v-if="!fullLocation">{{placeholder}}</span>
      <span class="value" v-else>{{fullLocation}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <div class="loading" v-if="loading"></div>
      <template v-else>
        <span  @click="changeItem(i)" class="ellipsis"  v-for="i in currList" :key="i.code">{{i.name}}</span>
      </template>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      defulat: '请选择配送地址'
    }
  },
  setup (props, { emit }) {
    const target = ref(null)
    // 控制打开和关闭
    const active = ref(false)
    // 是否在加载控件
    const loading = ref(false)
    // 城市数据
    const cityData = ref([])
    // 打开城市组件时
    const open = () => {
      loading.value = true
      active.value = true
      // 调用获取城市数据
      getCityData().then(data => {
        cityData.value = data
        loading.value = false
      })
      for (const key in changeResult) {
        changeResult[key] = ''
      }
    }
    const close = () => {
      active.value = false
    }
    // 切换展开和收起
    const togggleDialog = () => {
      if (active.value) {
        close()
      } else {
        open()
      }
    }
    // 点击元素外关闭
    onClickOutside(target, (event) => close())

    // 定义计算属性展示相关省市区县数据
    const currList = computed(() => {
      // 省份
      let currList = cityData.value
      // 城市
      if (changeResult.provinceCode) {
        currList = currList.find(p => p.code === changeResult.provinceCode).areaList
      }
      // 地区
      if (changeResult.cityCode) {
        currList = currList.find(c => c.code === changeResult.cityCode).areaList
      }
      return currList
    })

    // 定义选择的 省市区 数据
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })
    const changeItem = (item) => {
      // 省份
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      // 地区
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        close()
        emit('change', changeResult)
      }
    }
    return { active, togggleDialog, target, currList, loading, changeItem }
  }
}
// 获取省市区数据函数
const getCityData = () => {
  // 获取城市数据
// 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
// 2. 何时获取？打开城市列表的时候，做个内存中缓存
// 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      // 有缓存
      resolve(window.cityData)
    } else {
      // 无缓存
      const URL = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(URL).then(res => {
        window.cityData = res.data
        console.log(res.data)
        resolve(window.cityData)
      })
    }
  })
}
</script>
<style lang="less" scoped>
.xtx-city{
  display: inline-block;
  position: relative;
  z-index: 400;
  .select{
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active{
      background: #fff;
    }
    .placeholder{
      color: #999;
    }
    .value{
      color: #666;
      font-size: 12px;
    }
    i{
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option{
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    pad: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
    > span{
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 0 3px;
      &:hover{
        background: #f5f5f5;
      }
    }
  }
}

</style>
