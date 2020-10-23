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
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <!-- tree-table是另外的插件，注册成了全局组件；
      :data绑定数据源； :column指定列数据如何渲染，是数组；
      :selection-type，是否为多选类型，默认true；
      :expend-type，是否为展开行类型，默认true；
      show-index，是否显示数据索引列，默认false ；
      index-text，数据索引的表头名称；
      border是否显示纵向边框
      :show-row-hover 鼠标悬停时，当前行背景色是否高亮，默认true -->
      <tree-table
        class="treeTable"
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
      >
        <!-- 使用作用域插槽渲染自定义模板列，匹配的模板列的名称就是slot属性的值 -->
        <!-- 是否有效列模板 -->
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-success font-lightgreen" v-if="scope.row.cat_deleted === false"></i>
          <i class="el-icon-error font-red" v-else></i>
        </template>
        <!-- 排序列模板 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" type="primary" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作列的模板 -->
        <template slot="opt" slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" type="primary">编辑</el-button>
          <el-button size="mini" icon="el-icon-delete" type="danger">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        :page-sizes="[3, 5, 10, 15]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <!-- 添加分类的表单 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- el-cascader级联选择器，适合处理存在多层选项的情况
          expand-trigger='hover'表示鼠标悬停触发展开子选项
          :options用于指定数据源
          props用于指定级联选择器的配置对象
          v-model将选中的值双向绑定到一个数组中，必须是数组不能是对象
          clearable 支持清空选项
          change-on-select 是否允许选中任意一级的选项，默认不允许，只能选最后一级
           -->
          <el-cascader
            expand-trigger="hover"
            :options="parentCateList"
            :props="cascaderProps"
            v-model="selectedKeys"
            @change="parentCateChanged"
            clearable
            change-on-select
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button @click="addCate" type="primary">确 定</el-button>
      </span>
    </el-dialog>
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
        },
        {
          label: '是否有效',
          // 表示当前列是模板列
          type: 'template',
          // 表示使用isok这个模板
          template: 'isok'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt'
        }
      ],
      // 控制添加分类对话框显示与隐藏
      addCateDialogVisible: false,
      // 添加分类的表单数据对象
      addCateForm: {
        // 将要添加的分类名称
        cat_name: '',
        // 父级分类的id,默认0，表示一级分类
        cat_pid: 0,
        // 分类的等级，默认添加一级分类
        cat_level: 0
      },
      // 验证表单规则对象
      addCateFormRules: {
        cat_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      // 父级分类的列表数据
      parentCateList: [],
      // 级联选择器的配置对象
      cascaderProps: {
        // 指定每个选项的value
        value: 'cat_id',
        // 指定每个选项的名称
        label: 'cat_name',
        // 指定根据数据源的哪个属性进行嵌套
        children: 'children'
      },
      // 选中的父级分类的id数组
      selectedKeys: []
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
    },
    // 监听分页器pagesize改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听页码改变事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    // 显示添加分类对话框
    showAddCateDialog() {
      // 先获取父级分类数据列表，再展示对话框
      this.getParentCateList()
      this.addCateDialogVisible = true
    },
    // 获取父级分类列表数据
    // 父级分类，只需要获取前两级分类即可
    async getParentCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: {
          type: 2
        }
      })
      if (res.meta.status !== 200) return this.$message.error('获取父级分类数据失败')
      // console.log(res.data)
      // 保存到data
      this.parentCateList = res.data
    },
    // 监听级联选择器的选择项改变事件
    parentCateChanged() {
      // console.log(this.selectedKeys)
      // selectedKeys数组长度大于0，说明选中了父级分类，否则没有选父级分类
      if (this.selectedKeys.length > 0) {
        // 得到父级分类的id为选中数组的最后一项
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        // 当前分类的等级与数组长度相同（因为等级是从0开始的）
        this.addCateForm.cat_level = this.selectedKeys.length
      } else {
        // 没有选父级分类，pid为0，等级为0
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    },
    // 点击按钮发送请求，添加新分类
    addCate() {
      // console.log(this.addCateForm)
      // 表单预验证
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('categories', this.addCateForm)
        if (res.meta.status !== 201) return this.$message.error('添加分类失败')
        // 成功
        this.$message.success('添加分类成功')
        this.getCateList()
        this.addCateDialogVisible = false
      })
    },
    // 关闭对话框清空表单
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
    }
  }
}
</script>

<style lang="less" scoped>
.treeTable {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
</style>
