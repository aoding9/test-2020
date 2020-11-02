<template>
  <div>
    <!-- 面包屑导航 -->

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- closable属性设置是否允许关闭
      title提示的文本
      show-icon是否显示图标 -->
      <el-alert
        :closable="false"
        show-icon
        type="warning"
        title="注意：只允许为第三季分类设置相关参数"
      ></el-alert>
      <!-- 选择商品分类区域 -->
      <el-row class="cap_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 级联选择器 -->
          <el-cascader
            expand-trigger="hover"
            :options="cateList"
            :props="cateProps"
            v-model="selectedCateKeys"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 动态参数页签 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            size="mini"
            :disabled="isDisabled"
            @click="addDialogVisible = true"
            >添加参数</el-button
          >
          <!-- 动态参数表格 -->
          <el-table :data="manyTabelData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环渲染tag -->
                <el-tag
                  v-for="(item, i) in scope.row.attr_vals"
                  type="primary"
                  :key="i"
                  closable
                  @close="handleClose(i, scope.row)"
                  >{{ item }}
                </el-tag>
                <!-- 可编辑的tag -->
                <el-input
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                  class="input-new-tag"
                ></el-input>
                <!-- 添加按钮 -->
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)"
                  >+ New Tag
                </el-button>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <!-- 操作列 -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click="showEditDialog(scope.row.attr_id)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="removeParams(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 静态属性页签 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
            size="mini"
            :disabled="isDisabled"
            @click="addDialogVisible = true"
            >添加属性</el-button
          >
          <!-- 静态属性表格 -->
          <el-table :data="onlyTabelData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环渲染tag -->
                <el-tag
                  v-for="(item, i) in scope.row.attr_vals"
                  type="primary"
                  :key="i"
                  closable
                  @close="handleClose(i, scope.row)"
                  >{{ item }}
                </el-tag>
                <!-- 可编辑的tag -->
                <el-input
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                  class="input-new-tag"
                ></el-input>
                <!-- 添加按钮 -->
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)"
                  >+ New Tag
                </el-button>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <!-- 操作列 -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click="showEditDialog(scope.row.attr_id)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="removeParams(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数和属性的对话框 -->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form :model="addForm" ref="addFormRef" :rules="addFormRules" label-width="100px"
        ><el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="info" @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改参数和属性的对话框 -->
    <el-dialog
      :title="'修改' + titleText"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" ref="editFormRef" :rules="editFormRules" label-width="100px"
        ><el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="info" @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 商品分类列表数据
      cateList: [],
      // 级联选择框配置对象
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 级联选择框双向绑定数组
      selectedCateKeys: [],
      // 被激活的tab页签的name属性值
      activeName: 'many',
      // 动态参数和静态属性的数据分开保存
      manyTabelData: [],
      onlyTabelData: [],
      // 控制添加对话框的显示隐藏
      addDialogVisible: false,
      // 添加参数属性的表单数据对象
      addForm: {},
      // 添加表单的验证规则对象
      addFormRules: {
        attr_name: [{ required: true, message: '请输入参数名称', trigger: 'blur' }]
      },
      // 控制修改对话框的显示隐藏
      editDialogVisible: false,
      // 修改参数属性的表单数据对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        attr_name: [{ required: true, message: '请输入参数名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取商品分类列表数据
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) return this.$message.error('获取商品分类失败')
      this.cateList = res.data
      // console.log(this.cateList)
    },
    // 监听级联选择框值改变事件
    handleChange() {
      console.log(this.selectedCateKeys)

      // 获取参数和属性的数据
      this.getParamsData()
    },
    // tab页签点击事件
    handleTabClick() {
      // console.log(this.activeName)
      // 获取参数和属性的数据
      this.getParamsData()
    },
    // 获取三级分类的参数属性数据
    async getParamsData() {
      // 默认情况下，如果二级分类下没有三级分类，该二级分类也可被选中，但是我们希望只能选三级分类，所以要判断数组长度，如果不等于3就清空数组将其重置
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        // 同时还要清空下面的参数table数据
        this.manyTabelData = []
        this.onlyTabelData = []
        return
      }
      // 通过前置判断，发起请求
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
        params: { sel: this.activeName }
      })

      if (res.meta.status !== 200) return this.$message.error('获取参数数据失败')
      // 为了方便展开参数的tag标签，用空格对attr_vals字符串做分割，转成数组，然后用v-for循环渲染tag标签
      res.data.forEach(item => {
        // 如果为空，那么不进行分割，直接返回空数组
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        // 为item追加独立的额外属性，用于控制+ new tag的按钮和输入框
        // 控制tag编辑按钮与文本框隐藏显示
        item.inputVisible = false
        // tag编辑文本框输入的内容
        item.inputValue = ''
      })
      // console.log(res.data)
      // 判断获取的数据是动态还是静态
      if (this.activeName === 'many') {
        this.manyTabelData = res.data
      } else {
        this.onlyTabelData = res.data
      }
    },
    // 监听添加对话框关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 添加参数和属性
    addParams() {
      // 表单预验证
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post(`categories/${this.cateId}/attributes`, {
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeName
        })
        if (res.meta.status !== 201) return this.$message.error('添加参数失败')
        this.$message.success('添加参数成功')
        this.getParamsData()
        this.addDialogVisible = false
      })
    },
    // 显示修改的对话框
    async showEditDialog(attr_id) {
      // 根据id查询参数或属性
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes/${attr_id}`,
        {
          params: { attr_sel: this.activeName }
        }
      )
      if (res.meta.status !== 200) return this.$message.error('获取参数数据失败')
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 监听修改对话框关闭事件
    editDialogClosed() {
      // 不能用重置，因为会重置成第一个点击的参数名称，隐藏对话框的过渡中会显示出来
      this.editForm.attr_name = ''
    },
    // 修改参数和属性
    editParams() {
      // 表单预验证
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put(
          `categories/${this.cateId}/attributes/${this.editForm.attr_id}`,
          {
            attr_name: this.editForm.attr_name,
            attr_sel: this.activeName
          }
        )
        if (res.meta.status !== 200) return this.$message.error('修改参数失败')
        this.$message.success('修改参数成功')
        this.getParamsData()
        this.editDialogVisible = false
      })
    },
    // 根据id删除参数
    async removeParams(attr_id) {
      // 弹框提示是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该参数，是否继续？',
        '确定',
        '取消',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除')
      // 确定删除
      const { data: res } = await this.$http.delete(
        `categories/${this.cateId}/attributes/${attr_id}`
      )
      if (res.meta.status !== 200) {
        return this.$message.error('删除参数失败')
      }
      this.$message.success('删除参数成功')
      this.getParamsData()
    },
    // 编辑tag的文本框 失去焦点和按下enter触发
    handleInputConfirm(row) {
      // 判断内容是否合法，不合法则清空内容
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      // 将输入的内容追加到attr_vals数组中，然后发起请求
      row.attr_vals.push(row.inputValue.trim())
      this.saveAttrVals(row)
      // 失去焦点或按下enter键，切换显示隐藏
      row.inputValue = ''
      row.inputVisible = false
    },
    // 发起请求保存对参数的修改
    async saveAttrVals(row) {
      // api要求attr_vals为空格分隔的字符串，用join做拼接
      const { data: res } = await this.$http.put(
        `categories/${this.cateId}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(' ')
        }
      )
      if (res.meta.status !== 200) return this.$message.error('修改参数项失败')
      this.$message.success('修改参数项成功')
    },
    // 显示编辑tag的文本框
    showInput(row) {
      row.inputVisible = true
      // 让文本框自动获取焦点
      // 此时页面元素还未渲染到页面上，需要等待渲染之后再获取文本框焦点
      // this.$nextTick(callback)，当dom发生变化，更新后执行的回调。当点击按钮，el-input被渲染出来时执行回调，通过this.$refs.saveTagInput获取到el-input的引用对象，然后再$refs.input获取原生dom元素对象input，调用其focus()方法获取焦点
      // 不过看文档发现有自带的focus()方法，也有效
      this.$nextTick(_ => {
        // console.log(this)
        this.$refs.saveTagInput.focus()
      })
    },
    // 删除参数项
    handleClose(i, row) {
      row.attr_vals.splice(i, 1)
      this.saveAttrVals(row)
    }
  },
  computed: {
    // 根据是否选中三级分类，判断是否禁用添加按钮
    isDisabled() {
      if (this.selectedCateKeys.length !== 3) return true
      return false
    },
    // 当前选中的三级分类的id
    cateId() {
      // 如果长度为3，说明选中了三级分类，将他的id返回出去
      if (this.selectedCateKeys.length === 3) return this.selectedCateKeys[2]
      return null
    },
    // 添加动态参数还是静态属性的对话框标题（由于表格的label也要用到，不返回添加两个字
    titleText() {
      if (this.activeName === 'many') return '动态参数'
      return '静态属性'
    }
  }
}
</script>
<style lang="less" scoped>
.cap_opt {
  margin: 15px 0;
}
.el-tag {
  margin: 5px;
}
.input-new-tag {
  width: 150px;
}
</style>
