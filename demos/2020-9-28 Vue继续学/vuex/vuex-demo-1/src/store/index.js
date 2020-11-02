// *步骤：导入Vuex，并且Vue.use(Vuex)
// *new Vuex.store()，并且暴露出去，在main.js中导入并挂载
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  // 只有mutation中的方法才允许修改state，其他方式就算能改也不建议使用
  mutations: {
    // *如果要修改state，要在mutations中定义方法来修改，不能直接改，虽然不会报错，但是不利于维护》》在组件里通过this.$store.commit('方法')调用
    // 第一个参数是state，第二个参数则是组件中commit传入的参数
    add(state) {
      state.count++
    },
    addN(state, step) {
      state.count += step
    },
    sub(state) {
      state.count--
    },
    subN(state, step) {
      state.count -= step
    }
  },
  // *mutations中应该只执行同步操作，执行异步任务会有各种神奇的问题（比如调试工具数据没有同步更新），如果要使用异步任务，必须通过actions来触发mutation，间接变更数据
  // *组件中通过this.$store.dispatch('addAsync')触发actions中的方法
  actions: {
    // context相当于上面new的Vuex.Store实例，调用他的commit方法触发mutation
    addAsync(context) {
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    },

    // *传参数先用dispatch传参，action接收，再commit接收
    addNAsync(context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },

    subAsync(context) {
      setTimeout(() => {
        context.commit('sub')
      }, 1000)
    },
    subNAsync(context, step) {
      setTimeout(() => {
        context.commit('subN', step)
      }, 1000)
    }
  },
  // *getters类似于计算属性，并且他只起到包装作用，不会修改state数据，当store数据变化时，getters响应式地改变
  getters: {
    showNum: state => '当前最新的数量是：' + state.count
    // showNum(state) {
    // return '当前最新的数量是'+ state.count
    // }
  },
  modules: {}
})
