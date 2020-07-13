## Vue Day1

### 一、邂逅Vuejs

#### 1.认识Vuejs

- vue的读音

  > 读音 /vjuː/，类似于 **view**

- vue的渐进式

  > Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与[现代化的工具链](https://cn.vuejs.org/v2/guide/single-file-components.html)以及各种[支持类库](https://github.com/vuejs/awesome-vue#libraries--plugins)结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

- vue的特点

  - 轻量级框架
  - 声明式渲染，简单易学
  - 双向数据绑定
  - 组件化
  - 视图,数据,结构分离
  - 虚拟DOM
  - 运行速度更快

#### 2.安装vue

- CDN引入

  > 开发 <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  >
  > 生产 <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>

- 下载引入

- npm安装

#### 3 .vue初体验

- Hello Vuejs
  - mustache --> 体验vue响应式
- vue列表展示
  - v-for
  - 响应式追加数组元素
  - 用数组下标修改数组元素，不会触发响应式
- vue计数器案例
  - 事件监听:click --> methods

#### 4.vue中的MVVM

#### 5.vue实例的options

- el: vue实例挂载的位置
- data:存放数据，组件里则存放方法
- methods：定义vue实例的方法
- 生命周期函数
- computed：定义计算属性



### 二、插值语法

#### 1.mustache语法 将数据绑定到文本节点，动态渲染

#### 2.vue指令

- v-once 只响应一次数据变化
- v-html 解析html标签
- v-text 将变量渲染到文本节点，会全部覆盖原先内容，不够灵活
- v-pre 不解析，直接显示原本内容
- v-cloak 判断是否解析的标志，解析后将会移除自身



### 三、v-bind指令

> 语法 v-bind:attribute="xxx"

> 动态绑定元素属性

> 语法糖   :attribute

#### 1.动态绑定基本属性

- v-bind:src
- v-bind:href

#### 2.动态绑定class

- 对象语法

  > :class='{className: boolean}'

- 数组语法（用得不多）

  > :class='[className1,className2]'

#### 3.动态绑定style

- 对象语法

  > :style= '{key:  value}'

- 数组语法（用得不多）

  > :style= '[{key: value}]'



### 四、computed计算属性

#### 1.案例一：简单操作 firstName+lastName

#### 2.案例二：复杂操作 books-->price