<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加分类按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <!-- tree-table是另外的插件，注册成了全局组件
      :data绑定数据源
      :column指定列数据如何渲染，是数组 -->
      <!-- <tree-table></tree-table> -->
      <tree-table :data="cateList" :columns="columns"> </tree-table>
      <!-- 分页区域 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取商品分类列表的查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类的数据列表，默认为空
      cateList: [],
      // 分页总数据条数
      total: 0,
      // 表格列的定义
      columns: [
        {
          // 表头
          label: '分类名称',
          // 要绑定的数据
          prop: 'cat_name'
        }
      ]
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取商品分类数据
    async getCateList() {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类数据失败')
      }
      // console.log(res.data)
      this.cateList = res.data.result
      this.total = res.data.total
    }
  }
}
</script>

<style lang="less" scoped></style>
