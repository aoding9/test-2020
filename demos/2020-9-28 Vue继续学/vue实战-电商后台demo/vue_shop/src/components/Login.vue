<template>
  <!-- 登录页容器 -->
  <div class="login_container">
    <!-- 登录框=区域 -->
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 表单区域 -->
      <!-- 通过:model绑定model属性到data里面定义的表单对象，然后input用v-model双向绑定表单对象的属性 -->
      <!-- 通过:rules绑定表单验证规则对象，需要在data定义规则对象 -->
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名区域 -->
        <!-- 验证规则需要为el-form-item添加prop属性，指定使用哪个验证规则 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码区域 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 登录表单验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      // console.log(this.$refs) 用$refs属性获取到引用对象里面的loginForm，里面有内置的重置表单方法resetFields
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      // 用$refs属性获取到引用对象里面的loginForm，里面有内置的验证表单方法validate，参数是处理结果的回调函数，接收一个布尔值形参valid，表示验证是否通过
      // api返回值是promise对象，用async await简化处理
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return
        // 通过验证，用axios发送post登录请求
        // const result = await this.$http.post('login', this.loginForm)
        // console.log(result)
        // result里面的data是服务器响应数据，其他的是axios封装的暂时不需要，用解构赋值拿到data，并且重命名为res
        const { data: res } = await this.$http.post('login', this.loginForm)
        console.log(res)
        // 可以根据res里面的状态码判断是否登录成功
        // 通过引入elementui中的message组件，并且挂载到vue原型上，调用this.$message.error等，显示提示信息
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // 1.登录成功后将token保存到sessionStorage中，因为有些接口要登录后才能访问，并且只在站点打开期间生效
        // 2.通过编程式导航跳转到后台主页，路由地址是/home
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 登录页容器
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
// 登录区域
.login_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  border-radius: 5px;
  background-color: #fff;
  // 头像框
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  // 表单区域
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px 0;
    box-sizing: border-box;
  }
  // 按钮区域
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
