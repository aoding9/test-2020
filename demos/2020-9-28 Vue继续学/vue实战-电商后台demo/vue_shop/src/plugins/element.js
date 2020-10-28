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
  MessageBox,
  Tag,
  Tree,
  Select,
  Option,
  Cascader,
  Alert,
  Tabs,
  TabPane,
  Steps,
  Step
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
// tag标签组件
Vue.use(Tag)
// 树形控件
Vue.use(Tree)
// 下拉输入框和下拉选项
Vue.use(Select)
Vue.use(Option)
// 级联选择器
Vue.use(Cascader)
// alert提示组件
Vue.use(Alert)
// tab页签
Vue.use(Tabs)
Vue.use(TabPane)
// 步骤条组件
Vue.use(Steps)
Vue.use(Step)
// Message提示信息要挂载到Vue的原型上 便于使用
Vue.prototype.$message = Message
// 消息提示框，和message一样也是要全局挂载
// 通过挂载confirm方法到$confirm，可以全局使用确定提示框，
Vue.prototype.$confirm = MessageBox.confirm
