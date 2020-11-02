<template>
  <div>
    <!-- <h3>当前最新count为：{{ count }}</h3> -->
    <h3>{{ showNum }}</h3>
    <button @click="sub">-1</button>
    <button @click="subN(3)">-n</button>
    <button @click="subAsync">-1 Async</button>
    <button @click="subNAsync(3)">-n Async</button>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
// *2.组件中访问State数据的第二种方式，import { mapState } from 'vuex 导入mapState映射函数，并在computed中使用他，里面传的数组，根据数组元素拿到映射，然后用展开符展开对象到computed里面，最终将state状态作为computed使用
// !虽然可以也用data接收他，但是data无法监听到state的改变，而computed可以
// *mapState是state的辅助函数，也就是语法糖。作用就是使用多个state时，避免了重复调用this.$store.state.xxx，用一个数组就搞定
// *mapState还有一些其他的用法，https://blog.csdn.net/dkr380205984/article/details/82185740
// *mapGetters、mapMutations、mapActions和mapState差不多，都是将xxx映射为组件的属性或方法
export default {
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['sub', 'subN']),
    ...mapActions(['subAsync', 'subNAsync'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['showNum'])
  }
}
</script>
<style lang="less" scoped></style>
