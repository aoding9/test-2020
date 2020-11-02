<template>
  <div id="app">
    <a-input
      :value="inputValue"
      @change="handleInputChange"
      placeholder="请输入任务"
      class="my_ipt"
    />
    <a-button @click="addItemToList" type="primary">添加事项</a-button>

    <a-list bordered :dataSource="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox>{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>0条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button type="primary">全部</a-button>
          <a-button>未完成</a-button>
          <a-button>已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a>清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      // * 将list数据放到public/list.json中，然后用action异步请求他，再作为参数传给mutation，在其中为state的list赋值保存
      // *然后通过this.$store.state.list拿到数据
    }
  },
  created() {
    // 调用actions，初始化store中的list
    this.$store.dispatch('getList')
  },
  computed: {
    // 将store的list映射为组件自己的computed
    ...mapState(['list', 'inputValue'])
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
    }
  },
  watch: {
    list() {
      console.log(this.list)
    }
  }
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
