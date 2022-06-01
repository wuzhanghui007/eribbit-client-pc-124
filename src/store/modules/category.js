
// 存储的分类数据
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息集合
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    setList (state, data) {
      state.list = data
    },
    show (state, item) {
      const category = state.list.find(list => list.id === item.id)
      category.open = true
    },
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }

  },
  actions: {
    async getList ({ commit }) {
      const { result } = await findAllCategory()
      // 设置控制显示和隐藏的属性
      result.forEach(item => {
        item.open = false
      })
      commit('setList', result)
    }
  }

}
