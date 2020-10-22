<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <!-- 栅格布局系统，
      每行row有24列，
      用:span指定col的宽度，
      用:gutter指定列间距 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- el-input
          添加clearable属性 为输入框渲染清空按钮，
          @clear事件，当点击清空按钮清除内容时触发，点击后重新获取用户列表 -->
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <!-- 先指定模板列，然后给每个模板列绑定数据 -->
      <!-- :data绑定数据源 border属性表示边框线 stripe属性表示斑马纹-隔行变色 -->
      <el-table :data="userList" border stripe>
        <!-- 索引列 给列加一个type='index 就行了-->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <!-- 状态要渲染成开关，用作用域插槽来做，scope可以拿到当前组件作用域下的数据，也就是userList，进一步，scope.row可以拿到当前这一行的数据 -->
        <!-- 将el-switch的值用v-model绑定到scope.row.mg_state就可以自动渲染开关 -->
        <!-- switch状态改变时触发change事件，通过回调函数可以拿到新状态的值，然后将其更新到数据库中 -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 通过作用域插槽自定义操作按钮 -->
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="dangger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <!-- 分配权限按钮 -->
            <!-- 用el-tooltip渲染文字提示，
            effect是背景色，
            content是提示内容，
            placement是提示框位置，
            enterable是鼠标能否进入提示框-->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <!-- 分别是
      @size-change监听pagesize改变的事件，
      @current-change监听页码值改变的事件，
      :current-page当前页码值，
      :page-sizes修改每页条数的可选数组，
      :page-size当前每页条数，
      layout选择渲染哪些分页器组件，
      :total数据总条数 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination
    ></el-card>
    <!-- 添加用户的对话框区域 -->
    <!-- el-dialog
    title对话框标题
    :visible.sync对话框显示与否
    :before-close在关闭对话框前触发的回调函数
    @close监听dialog对话框关闭事件
     -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDilalogClosed"
    >
      <!-- 对话框主体区域 -->
      <!-- el-form表单
      :model指定绑定的数据对象，
      :rules指定数据验证规则,
      ref指定表单引用对象，
      在el-form-item中，
      通过label指定输入框前面的文字，
      prop指定使用哪条验证进行规则
       -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 对话框底部区域 -->
      <span slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 对话框底部区域 -->
      <span slot="footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色的对话框-->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @close="setRoleDialogClosed"
    >
      <p>当前用户：{{ userInfo.username }}</p>
      <p>当前角色：{{ userInfo.role_name }}</p>
      <!-- el-option
      :label是显示的选项名字
      :value是该选项对应的值 -->
      <p>
        分配新角色
        <el-select v-model="selectedRoleId" placeholder="请选择">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          ></el-option>
        </el-select>
      </p>
      <span slot="footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    // 自定义表单验证规则
    // 由于是通用的，所以没放到return里面
    // 定义一个箭头函数，他接收三个参数：验证规则，待验证的值，验证结束时触发的回调函数，其中代表验证结束的回调函数必须触发（这个验证其实是异步的任务）
    var checkEmail = (rule, value, callback) => {
      // 验证邮箱的正则表达式
      // 数字字母横杠下划线开头至少1个，@，数字字母横杠下划线开头至少1个，小点.，字母数字横杠下换线至少1个
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return callback()
      }
      // 验证没通过，new一个Error对象
      callback(new Error('请输入合法的邮箱'))
    }
    var checkMobile = (rule, value, callback) => {
      // 验证手机号的正则表达式
      // 号码前缀0或1个，限定范围的前3位号码，任意的后8位号码
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的手机'))
    }
    return {
      // 获取用户列表的查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      userList: [],
      total: 0,
      // 控制添加用户对话框显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名的长度在3-10个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名的长度在3-10个字符之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 控制修改用户对话框显示隐藏
      editDialogVisible: false,
      // 编辑用户的表单对象，查询到的用户数据会保存到这里，便于重置字段操作
      editForm: {},
      // 修改用户的验证规则对象
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 控制分配角色对话框显示隐藏
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      rolesList: [],
      // 当前选中的角色id
      selectedRoleId: ''
    }
  },
  created() {
    // 发起获取用户列表请求
    this.getUserList()
  },
  methods: {
    // 定义通过api获取用户列表的方法
    async getUserList() {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      // 数据获取成功，保存到data
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      // 将新的值更新保存到data的queryInfo里面
      this.queryInfo.pagesize = newSize
      // 改变之后重新获取下数据
      this.getUserList()
    },
    // 监听currentPage改变的事件，处理步骤同handleSizeChange
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 监听用户状态switch改变的事件
    async userStateChanged(userInfo) {
      // console.log(userInfo);
      // 接口是users/:uid/state/:type，为了便于拼接，使用模板字符串
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        // 由于传的是对象，所以改这里的值，外面也会改变（引用的）
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新用户状态失败')
      }
      this.$message.success('更新用户状态成功')
    },
    // 监听dialog对话框关闭事件
    addDilalogClosed() {
      // 拿到表单引用对象，调用其重置方法
      this.$refs.addFormRef.resetFields()
    },
    // 点击确定按钮，添加新用户
    addUser() {
      // 调用表单引用对象下的validate()方法即可
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 验证通过，发起添加用户请求
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) this.$message.error('添加用户失败')
        this.$message.success('添加用户成功')
        // 隐藏对话看
        this.addDialogVisible = false
        // 重新获取用户列表
        this.getUserList()
      })
    },
    // 显示编辑用户对话框
    async showEditDialog(id) {
      // 根据id 请求用户数据
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) return this.$message.error('查询用户失败')
      // 把数据保存到表单数据对象
      this.editForm = res.data
      // 显示对话框
      this.editDialogVisible = true
    },
    async editUser() {
      // 调用表单引用对象下的validate()方法即可
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 验证通过，发起添加用户请求
        const { data: res } = await this.$http.post('users', this.editForm)
        if (res.meta.status !== 201) this.$message.error('修改用户失败')
        this.$message.success('修改用户成功')
        // 隐藏对话框
        this.editDialogVisible = false
        // 重新获取用户列表
        this.getUserList()
      })
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      // 关闭后重置字段
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo() {
      // 先验证表单
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起请求
        const { data: res } = await this.$http.put('users/' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        if (res.meta.status !== 200) return this.$message.error('修改用户信息失败')
        // 隐藏对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getUserList()
        // 提示修改成功
        this.$message.success('用户信息修改成功')
      })
    },
    // 根据id删除用户
    async removeUserById(id) {
      // 先弹框询问用户是否确定要删除用户
      // $confirm有三个参数，第一个是提示消息，第二个是弹框标题，其他配置对象，返回值是promise
      const confirmResult = await this.$confirm('此操作将永久删除该用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 返回值用await处理后得到的是字符串，如果点了确定，返回confirm，如果点了取消，会返回错误，需要用catch捕获错误，此时返回值为cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除操作')
      }
      // 发起删除请求
      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) return this.$message.error('删除用户失败')
      // 刷新用户列表
      this.getUserList()
      // 提示删除成功
      this.$message.success('删除用户成功')
    },
    // 显示分配角色对话框
    async setRole(userInfo) {
      // 为了方便其他地方获取到并使用将要修改的用户信息，把userInfo保存到data中
      this.userInfo = userInfo
      // 获取角色列表
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error('获取角色列表失败')
      // 保存到data
      this.rolesList = res.data
      this.setRoleDialogVisible = true
    },
    // 点击确定，把分配的角色信息保存到数据库
    async saveRoleInfo() {
      // 如果用户没选择就点确定，提示请选择角色
      if (!this.selectedRoleId) {
        return this.$message.error('请选择角色')
      }
      const { data: res } = await this.$http.put(`users/${this.userInfo.id}/role`, {
        rid: this.selectedRoleId
      })
      if (res.meta.status !== 200) {
        return this.$message.error('分配角色失败')
      }
      this.$message.success('分配角色成功')
      // 关闭对话框
      this.setRoleDialogVisible = false
      // 刷新用户列表
      this.getUserList()
    },
    // 监听关闭事件，关闭分配角色对话框时，清空对话框的内容
    setRoleDialogClosed() {
      this.selectedRoleId = ''
      this.userInfo = {}
    }
  }
}
</script>
<style lang="stylus" scoped></style>
