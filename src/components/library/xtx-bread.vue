<script>
/* 导入的h函数是createElement() */
import { h } from 'vue'
export default {
  name: 'xtxBread',
  render () {
    // this.$slots.default 获取使用时默认的插槽内容
    const items = this.$slots.default()
    const dymanicItems = [] // 定义子节点内容
    items.forEach((item, i) => {
      if (item.type.name === 'xtxBreadItem' || item.type.displayName === 'Transition') {
        dymanicItems.push(item)
        if (i < (items.length - 1)) {
          dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
        }
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
</script>
<style lang='less'>
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  &-item{
  a{
    color: #666;
    transition: all .4s;
    &:hover{
      color: @xtxColor;
    }
  }

}
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // 样式的方式，不合理
    // &:last-child {
    //   display: none;
    // }
  }
}
</style>
