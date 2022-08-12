<template>
<div class="goods-sku">
  <dl v-for="item in goods.specs" :key="item.id">
    <dt>{{item.name}}</dt>
    <dd>
      <template v-for="val in item.values" :key="val.name">
        <img :class="{selected:val.selected, disabled:val.disabled }" @click="clickSpecs(item,val)"
        :src="val.picture" alt="" :title="val.name" v-if="val.picture" >
        <span :class="{selected:val.selected, disabled:val.disabled }" @click="clickSpecs(item,val)" v-else   >{{val.name}}</span>
      </template>
    </dd>
  </dl>
</div>
</template>
<script>

import getPowerSet from '@/vender/power-set'
const spliter = '★'
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 根据传入的skuId默认选中规格按钮
    initSelectedStatus(props.goods, props.skuId)
    const pathMap = getPathMap(props.goods.skus)
    // 组件初始化的时候更新禁用状态
    updateDisabledStatus(props.goods.specs, pathMap)
    // console.log(pathMap)
    const clickSpecs = (item, val) => {
      // 如果是禁用状态不作为
      if (val.disabled) return false
      // 选中与取消逻辑
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(e => {
          e.selected = false
        })
        val.selected = true
      }
      // 点击的时候更新禁用状态
      updateDisabledStatus(props.goods.specs, pathMap)
      // 触发change事件将sku数据传递出去
      // selectedArr
      // 将你选择的sku信息通知父组件{skuId,price,oldPrice,inventory,specsText}
      // 1. 选择完整的sku组合按钮，才可以拿到这些信息，提交父组件
      // 2. 不是完整的sku组合按钮，提交空对象父组件
      const selectedArr = getSelectedArr(props.goods.specs).filter(v => v)
      if (selectedArr.length === props.goods.specs.length) {
        const skuIds = pathMap[selectedArr.join(spliter)]
        const sku = props.goods.skus.find(sku => sku.id === skuIds[0])
        // 传递给父组件相关的值
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          // 属性名：属性值 属性名1：属性值1 ... 这样的字符串
          specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').replace(' ', '')
        })
      } else {
        // 不完整
        // 父组件需要判断是否规格选择完整，不完整不能加购物车。
        emit('change', {})
      }
    }
    return { clickSpecs }
  }
}
// 根据skus数据得到路径字典对象
const getPathMap = (skus) => {
  const pathMap = {}
  // 1 过滤有效库存
  skus.forEach(sku => {
    if (sku.inventory > 0) {
    // 2获取sku有效数据
      const specs = sku.specs.map(spec => spec.valueName)
      // 3 根据导入的算法库导出得到sku属性值数组的子集
      const powerSet = getPowerSet(specs)
      // 4. 设置给路径字典对象
      powerSet.forEach(set => {
        // 根据arr得到字符串的key，约定key是：['蓝色','美国'] ===> '蓝色★美国'
        const key = set.join(spliter)
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
// 获取已选中的值数组
const getSelectedArr = (specs) => {
  const selectedArr = []
  specs.forEach(spec => {
    // 查找每项数据是否选中
    const selectedVal = spec.values.find(val => val.selected)
    selectedArr.push(selectedVal ? selectedVal.name : undefined)
  })
  return selectedArr
}
// 更新按钮的禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, i) => {
    // 更新选中的数据
    const selectedArr = getSelectedArr(specs)
    spec.values.forEach(val => {
      // 已经选中的按钮不用判断
      if (val.name === selectedArr[i]) return false
      // 未选中的替换对应的值
      selectedArr[i] = val.name
      // 过滤无效值得到key
      const key = selectedArr.filter(v => v).join(spliter)
      // 设置禁用状态
      val.disabled = !pathMap[key]
    })
  })
}
// 初始化选中状态
const initSelectedStatus = (goods, skuId) => {
  // 根据传入的skuID 查找goods.skus对应的数据
  const sku = goods.skus.find(sku => sku.id === skuId)
  if (sku) {
    goods.specs.forEach((spec, i) => {
      // value得到每个传入选中的值
      const value = sku.specs[i].valueName
      // 遍历所有展示的值与传入的sku值相等设置为选中。
      spec.values.forEach(val => {
        val.selected = val.name === value
      })
    })
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
