<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 顶部灰色提示 -->
      <el-alert title="添加商品信息" type="info" center :closable="false" show-icon></el-alert>
      <!-- 步骤条区域 -->
      <!-- el-steps
      :space 每个step之间的间距，不设置则自适应
      :active 当前激活的步骤
      finish-status 完成步骤的状态
      align-center 居中对齐 -->
      <el-steps :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏区域 -->
      <!-- 由于el-tab-pane只允许是el-tabs的子节点，因此将el-form放到el-tabs外面进行包裹 -->
      <el-form
        :model="addGoodsForm"
        :rules="addGoodsFormRules"
        label-width="100px"
        ref="addGoodsFormRef"
        :label-position="'top'"
      >
        <!-- el-tab
      :tab-postion设置标签所在位置
      v-model保存了当前tab的name属性，将其设为步骤条的激活索引，但是此处是字符串类型，上面却是数字类型，要给上面的转成数字类型 -->
        <el-tabs :tab-position="'left'" v-model="activeIndex" @before-leave="">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addGoodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input type="number" v-model="addGoodsForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input type="number" v-model="addGoodsForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input type="number" v-model="addGoodsForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <!-- 级联选择器 -->
              <el-cascader
                expand-trigger="hover"
                :options="cateList"
                :props="cateProps"
                v-model="addGoodsForm.goods_cat"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs></el-form
      >
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 步骤条激活状态索引
      //
      activeIndex: '0',
      // 添加商品表单
      addGoodsForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        // 商品所属的分类数组，由于api只接受字符串形式，需要在提交时进行处理换
        goods_cat: []
      },
      // 添加商品表单验证对象
      addGoodsFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { max: 50, message: '最多50个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { min: 0, message: '大于0', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' },
          { min: 0, message: '大于0', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
          { min: 0, message: '大于0', trigger: 'blur' }
        ],
        goods_cat: [{ required: true, message: '请选择商品分类', trigger: 'blur' }]
      },
      // 商品分类数据
      cateList: [],
      // 分类级联选择器配置对象
      cateProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取商品分类数据
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) return this.$message.error('获取商品分类失败')
      this.cateList = res.data
      // console.log(this.cateList)
    },
    // 级联选择器值产生变化
    handleChange() {
      console.log(this.addGoodsForm.goods_cat)
      // 只允许选择三级分类
      if (this.addGoodsForm.goods_cat.length !== 3) {
        this.addGoodsForm.goods_cat = []
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
