<template>
  <div id="app">
    <a-input
      :value="inputValue"
      @change="handleInputChange"
      placeholder="请输入任务"
      class="my_ipt"
    />
    <a-button @click="addItemToList" type="primary">添加事项</a-button>

    <a-list bordered :dataSource="filterList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <!-- 注意，此处@change事件的值不是普通函数，是一个回调函数，Function(e:Event)，先用外层函数接收e，然后再将e传给回调 -->
        <a-checkbox
          :checked="item.done"
          @change="e => checkboxChangeHandle(e, item.id)"
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <!-- 将id传给mutation -->
        <a slot="actions" @click="removeById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unDoneLength }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            @click="toChangeViewKey('all')"
            :type="viewKey === 'all' ? 'primary' : 'default'"
            >全部</a-button
          >
          <a-button
            @click="toChangeViewKey('undone')"
            :type="viewKey === 'undone' ? 'primary' : 'default'"
            >未完成</a-button
          >
          <a-button
            @click="toChangeViewKey('done')"
            :type="viewKey === 'done' ? 'primary' : 'default'"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="toClean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
// 这里为了体验两种写法，所以不都用辅助函数
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      // * 将list数据放到public/list.json中，然后用action异步请求他，再作为参数传给mutation，在其中为state的list赋值保存
      // *然后通过this.$store.state.list拿到数据
      // !通过getters过滤list，根据viewKey返回不同的item数组
    }
  },
  created() {
    // 调用actions，初始化store中的list
    this.$store.dispatch('getList')
  },
  computed: {
    // 将store的list映射为组件自己的computed
    // !为了用viewKey切换不同完成状态的list数组，将list改为getters处理，用filterList代替
    ...mapState(['inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'filterList'])
  },
  methods: {
    // 将修改后的值传给mutation，修改state中的值
    handleInputChange(e) {
      this.$store.commit('setInputValue', e.target.value)
    },
    // 点击按钮触发mutation
    addItemToList() {
      // 判断是否输入了内容
      if (this.inputValue.trim().length <= 0) {
        // 这个message是ant-design-vue UI组件库提供的
        return this.$message().warning('文本框内容不能为空~~~')
      }
      this.$store.commit('addItem')
    },
    // 通过id删除item，将id传给mutation
    removeById(id) {
      this.$store.commit('removeItem', id)
    },
    // 监听复选框change事件
    checkboxChangeHandle(e, id) {
      // 拿到选中状态和id值
      // console.log(e.target.checked,id)
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus', param)
    },
    // 清除已完成
    toClean() {
      this.$store.commit('cleanDone')
    },
    // 切换viewKey
    toChangeViewKey(key) {
      this.$store.commit('changeViewKey', key)
    }
  }
  // watch: {
  //   list() {
  //     console.log(this.list)
  //   }
  // }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
