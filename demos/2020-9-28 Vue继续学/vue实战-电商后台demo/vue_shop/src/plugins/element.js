import Vue from 'vue'
// *按需导入组件
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  BreadcrumbItem,
  Breadcrumb,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox
} from 'element-ui'

// *使用组件
// 按钮
Vue.use(Button)
// 表单
Vue.use(Form)
Vue.use(FormItem)
// 输入框
Vue.use(Input)
// 布局容器
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
// 导航菜单
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
// 面包屑导航
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
// 卡片视图
Vue.use(Card)
// 栅格系统
Vue.use(Row)
Vue.use(Col)
// 表格
Vue.use(Table)
Vue.use(TableColumn)
// 开关按钮
Vue.use(Switch)
// 鼠标进入显示的文字提示框
Vue.use(Tooltip)
// 分页器
Vue.use(Pagination)
// 对话框
Vue.use(Dialog)
// Message提示信息要挂载到Vue的原型上 便于使用
Vue.prototype.$message = Message
// 消息提示框，和message一样也是要全局挂载
// 通过挂载confirm方法到$confirm，可以全局使用确定提示框，
Vue.prototype.$confirm = MessageBox.confirm
