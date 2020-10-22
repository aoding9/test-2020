<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
      <el-table :data="roleList" border stripe>
        <!-- 给列加上type='expand'就成了展开列 -->
        <el-table-column type="expand">
          <!-- 展开列区域 -->
          <!-- 通过多层v-for循环，渲染出角色拥有的不同等级的权限tag -->
          <template slot-scope="scope">
            <el-row
              :class="['borderbottom', 'verticalcenter', index1 === 0 ? 'bordertop' : '']"
              v-for="(item1, index1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag type="primary" closable @close="removeRightById(scope.row, item1.id)">{{
                  item1.authName
                }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级权限 -->
              <el-col :span="19">
                <el-row
                  :class="['verticalcenter', index2 === 0 ? '' : 'bordertop']"
                  v-for="(item2, index2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row, item2.id)">{{
                      item2.authName
                    }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 渲染三级权限 -->
                  <!-- el-tag的closable属性：设置tag是否添加删除图标,点击删除图标会触发close事件 -->
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(item3, index3) in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog
      :visible.sync="setRightDialogVisible"
      width="50%"
      title="分配权限"
      @close="setRightDialogClosed"
    >
      <!-- 对话框主体区域 -->
      <!-- el-tree树形控件
      :data，绑定的数据源
      :props，指定树形控件的属性绑定对象，对象属性见data区域
      show-checkbox属性，显示复选框
      node-key属性，为每个节点添加唯一的key
      default-expand-all，是否默认展开所有节点
      default-checked-keys，指定默认选中的节点，提供一个数组，里面包含要勾选的node-key
       -->
      <el-tree
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defaultKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer">
        <el-button @click="setRightDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="allotRights">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 角色列表数据
      roleList: [],
      // 控制分配权限对话框显示隐藏
      setRightDialogVisible: false,
      // 查询的角色的，所有权限数据
      rightsList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        // label指定用哪个属性进行节点绑定
        label: 'authName',
        // children指定用哪个属性进行父子节点的嵌套
        children: 'children'
      },
      // 用于保存即将修改的角色的，默认选中的权限的key值
      defaultKeys: [],
      // 用于保存分配权限时需要提供的角色id
      roleId: ''
    }
  },
  created() {
    // 获取角色列表
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error('获取角色列表失败')
      this.roleList = res.data
      console.log(this.roleList)
    },
    // 根据id移除对应权限
    async removeRightById(role, rightId) {
      // 弹框提示是否确认删除
      const confirmResult = await this.$confirm(
        '此操作将删除用户拥有的该权限，是否继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      // 用户要确认删除，发送删除权限请求
      const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('删除权限失败')
      // this.getRoleList()
      // 如果调用roleList()会把所有角色重新渲染，导致展开行自动折叠
      // 删除权限api的返回的data中包含了该角色最新的权限列表，只需要把这个新的权限列表赋值给当前role.children就行了
      role.children = res.data
      this.$message.success('删除权限成功')
    },
    // 展示分配权限对话框
    async showSetRightDialog(role) {
      // 获取权限列表数据
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限数据失败')
      }
      console.log(res)
      // 获取权限成功，保存到data中
      this.rightsList = res.data
      // 递归获取三级节点id
      this.getLeafKeys(role, this.defaultKeys)
      // 显示对话框
      this.setRightDialogVisible = true
      // 把将要分配权限的角色id保存到data
      this.roleId = role.id
    },
    // （获取叶子的key），也就是通过递归，获取角色下所有三级权限id，并保存到数组中
    getLeafKeys(node, arr) {
      // 如果当前节点不包含children属性，就是三级节点
      if (!node.children) return arr.push(node.id)
      // 不是三级节点，则将children作为新的node，向下递归
      node.children.forEach(item => this.getLeafKeys(item, arr))
    },
    // 监听分配权限对话框关闭事件
    setRightDialogClosed() {
      // 因为都是共用的一个数组，所以关闭的时候要把树形控件的绑定数组清空一下
      this.defaultKeys = []
    },
    // 点击确定按钮，为角色分配权限
    async allotRights() {
      // 用tree组件提供的方法，获取到全选和半选的项的key数组
      // 用展开运算符把两个数组合并
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      // 由于api需要逗号分隔的字符串形式，转换一下
      const idStr = keys.join(',')
      // 发起请求
      // 角色id不好直接通过方法传参，可以在点击分配权限的时候把他保存到data
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
      if (res.meta.status !== 200) return this.$message.error('分配权限失败')
      this.$message.success('分配权限成功')
      // 重新获取角色列表数据
      this.getRoleList()
      // 隐藏对话框
      this.setRightDialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.bordertop {
  border-top: 1px solid #eee;
}
.borderbottom {
  border-bottom: 1px solid #eee;
}
.verticalcenter {
  display: flex;
  align-items: center;
}
</style>
