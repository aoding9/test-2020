<template>
  <div>
    <!-- <h3>当前最新count为：{{ $store.state.count }}</h3> -->
    <h3>{{ $store.getters.showNum }}</h3>
    <button @click="btnHandle1">+1</button>
    <button @click="btnHandle2">+n</button>
    <button @click="btnHandle3">+1 Async</button>
    <button @click="btnHandle4">+n Async</button>
  </div>
</template>
<script>
// *1.组件中访问State数据的第一种方式，this.$store.state.全局数据名称
export default {
  data() {
    return {}
  },
  methods: {
    btnHandle1() {
      // 通过commit触发mutation中的方法
      this.$store.commit('add')
    },
    btnHandle2() {
      this.$store.commit('addN', 3)
    },
    btnHandle3() {
      // dispatch触发action中的方法
      this.$store.dispatch('addAsync')
    },
    btnHandle4() {
      this.$store.dispatch('addNAsync', 3)
    }
  }
}
</script>
<style lang="less" scoped></style>
