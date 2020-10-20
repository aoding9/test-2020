import Vue from 'vue'
// *按需导入组件
import { Button, Form, FormItem, Input, Message } from 'element-ui'

// *使用组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// Message要挂载到Vue的原型上 便于使用
Vue.prototype.$message = Message
