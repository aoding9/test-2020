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
    nextId: 5,
    // viewKey，显示all还是已完成或未完成
    viewKey: 'all'
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
    },
    // 根据id删除item
    removeItem(state, id) {
      // 根据id找索引，在用索引删item
      const i = state.list.findIndex(item => item.id === id)
      // 如果i不等于-1说明找到了
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 修改item完成状态
    changeStatus(state, param) {
      const i = state.list.findIndex(item => item.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    // 清除已完成
    cleanDone(state) {
      state.list = state.list.filter(x => !x.done)
    },
    // 切换viewKey
    changeViewKey(state, key) {
      state.viewKey = key
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
  getters: {
    // 统计未完成条数
    // 首先state.list.filter过滤出未完成的item的数组，然后.length获取长度即可
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },

    // 根据viewKey显示不同数组
    filterList(state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      return state.list
    }
  },
  modules: {}
})
