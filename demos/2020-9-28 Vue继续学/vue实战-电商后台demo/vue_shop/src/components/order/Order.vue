<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单列表区域 -->
      <el-table :data="orderList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <div>
              <el-tag v-if="scope.row.order_pay === '1'" type="success">已付款</el-tag>
              <el-tag v-else type="danger">未付款</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.create_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button
                @click="showAddressDialog(scope.row)"
                type="primary"
                size="mini"
                icon="el-icon-edit"
              ></el-button>
              <el-button
                @click="showProgressDialog(scope.row)"
                type="success"
                size="mini"
                icon="el-icon-location"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        :page-sizes="[5, 10, 15]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 修改地址对话框 -->
    <el-dialog
      :visible.sync="addressDialogVisible"
      title="修改地址"
      width="50%"
      @close="addressDialogClosed"
    >
      <el-form
        :model="addressForm"
        ref="addressFormRef"
        :rules="addressFormRules"
        label-width="100px"
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            expand-trigger="hover"
            :options="cityData"
            v-model="addressForm.address1"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取 消</el-button>
        <el-button @click="editAddress" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 物流进度对话框 -->
    <el-dialog
      :visible.sync="progressDialogVisible"
      title="物流进度"
      width="50%"
      @close="progressDialogClosed"
    >
      哈哈哈
    </el-dialog>
  </div>
</template>
<script>
import cityData from '../../assets/citydata.js'
export default {
  data() {
    return {
      // *查询订单列表相关
      // 查询参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 总数
      total: 0,
      // 订单列表数据
      orderList: [],
      // *修改地址对话框相关
      addressDialogVisible: false,
      addressForm: {
        address1: [],
        address2: ''
      },
      addressFormRules: {
        address1: [{ required: true, message: '请选择省市区/县', trigger: 'blur' }],
        address2: [{ required: true, message: '请填写详细地址', trigger: 'blur' }]
      },
      // 导入的省市区县数据
      cityData,
      // *物流进度相关
      progressDialogVisible: false,
      progressData: []
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    // *查询订单列表
    async getOrderList() {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取订单列表失败')
      }

      // 获取成功
      // console.log(res.data)
      this.orderList = res.data.goods
      this.total = res.data.total
    },

    // *分页器相关
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },

    // *修改地址相关
    showAddressDialog(row) {
      // 拿到row之后根据id查询数据并保存到绑定的属性上，同时将其保存到单独的data供确定按钮提交修改
      console.log(row)
      this.addressDialogVisible = true
    },
    // 监听对话框关闭
    addressDialogClosed() {
      this.$refs.addressFormRef.resetFields()
    },
    // 预验证+发起修改地址请求
    editAddress() {},

    // *物流进度相关
    // async getProgressData() {
    //   const { data: res } = await this.$http.get('/kuaidi/804909574412544580')
    //   if (res.meta.status !== 200) {
    //     return this.$message.error('获取物流进度失败')
    //   }
    //   console.log(res.data)
    //   // this.progressData = res.data
    //   // console.log(this.progressData)
    // },
    async showProgressDialog(row) {
      // 拿到row之后根据id查询数据并保存到绑定的属性上，同时将其保存到单独的data供确定按钮提交修改
      // 查询物流数据，后台调用的快递100接口，由于年代久远，接口改了，要带ua才允许获取，坑呀，，，
      const { data: res } = await this.$http.get('kuaidi/804909574412544580')
      if (res.meta.status !== 200) {
        return this.$message.error('获取物流进度失败')
      }
      console.log(res.data)
      this.progressData = res.data
      this.progressDialogVisible = true
    },
    // 监听对话框关闭
    progressDialogClosed() {}
  }
}
</script>
<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>
