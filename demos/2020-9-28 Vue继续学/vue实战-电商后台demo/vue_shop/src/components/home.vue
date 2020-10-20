<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button></el-header
    >
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <!-- 折叠展开切换时修改侧边栏宽度 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 展开折叠按钮 -->
        <!-- el-menu的collapse属性可以控制菜单的折叠与展开，用方法切换布尔值 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <!-- active-text-color:当前激活菜单的颜色
        unique-opened:布尔值，是否只保持一个子菜单的展开
        collapse:布尔值，是否折叠菜单，默认为false,即展开
        collapse-transition:布尔值，是否开启折叠过渡动画
        router:布尔值，表示是否为菜单开启路由模式，开启后，点击菜单，将以该菜单对应的index属性的值为路由地址进行跳转
        default-active: 默认激活哪个菜单
        -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <!-- index属性需要动态指定，否则点一个其他也展开了，并且要转成字符串格式 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <!-- 将index属性绑定为item.path，并且在前面拼接一个/，在开启菜单的路由模式后，就可以直接跳转对应的path了  -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <!-- 二级菜单模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体区域 -->
      <el-main>
        <!-- 子路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单列表的数组
      menulist: [],
      // 定义menu的字体图标对象，手动地用菜单id做key，图标class做value，然后遍历的同时拿到class
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      // 是否折叠菜单，默认不折叠
      isCollapse: false,
      // 用于保存被激活的导航菜单地址
      activePath: ''
    }
  },
  // 页面加载就获取所有菜单
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 退出功能
    // 清空sessionStorage，然后跳转到/login
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取菜单列表
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.message)
      // 请求成功，将res.data挂载到组件的data.menulist上
      this.menulist = res.data
    },
    // 切换折叠展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存导航菜单激活状态
    saveNavState(activePath) {
      // 当二级菜单被点击时，将新的被激活的地址保存到session，并且将data里面的activePath也改为新的
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
// home页布局容器
.home-container {
  height: 100%;
}
// 头部区域
.el-header {
  background-color: #373d41;
  display: flex;
  // 主轴分布：开头结尾贴边，中间平分间隔
  justify-content: space-between;
  padding-left: 0;
  // 侧轴居中
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    // 侧轴居中
    align-items: center;
    span {
      // 文字左外边距
      margin-left: 15px;
    }
  }
}
// 左侧侧边栏区域
.el-aside {
  background-color: #333744;
  // .el-menu去掉右侧边框
  .el-menu {
    border-right: none;
  }
}
// 右侧内容主体
.el-main {
  background-color: #eaedf1;
}
// 字体图标右边距
.iconfont {
  margin-right: 10px;
}
// 折叠展开按钮
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  letter-spacing: 0.2em;
}
</style>
