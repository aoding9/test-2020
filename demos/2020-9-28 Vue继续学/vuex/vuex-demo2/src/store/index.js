import Vue from 'vue'
import Vuex from 'vuex'
// 导入一下axios
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 任务列表数据
    list: [],
    // 文本框内容
    inputValue: 'aaa',
    // item的下一个id
    nextId: 5
  },
  mutations: {
    // 初始化list
    initList(state, list) {
      state.list = list
    },
    // 修改inputValue
    setInputValue(state, val) {
      state.inputValue = val
    },
    // 添加item
    addItem(state) {
      // 定义一个新的item
      const item = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      // push到数组里去
      state.list.push(item)
      // 清空input
      state.inputValue = ''
      // nextId自增
      state.nextId++
    }
  },
  actions: {
    // 1.首先获取list.json的数组
    // 2.解构赋值拿到data
    // 3.将data作为参数，触发mutation，修改list
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  modules: {}
})
