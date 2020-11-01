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
      v-model保存了当前tab的name属性，将其设为步骤条的激活索引，但是此处是字符串类型，上面却是数字类型，要给上面的转成数字类型
      :@before-leave='function(activeName,oldActiveName)'切换标签之前的钩子，若返回false或者返回Promise并且被reject，则阻止切换 -->
        <el-tabs :tab-position="'left'" v-model="activeIndex" :before-leave="beforeLeaveTab" @tab-click="tabClicked">
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
          <el-tab-pane label="商品参数" name="1">
            <!-- 通过循环manyTableData生成参数表单item -->
            <el-form-item v-for="item in manyTableData" :label="item.attr_name" :key="item.attr_id">
              <!-- 复选框组，适用于多个勾选框绑定到同一个数组的情景 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="cb" v-for="(cb, i) in item.attr_vals" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <!-- 静态属性循环 -->
            <el-form-item v-for="item in onlyTableData" :label="item.attr_name" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- 上传组件el-upload
            action图片要上传的地址，upload组件内部封装的ajax请求不能被axios的配置处理，所以要写完整的地址
            :on-preview点击图片显示预览的钩子，形参可以接收到将要预览的图片信息对象，其中有response属性保存了服务器返回的数据，其中可以拿到tmp_path
            :on-remove 点击删除图片的钩子，形参可以接收到将要移除的图片信息对象，同上
            :file-list文件列表绑定
            list-type上传组件的列表类型
            :headers设置组件上传的请求头，为对象类型
            :on-success上传更改的钩子，可以用形参接收到服务器返回的response -->
            <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button></el-upload
            >
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器 -->
            <quill-editor v-model="addGoodsForm.goods_introduce"></quill-editor>
            <!-- 添加商品按钮 -->
            <el-button type="primary" @click="addGoods" class="addBtn">确定</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览对话框 -->
    <el-dialog @close="previewClosed" title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" alt="图片预览" class="previewImg" />
    </el-dialog>
  </div>
</template>
<script>
// 导入lodash插件
import _ from 'lodash'
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
        goods_cat: [],
        // 图片上传的数组
        pics: [],
        // 商品详情
        goods_introduce: '',
        // 商品参数属性的数组
        attrs: []
      },
      // 添加商品表单验证对象
      addGoodsFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
          // { max: 50, message: '最多50个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
          // { min: 0, message: '大于0', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
          // { min: 0, message: '大于0', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
          // { min: 0, message: '大于0', trigger: 'blur' }
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
      },
      // 商品参数的数据
      manyTableData: [],
      // 商品属性数据
      onlyTableData: [],
      // 图片上传地址
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      // 图片上传的请求头
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      // 图片预览的url
      previewPath: '',
      // 图片预览是否可见
      previewVisible: false
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
    },
    // 标签页切换前的钩子
    beforeLeaveTab(activeName, oldActiveName) {
      // console.log(activeName, 'to', oldActiveName)
      // 如果是从tab0切换来，并且goods_cat不是3级分类，就阻止切换并提示
      if (oldActiveName === '0' && this.addGoodsForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    // tab页签点击事件
    async tabClicked() {
      // 如果点击了activeIndex为1的页签，就发起请求获取参数
      if (this.activeIndex === '1') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
          params: { sel: 'many' }
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取商品参数失败')
        }
        // api获取的attr_vals是字符串，需要转成数组
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
        })
        this.manyTableData = res.data
        // console.log(res.data)
      } else if (this.activeIndex === '2') {
        // 点击了静态属性tab
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
          params: { sel: 'only' }
        })
        if (res.meta.status !== 200) return this.$message.error('获取静态属性失败')
        this.onlyTableData = res.data
      }
    },
    // 处理图片预览效果
    handlePreview(file) {
      console.log(file)
      this.previewPath = file.response.data.url
      this.previewVisible = true
    },
    // 处理图片删除
    handleRemove(file) {
      // 1.获取将要删除的图片的临时路径
      // 2.从Pics数组中找到这个图片的索引值，
      // 3.用数组splice方法移除这个对象
      const filePath = file.response.data.tmp_path
      const index = this.addGoodsForm.pics.findIndex(item => item.tmp_path === filePath)
      this.addGoodsForm.pics.splice(index, 1)
    },
    // 图片上传成功的钩子
    handleSuccess(response) {
      // console.log(response)
      // 1.先将图片信息保存为api规定格式的对象
      // 2.再将图片对象添加到数组中
      const picInfo = { pic: response.data.tmp_path }
      this.addGoodsForm.pics.push(picInfo)
      console.log(this.addGoodsForm)
    },
    // 关闭预览时清空图片
    previewClosed() {
      this.previewPath = ''
    },
    // 发起请求，添加商品
    addGoods() {
      // 预验证
      this.$refs.addGoodsFormRef.validate(async valid => {
        if (!valid) {
          return this.$message.error('表单验证失败，请填写正确后重试')
        }
        // 验证通过，执行添加的业务逻辑
        // 由于api的goods_cat只接受逗号分割的字符串，所以需要转换，但是goods_cat被绑定到el-cascader，其规定只允许绑定数组，直接转换字符串会报错
        // 视频中此处使用lodash插件的深拷贝复制了表单，在复制的表单上操作
        // 可能是为了演示lodash插件吧，不过我觉得也可以将原先的goods_cat改个名，从而解放goods_cat这个属性再复制，由于只有一层的数字元素数组需要复制，不需要用到深拷贝，而虽然表单对象里面多出了一个用于绑定的属性goods_cat2，反正api又不接收他，应该也可以
        const newForm = _.cloneDeep(this.addGoodsForm)
        newForm.goods_cat = newForm.goods_cat.join(',')
        // attrs属性用数组形式保存参数和属性，动态参数需要处理，转化为空格分隔的字符串，并且属性名略有不同
        this.manyTableData.forEach(item => {
          const attr = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' ')
          }
          this.addGoodsForm.attrs.push(attr)
        })
        // 静态属性的vals不需要join，因为动态参数需要用复选框组所以才转成数组，属性不需要就没转
        this.onlyTableData.forEach(item => {
          const attr = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.addGoodsForm.attrs.push(attr)
        })
        newForm.attrs = this.addGoodsForm.attrs
        // console.log(this.addGoodsForm)
        // console.log(newForm)
        const { data: res } = await this.$http.post('goods', newForm)
        if (res.meta.status !== 201) {
          // console.log(res)
          return this.$message.error('添加商品失败 原因:' + res.meta.msg)
        }
        // console.log(res)
        this.$message.success('添加商品成功')
        this.$router.push('/goods')
      })
    }
  },
  computed: {
    // 为了便于使用，将分类的id用计算属性表示
    cateId() {
      if (this.addGoodsForm.goods_cat.length === 3) {
        return this.addGoodsForm.goods_cat[2]
      }
      return null
    }
  }
}
</script>
<style lang="less" scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
.previewImg {
  width: 100%;
}
.addBtn {
  margin-top: 15px;
}
</style>
