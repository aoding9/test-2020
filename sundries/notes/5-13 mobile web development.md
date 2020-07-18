大阶段用===
===

*日期用斜体*  

描述记录---  
---

# 主题用#

## 标题用##

### 小标题###  

- 并列内容  
  - 二级并列内容  

#### 小小标题

大量并列的属性和描述等 用表格，少量用\`\`代码行  

结构用代码块  

*！注意点，要点，斜体*  
**案例粗体**  
图片命名：大标题序号-小标题序号-小序号  
css：大标题序号-小标序号    名称-日期


*5-13*


【05】移动端布局基础（流式布局+flex弹性布局）  
===

# 一.移动端基础+流式布局

## 了解移动端

### 常见移动端浏览器

- 国内常用的都是webkit修改来的内核，兼容移动端主流浏览器，处理webkit内核浏览器即可

### 手机屏幕现状

- 尺寸非常多，前端开发使用px，无需关注分辨率，了解即可

### 调试方法

- 谷歌浏览器调试工具模拟手机
- 搭建本地web服务器，手机服务器在同一个局域网内即可访问
- 使用外网服务器，直接ip或域名访问


## 视口

### viewport 就是浏览器显示页面内容的屏幕区域，分类如下：

- 布局视口  layout viewport
  - 一般移动端浏览器默认设置了一个布局视口，早期用于在手机上显示pc页面
  - iOS和Android基本都是980px，pc网页大多能在手机呈现，但是元素很小需要缩放，不方便
- 视觉视口  visual viewport
  - 指用户正在看到的网站区域
  - 可以缩放视觉视口，但不会影响布局视口，布局视口宽度不变
- 理想视口  ideal viewport
  - 苹果提出的，为了使网页在移动端有最理想的浏览和阅读宽度而设定，对设备来讲是最理想的视口尺寸
  - 需要手动添加meta视口标签，通知浏览器操作
  - meta视口标签的主要目的：布局视口宽度和理想视口一致，设备有多宽，布局视口就多宽

### meta 视口标签

`<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0">

| 属性          | 说明                                   |
| ------------- | -------------------------------------- |
| width         | 设置视口宽度，device-width表示设备宽度 |
| initial-scale | 初始缩放比，大于0的数                  |
| maximum-scale | 最大缩放比，大于0                      |
| minimum=scale | 最小缩放比，大于0                      |
| user-scalable | 用户是否可以缩放，yes或no（1或0）      |

## 二倍图

### 物理像素与物理像素比

- **CSS 像素（CSS Pixel）**
  又称为虚拟像素、设备独立像素或逻辑像素，也可以理解为直觉像素。CSS 像素是 Web 编程的概念，指的是 CSS 样式代码中使用的逻辑像素。

- **物理像素（pt）**

  pt（point，磅）：是一个物理长度单位，指的是72分之一英寸。

- pc端1px一般等于1物理像素，移动端开发中的1px不一定等于1物理像素

- 设备像素比（Device Pixel Ratio，DPR）：设备物理像素和逻辑像素的比值，称为物理像素比或屏幕像素比

>例如:iphone8中1px就对应屏幕上2物理像素

- pc和早期手机屏幕的1css像素=1物理像素
- 为了提高手机屏幕细腻程度，使用了一种Retina（视网膜屏幕）技术，将更多像素点压缩到一块屏幕里，从而达到更高分辨率
- 由于1css像素在手机屏幕上会变粗，因此1px细线显示出来会很粗，需要把他缩小

### 多倍图

- 由于使用Retina技术，图片在手机中会按物理像素比放大到原来的n倍，导致图片模糊
- 为解决此问题，需要提高图片质量，把图片预先放大n倍，然后缩放到屏幕上，这样缩放在当前倍数下就是无损缩放
- 背景图片处理方法类似
  *!精灵图处理方法：首先确定原图宽高和位置坐标，然后拿坐标除以物理像素比，因为图片会放大n倍，坐标也跟着放大了，需要缩小回原来的，并且通过bg-size:图片宽度的一半（用px） auto来缩放图片，另一种简单方法是，先把图片缩小n倍，再进行测量，这样不用计算*

```background-size:x y;```

- x是水平方向的长度，y是垂直方向的长度
- 只写一个默认是设置宽度，高度等比拉伸
- 单位      长度|百分比|cover|contain
- cover     表示背景等比例完全拉伸覆盖盒子，没有空白
- contain   表示等比拉伸，直到铺满宽或高，任一铺满就不管了，可能有空白

## 移动端开发主流方案

- 单独制作移动端页面（主流）    根据设备判断，手机打开单独的移动端页面
- 响应式页面兼容移动端（其次）  根据屏幕宽度判断样式，只有一个页面，但是制作麻烦，很多兼容性问题    

## 移动端技术解决方案

### 移动端以webkit为主，可以放心使用H5C3，私有前缀只需添加webkit

### css初始化：normalize.css(github上使用广泛的一个css初始化)

- 这个css保护了有价值的默认值，修复了浏览器bug，是模块化的，有详细文档

### C3盒子模型

- ```box-sizing:border-box;```
- 边框包括进盒子宽高，padding不撑大盒子尺寸
- ```box-sizing:content-box;```是传统盒子模型，宽高只算内容，不算宽高，pc考虑兼容性就用这个

### 特殊样式

```css
    *{
    /* webkit额外初始化 */
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
   
    /* 清除点击高亮 */
    -webkit-tap-highlight-color:transparent;
    }
    input{
    /* 移动端浏览器加上这个属性才能修改按钮和输入框自定义样式 */
    -webkit-appearance:none;
    }
    img,
    a{
    /* 禁用长按弹出的菜单 */
    -webkit-touch-callout:none;
    }
```

## 移动端常见布局

### 单独制作移动端页面

- 流式布局（百分比布局）
- flex弹性布局（强烈推荐）
- less+rem+媒体查询布局
- 混合布局

### 响应式页面兼容移动端

- 媒体查询
- bootstrap


*5-14*


## 流式布局

- 又名百分比布局，非固定像素布局
- 设置宽度为百分比，根据屏幕宽度进行伸缩，内容向两侧自动填充
- 是移动web开发比较常见的布局方式

### 实际中不能无限制放大缩小，需要加最大和最小宽或高

- max-width|max-height  最大宽度 高度
- min-width|min-height  最小宽度 高度
- 一般设置最大最小宽度就行

### 综合案例

**案例：1-1.京东移动首页流式布局.html**

#### 1.技术选型：

- 方案：单独制作移动页面
- 技术：流式布局

#### 2.搭建文件夹结构

- css+images+upload+index.html(案例名就不搞index.html了)

#### 3.设置视口标签，引入初始化样式

- 页面初始化样式，body100%，居中，限定最小最大宽度320px和960px，设置字体

```css
/* body初始化 */
body {
    margin: 0 auto;
    width: 100%;
    /* 设置最小最大宽度 */
    min-width: 320px;
    max-width: 640px;
    background: #fff;
    font-size: 1rem;
    font-family: -apple-system, Helvetica, sans-serif;
    line-height: 1.5;
    color: #666;
}
```

#### 布局分析

- header.app
- search-wrap
- main-content
- nav
- news

#### 结构

```html
<body>
    <!-- header -->
    <header class="app">
        <ul>
            <li>
                <img src="images/01-05.png">
            </li>
            <li>
                <img src="images/01-03.png">
            </li>
            <li>
                打开京东App，购物更轻松
            </li>
            <li>
                立即打开
            </li>
        </ul>
    </header>
    <!-- search -->
    <div class="search-wrap">
        <div class="search-btn"></div>
        <div class="search">
            <div class="jd-icon"></div>
            <div class="sou-icon"></div>
            <!-- <input type="search"> -->
        </div>
        <div class="search-login">登录</div>
    </div>

    <!-- main -->
    <div class="main-content">
        <div class="slider">
            <img src="upload/01-01.dpg" alt="">
        </div>
        <!-- 品牌日 -->
        <div class="brand">
          <!-- div*3 -->
          <div><img src="upload/01-10.dpg" alt=""></div>


        </div>
    </div>

    <!-- nav -->
    <div class="nav clearfix">
      <!-- a*10 -->
        <a href="#">
            <img src="upload/01-02.webp" alt="">
            <span>京东超市</span>
        </a>
    </div>
<!-- news -->
    <div class="news">
      <!-- a*3 -->
        <a href="#"><img src="upload/01-06.dpg" alt=""></a>
    </div>
</body>
</html>
```

# 二.flex布局

## flex是flexible box的缩写，意为弹性布局，具有极大灵活性，任何容器都可以指定为flex布局

- 父盒子设为flex布局后，子元素的float clear vertical-align属性将失效
- flex布局的别名：伸缩布局 弹性布局 伸缩盒布局 弹性盒布局

## 布局原理

- 采用flex布局的元素，称为flex container，简称“容器”,他的子元素自动成为容器成员，成为flex item，简称“项目”
- 子容器可以横向纵向自由排列
- 总结：通过给父级加flex属性，控制子盒子位置和排列方式

## 常见父项属性

| 父项属性        | 说明                                              |
| --------------- | ------------------------------------------------- |
| flex-direction  | 设置主轴方向                                      |
| justify-content | 设置主轴上的子元素排列方式                        |
| flex-wrap       | 设置子元素是否换行                                |
| align-content   | 设置侧轴上子元素排列方式（多行）                  |
| align-items     | 设置侧轴上子元素排列方式（单行）                  |
| flex-flow       | 复合属性，相当于同时设置flex-direction和flex-wrap |

### flex-direction 设置主轴方向

- flex布局中，分为主轴侧轴，同样的叫法：行和列，x轴y轴
- 默认主轴方向就是x轴方向，水平向右
- 默认侧轴方向就是y轴方向，垂直向下

#### 属性值

*!主轴侧轴是会变化的，确定谁是主轴后，垂直对应的另一条轴就是侧轴，子元素跟着主轴排列*

| 属性值         | 说明     |
| -------------- | -------- |
| row（默认）    | 从左到右 |
| row-reverse    | 从右到左 |
| column（默认） | 从上到下 |
| column-reverse | 从下到上 |

*W*  
reverse 翻转 颠倒 使相反 使反转
**案例：2-2.flex主轴方向.html**

### justify-content 设置主轴子元素排列方式

- 用于设置主轴对齐方式，使用前确认主轴是谁

#### 属性值

| 属性值          | 说明                                               |
| --------------- | -------------------------------------------------- |
| flex-start      | 默认值，从头部开始（沿主轴正方向）                 |
| flex-end        | 从尾部开始（沿主轴负方向）                         |
| center          | 主轴居中对齐，主轴是x轴就水平居中，是y轴就垂直居中 |
| space-around    | 平均分配剩余空间                                   |
| *space-between* | 先两边贴边，再平分剩余空间                         |

**案例：2-3.flex设置主轴元素排列方式.html**

### flex-wrap

默认情况下，flex项目不换行，装不下会缩小子元素宽度

#### 属性值

- nowrap    默认值，不换行
- wrap      自动换行
- wrap-reverse        翻转换行

### align-items (单行）设置侧轴排列方式

#### 属性值

| 属性值     | 说明                       |
| ---------- | -------------------------- |
| flex-start | 默认，侧轴正方向，上往下   |
| flex-end   | 侧轴负方向                 |
| center     | 垂直居中                   |
| stretch    | 子项元素在侧轴上平分父元素 |



### align-content （多行）设置侧轴排列方式

设置子项侧轴排列，并且只能用于子项出现换行的情况
*！单行无效，必须出现换行*

#### 属性值

| attribute value | explanation                              |
| --------------- | ---------------------------------------- |
| flex-start      | 默认，侧轴头部开始                       |
| flex-end        | 尾部开始                                 |
| center          | 侧轴居中                                 |
| space-around    | 平分剩余空间                             |
| space-between   | 子项在侧轴西安分部在两头，在平分剩余空间 |
| stretch         | 子项元素高度平分父元素高度               |

- 总结：单行用align-items 多行用align-content

**案例：2-4.flex侧轴对齐方式.html**

### flex-flow 复合写法

#### 是flex-direction和flex-wrap属性的复合属性

`flex-flow:row wrap;`

## 子项常见属性

### flex

- 定义子项分配剩余空间的份数，默认为0
- 是根据比例来分配的，先将所有flex相加得到总份数，然后分配flex值对应的宽
- 不要直接设置宽度，否则无效
  - flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
- `flex:1`拿来做整齐的模块非常方便

**案例：2-5.flex子项剩余空间份数.html**

### align-self 单独某个子项在侧轴的对齐方式

### order       定义项目排列顺序

- 数值越小越靠前，默认为0
- 和z-index不一样



*5-15*



## 综合案例

**案例：2-6.携程网移动端首页.html**

### 技术选型

单独制作移动端页面

### 搭建相关文件夹结构

css images upload index.html

### 引入样式，添加视口标签

```css
body {
    max-width: 540px;
    min-width: 320px;
    margin: 0 auto;
    font: normal 14px/1.5 Tahoma, "Lucida Grande", Verdana, "Microsoft Yahei", STXihei, hei;
    color: #000;
    background: #f2f2f2;
    /* 注意：此处是overflow-x:hidden,是禁止左右滑动屏幕，如果不加-x就会上下也不能滑动 */
    overflow-x: hidden;
    -webkit-tap-highlight-color: transparent;
}
a {
    text-decoration: none;
    color: #222;

}
div {
    box-sizing: border-box;
}
ul {
    list-style: none;
    padding: 0;
}
```

### 布局分析

#### search-index 主页搜索

- 固定定位，左右两个box，右边的固定宽高，然后左边flex:1自适应剩余空间，图标用伪元素+定位或者em标签

#### focus 焦点图

- 给个上内或外边距占掉上面脱标的search盒子位置，然后img100%即可

#### local-nav 本地导航

- 采取ul>li>a>span*2的做法，span1给统一排序的class做图标，方便选择器选取,最后flex:1平分;
- *!1.常用竖排图标+文字按钮做法，上面span放精灵图背景，下面span放文字*

*！2.给父级a加`display:flex;`，`flex-direction:column;`主轴改为y轴,`items-align:center;`侧轴居中对齐，子项`flex:1;`平分宽度*

*！3.图标的class要有相同前缀且有不同序号，方便统一设置样式，分别换图标*

*！flex子项也可以设置display:flex成为容器*

#### nav 主导航栏

- 制作圆角：border-radius+overflow:hidden
- 内部由三个相似的nav-common组成，其内部又可以分成三个相同的列，列里面再分相同宽高的上下两行，都可以用flex平分
  - nav-common给高度，然后设为容器
  - nav-items(nav-column)用flex:1平分
  - 后两个items设为容器，里面两个a，将主轴设为y轴，让a上下排
  - 最后给a设置样式，ta-center，行高，使其居中，颜色，字体，阴影
- 需注意，第一个a的背景图用的三倍图
- nav-common背景使用了渐变色

- `background: -webkit-linear-gradient(起始方位,起始颜色,末尾颜色);`
  - 方位用方位词表示，可同时写两个方位表示夹角方位，中间用空格分开

#### subnav-entry  侧导航入口

- ul>li>a>span+span 和上面差不多
- 需要注意的是，内容需要换行，flex-wrap:wrap+flex:20%
- flex可以是百分比，表示占父级容器主轴上剩余空间的百分比

#### sale-box   

- sale-hd>h2+a.more  绝对定位来做
  - h2是为了seo优化？ 把文字切掉
  - 右边a.more里，用伪元素的上、右边框+旋转做箭头
- sale-bd>(row>2a)*3     用flex:1平分，,a里放img，图片宽度100%即可


【06】移动web开发
===


# 三.rem适配方案

## 1.rem基础

- rem(root em)是一个相对单位，类似em，em是父元素字体大小
- 不同在于，rem基准是相对html元素大小（根元素）

>比如html字体为12px，则2rem就是24px

- 理解：rem是一种基于页面唯一html元素，用于比例式布局的相对单位
- 原理：将所有元素的尺寸和定位等布局数值，表示为和根元素字体大小的相对比例，只需修改根元素字体大小，即可进行全局等比缩放
- 具象化理解：类似透视，a是原稿，b是他在不同屏幕上的投射，只要改变视距c，b就会等比缩放，在这里，a就是实际像素px，b就是缩放后的rem，c就是根元素字体大小
- *rem相关计算（重要）*
  - 根font-size=1rem
  - 根font-size:屏幕px:元素px<br>=1rem:屏幕rem:元素rem<br>推导=>根font-size=屏幕px*1rem/屏幕rem<br>即                           =屏幕px/屏幕rem 	 （单位略）<br>以及=>元素rem=元素px\*1rem/根font-size<br>即                       =元素px/根font-size（单位略）
  - 元素px:屏幕px<br>=元素rem:屏幕rem<br>=元素占屏比<br>推导=>元素rem=元素屏占比*屏幕rem





- rem布局的好处是非常便于适配不同屏幕尺寸,只要改变根字体大小就能等比改变全局大小，实现总体控制

## 2.媒体查询

### 2.1 什么是媒体查询、他有什么用

Media Query是CSS3新语法

- 使用@media查询，可以针对不同屏幕尺寸设置不同样式
- 重置浏览器大小时，页面也会根据浏览器宽高重新渲染页面
- 针对手机平板等使用媒体查询非常方便

### 2.2 语法规范

```css
@media mediatype and|not|only (media feature) {
  CSS-Code;
}
```

- 用@media开通，声明媒体查询
- mediatype 媒体类型
- 关键字 and|not|only
- media feature 媒体特性 必须有小括号包含

#### 1. mediatype 查询类型

将不同终端设备划分成不同类型，称为媒体类型

- all 用于所有设备
- print 用于打印机和打印预览
- screen 用于电脑屏幕、平板电脑、智能手机等

#### 2.关键字

将媒体类型或多个媒体特性连接到一起，作为媒体查询的条件

- and  将多个媒体特性连接，与判断
- not  排除某个媒体类型，非判断
- only  指定某个特定媒体类型

#### 3.媒体特性

不同媒体类型具有各自不同的特性，注意要用小括号包含

- width 定义输出设备中页面的可见区域宽度
- min-width 定义输出设备中页面最小可见区域宽度
- max-width 定义输出设备中页面最大可见区域宽度

如`@media screen and (min-width:300px) and (max-width:800px){body{bgc:red}}`  表示屏幕宽度大于等于300px且小于等于800px时，设定body背景色为red

- 媒体查询好处是：根据不同屏幕尺寸改变不同样式
  *！min-width和max-width都是包含等于的*
  *！一般媒体查询按从小到大来设置，从大往小也可以，但是从小往大写，由于层叠性，大的能层叠小的一部分，可以少写一个限制最大宽度的代码，更加简洁*
  *！screen、and、单位px不能省略*
  **案例：3-1.媒体查询.html**



*5-16*



### 2.3 媒体查询+rem实现元素宽高自适应变化

直接给元素rem单位，针对不同屏幕设置不同的根f-s
**案例：3-2.媒体查询+rem实现元素变化.html**

### 2.4 引入资源（理解）

针对不同屏幕调用不同css文件，改变不同布局方案
`<link rel="stylesheet" media="screen and (max-width:640px)" href="xxx.css">`

## 3. Less基础

### 3.1 维护css的弊端

css是一门非程序式语言，没有变量、函数、SCOPE（作用域）等概念

- css需要书写大量看似没有逻辑的代码，冗余度较高
- 不便于维护及扩展，不利于复用
- css没有很好的计算能力
- 对非前端开发工程师来讲，往往因缺乏编写经验而难以写出组织良好易于维护的css代码项目

### 3.2 Less是什么，他有什么用

Less (Leaner Style Sheets)是一门css扩展语言，也称为css预处理器  

- 他并没有减少css功能，而是在现有语法上，加入了程序式语言特性  
- 引入了变量、混入（Mixin）、运算、函数等功能，极大简化了css的编写，降低了维护成本
  Less中文网址：[http://lesscss.cn](http://lesscss.cn)
- 常见css预处理器：Sass、Less、Stylus

### 3.3 Less安装

- 安装node.js  
  [http://nodejs.cn/download](http://nodejs.cn/download)
- 检查是否安装成功，cmd输入`node -v`
- 基于node.js在线安装Less，cmd输入`npm install -g less`
- 检查是否安装成功，cmd输入`lessc -v`

- 补充：环境变量配置，修改npm安装全局模块的路径，以及缓存的路径，以免占用C盘空间  
  步骤：在目标路径下创建node_global和node_cache文件夹，然后cmd:`npm config set prefix "路径\node_global"`和`npm config set cache "路径\node_cache"`，最后环境变量里添加`变量名NODE_PATH，变量值路径\node_global\node_modules`，编辑用户变量，`路径\node_global`  

具体教程：[点击这里](https://blog.csdn.net/zjh_746140129/article/details/80460965?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-6.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-6.nonecase)

### 3.4 less使用

- 新建一个后缀名为.less的文件，在里面书写
- 语句学习：变量、编译、嵌套、运算

#### 1.less变量

变量没有固定的值，可以随时改变
`@variable name: value`
注意事项：

- 必须@进行声明
- 不能包含特殊字符
- 不能以数字开头
- 大小写敏感

#### 2. less编译

安装easy less插件，保存时自动编译生成css文件

#### 3. less 嵌套

- 直接在父元素大括号里面写子元素
- 没有空格隔开的，如伪类 伪元素 交集选择器，应在前面加&符号

#### 4. less 运算

- less提供了+ - * /
- 运算符用空格隔开
- 参数可以是变量 颜色值 数字
- 如果只有一个有单位，就以他为准，如果两个有不同单位，以第一个参数为准
- 可以用括号改变计算顺序

## 4.rem适配方案

- 要做什么：让一些不能等比自适应的元素根据设备尺寸等比适配
- 要怎么做：用媒体查询获取设备尺寸，设置相应html的字体大小，然后rem作为页面元素单位，当html字体大小变化，元素尺寸跟着变化，实现等比缩放适配

### 4.1 rem实际开发适配方案原理

- 按照设计稿与设备宽度的比例，动态计算并设置html跟标签的font-size大小（媒体查询）
- CSS中，设计稿元素的宽 高 相对位置等取值，按照同等比例换算为rem为单位的值

### 4.2 适配方案技术使用

- 方案1：less+媒体查询+rem
- 方案2：flexible.js+rem
- 两种方案都存在，方案2更简单

### 4.3 实际开发适配方案1

#### 1.设计稿常见尺寸宽度

| 设备       | 常见宽度                                            |
| ---------- | --------------------------------------------------- |
| iphone 4.5 | 640px                                               |
| iphone678  | 750px                                               |
| android    | 常见320px/360px/375px/385px/400px/414px/500px/720px |

- 大部分4.7-5寸安卓设备为720px
- 一般以一两套效果图适应大部分屏幕，放弃极端屏或对其优雅降级，牺牲一些效果，现在基本以750为准

#### 2.动态设置html标签font-size大小

实际使用：

- 假设设计稿是750px
- 假设把屏幕15等分（也可以是10分20分）
- 那么html的font-size=50px
- 同理，在320px设备时，f-s为320/15，为21.33px
- 由于所有元素都是通过与根f-s的相对大小表示所占比例，统一了标准，所以无论怎么缩放，比例都不会变化
- 例如：100px*100px的盒子在750屏幕下，100/50转换为2rem，变成2rem\*2rem盒子
- 320屏幕下，htmlf-s为21.33px,则2rem=42.66px，宽高都是42.66，但宽高比例以及所占屏幕比例都和750设计稿相同，实现了不同屏幕下，页面元素盒子等比缩放的效果

#### 3.元素rem大小取值方法

- 最后的公式：页面元素rem值 = 页面元素px值 / （屏幕宽度px / 划分的份数）

- 屏幕宽度 / 划分的份数 就是html font-size的大小

- 即 页面元素rem值 = 页面元素px值 / html font-size字体大小

- 推导的公式

  - r f-s= s px/s rem

  - e rem=e px/r f-s (单位略)

  - e rem=e px*e屏占比

    

1.首先选一套标准尺寸，如750px为准

2.用屏幕尺寸 除以 划分的份数，得到html文字大小

3.用元素750px下的px值 除以 html字体大小，得到对应屏幕的元素rem值

*5-18*

### **5.案例：3-5.苏宁移动端首页.html**

##### 1.技术选型

- 方案：单独制作移动页面
- 技术：布局采取rem适配布局（less+rem+媒体查询）
- 设计图：本设计图采用750px设计尺寸

##### 2.搭建相关文件夹结构

- css+images+upload+index.html

##### 3.设置视口标签以及引入初始化样式

##### 4.设置公共common.less文件

- 新建common.less 设置最常见的屏幕尺寸，利用媒体查询设置不同的html字体大小，因为除了首页，其他页面也需要 
- 我们需要关心的常见尺寸：320px 360px 375px 384px 400px 414px 424px 480px 540px 720px 750px
- 划分的份数定为15等份
- *因为pc端也可以打开苏宁移动端首页，所以默认html字体大小为50px，注意这句话写最上面*

##### 5.新建index.less文件

- 新建index.less，里面写首页样式
- 将common.less引入index.less
  - 语法： `@import "common";`
  - @import是导入的意思，可以把一个样式文件导入到另外一个样式文件里面，link是把样式文件引入html页面
- 生成的index.css引入index.html

##### 6.body样式

```css
body {
    min-width: 320px;
    width: 15rem;
    margin: 0 auto;
    line-height: 1.5;
    font-family: Arial, Helvetica;
    background: #f2f2f2;
}
```

##### 7.结构

- search-content搜索框

  - 固定定位，两边给rem宽度，然后search用flex:1占满

  - classify  分类 (a>img)

  - search  搜索 (div>form>input)

  - login  登录 (a)

    

- banner  横幅 (div>img)

  - 要限定img宽度

- nav  导航

  - 用rem写宽高，左浮动
  - a>(img+span) 10个

### 6.rem适配方案2

简洁高效的rem适配方案flexible.js

#### 6.1 什么是flexible.js?

- 手机淘宝团队出的简洁高效移动端适配库
- 优点：再也不需要写不同屏幕的媒体查询，js帮我们处理
- 原理：将设备屏幕划分为10等份，但是不同设备下，比例还是一致的
- 使用方法：将他引入网页后，我们只要确定好当前设备的html文字大小即可
- 例如：设计稿750px，只要把html文字大小设为他的十分之一75px即可，页面元素rem值=设计稿元素px值 / 75 (单位别忘记)，剩余的让flexible.js去算
- *vscode插件 cssrem，自动px转换为rem，默认跟字体大小16px，需要到设置里搜索`cssroot`去修改*



*5-19*



#### 6.2 使用适配方案2制作苏宁移动端首页

##### 1.技术选型

- 方案：单独制作移动页面方案
- 技术：布局采取rem适配布局2（flexible.js+rem）
- 设计图：本设计图采用750px设计尺寸

##### 2.搭建相关文件夹结构

##### 3.设置视口标签，引入初始化样式，js文件

```html
<meta name="viewport" content="width=device-width, user-scaleable=0, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/index.css">
<!--引入js-->
<script src="js/flexible.js"></script>
```

##### 4. body样式

```css
body {
    
    min-width: 320px;
    /*由于没有设置媒体查询common，所以需要给body限制最大宽度，不过下面媒体查询有限制，这里就不用加了*/
    /*max-width:750px;*/
    /*flexible划分为了10份*/
    width: 10rem;
    margin: 0 auto;
    line-height: 1.5;
    font-family: Arial, Helvetica;
    background: #F2F2F2;
}
/*屏幕超出750px，就将根font-size设为75,让他按750设计稿显示，不超出*/
@media screen and (min-width: 750px) {
    html {
        /*flexible引入写在 引入css下面，所以媒体查询会被层叠，需要提权*/
        font-size: 75px !important;
    }
} 
```

**！注意：由于flexible设置字体大小随屏幕而变化，但我们不希望屏幕超出750px后他还继续变大，所以要手动限制**

**！媒体查询引入flexible写在 引入css下面，所以媒体查询会被层叠，需要提权**

##### 5.结构

结构跟方案1一样，css不一样

- search-content
  - classify
  - search
  - login



# 四.响应式布局

## 1.响应式开发

### 1.1原理

使用媒体查询针对不同宽度的设备进行布局和样式设置，从而适配不同设备

| 设备划分                 | 尺寸区间        |
| ------------------------ | --------------- |
| 超小屏幕（手机）         | 768px<~         |
| 小屏设备（平板）         | 768px<=~<992px  |
| 中等屏幕（桌面显示器）   | 992px<=~<1200px |
| 宽屏设备（大桌面显示器） | 1200px<=        |

**案例：4.1.1-响应式布局原理.html**

```css
        /* 超小屏幕 小于768 布局容器宽度100% */
        @media screen and (max-width:767px) {
            .container {
                width: 100%;
            }
        }

        /* 小屏幕 大于等于768 小于992 布局容器宽度750px */
        @media screen and (min-width:768px) {
            .container {
                width: 750px;
            }
        }

        /* 中等屏幕 大于等于992 小于1200 布局容器宽度970px */
        @media screen and (min-width: 992px) {
            .container {
                width: 970px
            }
        }

        /* 大屏幕 大于等于1200px 布局容器宽度1170 */
        @media screen and (min-width:1200px) {
            .container {
                width: 1170px;
            }
        }
```

`<div class="container">响应式布局首先要有布局容器</div>`



### 1.2响应式布局容器

- 响应式需要一个父级作为布局容器，配合子元素实现变化效果

- 原理：通过媒体查询改变布局容器大小，再改变里面子元素排列方式和大小，实现不同屏幕的布局样式变化

- 常见的响应式尺寸划分
  - 超小屏幕（手机，小于768px）：设置宽度为100%
  - 小屏幕（平板，大于等于768px）：设置宽度为750px
  - 中等屏幕（桌面显示器，大于等于992px）：设置宽度为970px
  - 大屏幕（大桌面显示器，大于等于1200px）：设置宽度为1170px

**案例：4.1.2-响应式导航栏.html**



 ***！已经有现成的，而自己写又慢又没辣么好，之后的内容，为提高效率，笔记采取复制+修改的方式进行***



## 2. Bootstrap前端开发框架

#### 2.1 Bootstrap简介

Bootstrap 来自 Twitter（推特），是目前最受欢迎的前端框架。Bootstrap 是基于HTML、CSS 和 JAVASCRIPT 的，它简洁灵活，使得 Web 开发更加快捷。

[中文网](lhttp://www.bootcss.com/)  [官网](lhttp://getbootstrap.com/)

框架：顾名思义就是一套架构，它有一套比较完整的网页功能解决方案，而且控制权在框架本身，有预制样式库、组件和插件。使用者要按照框架所规定的某种规范进行开发。

#### 2.2 bootstrap优点

+ 标准化的html+css编码规范
+ 提供了一套简洁、直观、强悍的组件
+ 有自己的生态圈，不断的更新迭代
+ 让开发更简单，提高了开发的效率

#### 2.3 版本简介

2.x.x：停止维护,兼容性好,代码不够简洁，功能不够完善。

3.x.x：目前使用最多,稳定,但是放弃了IE6-IE7。对 IE8 支持但是界面效果不好,偏向用于开发响应式布局、移动设备优先的WEB 项目。

4.x.x：最新版，目前还不是很流行

#### 2.4bootstrap基本使用

在现阶段我们还没有接触JS相关课程，所以我们只考虑使用它的样式库。

控制权在框架本身，使用者要按照框架所规定的规范进行开发

Bootstrap 使用四步曲： 

1. 创建文件夹结构

   - 单独创建bootstrap文件夹，将相关文件放进去

   

2. 创建 html 骨架结构 ，比一般的骨架多了个条件注释

   ```
   <!DOCTYPE html>
   <html lang="zh-CN">
     <head>
       <meta charset="utf-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
       <title>Bootstrap 101 Template</title>
   
       <!-- Bootstrap -->
       <link href="css/bootstrap.min.css" rel="stylesheet">
   
       <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
       <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    	<!--条件注释，解决ie9以下浏览器对h5新标签不识别，以及对c3媒体查询的不识别-->   
       <!--[if lt IE 9]>
         <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
         <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
       <![endif]-->
     </head>
     <body>
       <h1>你好，世界！</h1>
   
       <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
       <script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
       <!-- Include all compiled plugins (below), or include individual files as needed -->
       <script src="js/bootstrap.min.js"></script>
     </body>
   </html>
   ```

   

3. 引入相关样式文件  

   ```
   <!-- Bootstrap 核心样式-->
   <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
   ```

   

4. 书写内容 

   直接拿Bootstrap 预先定义好的样式来使用

   修改Bootstrap 原来的样式，注意权重问题

   学好Bootstrap 的关键在于知道它定义了哪些样式，以及这些样式能实现什么样的效果

#### 2.5 bootstrap布局容器

Bootstrap 需要为页面内容和栅格系统包裹一个 .container 或者.container-fluid 容器，它提供了两个作此用处的类。

.container

+ 响应式布局的容器  固定宽度
+ 大屏 ( >=1200px)  宽度定为 1170px
+ 中屏 ( >=992px)   宽度定为  970px
+ 小屏 ( >=768px)   宽度定为  750px
+ 超小屏  (100%) 

.container-fluid

+ 流式布局容器 百分百宽度
+ 占据全部视口（viewport）的容器。

#### 2.6 bootstrap栅格系统

Bootstrap提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。

栅格系统用于通过一系列的行（row）与列（column）的组合来创建页面布局，你的内容就可以放入这些创建好的布局中。

+ 按照不同屏幕划分为1~12 等份
+ 行（row） 可以去除父容器默认的15px的边距
+ xs-extra small：超小； sm-small：小；  md-medium：中等； lg-large：大；
+ 列（column）大于 12，多余的“列（column）”所在的元素将被作为一个整体另起一行排列
+ 每一列默认有左右15像素的 padding
+ 可以同时为一列指定多个设备的类名，以便划分不同份数  例如 class="col-md-4 col-sm-6"

**栅格嵌套**

栅格系统内置的栅格系统将内容再次嵌套。简单理解就是一个列内再分成若干份小列。我们可以通过添加一个新的 .row 元素和一系列 .col-sm-* 元素到已经存在的 .col-sm-*
元素内。

```
<!-- 列嵌套 -->
 <div class="col-sm-4">
    <div class="row">
         <div class="col-sm-6">小列</div>
         <div class="col-sm-6">小列</div>
    </div>
</div>

```

**列偏移**

使用 .col-md-offset-* 类可以将列向右侧偏移。这些类实际是通过使用 * 选择器为当前元素增加了左侧的边距（margin）。

```
 <!-- 列偏移 -->
  <div class="row">
      <div class="col-lg-4">1</div>
      <div class="col-lg-4 col-lg-offset-4">2</div>
  </div>

```

**列排序**

通过使用 .col-md-push-* 和 .col-md-pull-* 类就可以很容易的改变列（column）的顺序。

```
 <!-- 列排序 -->
  <div class="row">
      <div class="col-lg-4 col-lg-push-8">左侧</div>
      <div class="col-lg-8 col-lg-pull-4">右侧</div>
  </div>

```

**响应式工具**

为了加快对移动设备友好的页面开发工作，利用媒体查询功能，并使用这些工具类可以方便的针对不同设备展示或隐藏页面内容。

主要就是.hidden-\*和.visible-\* 分别设定元素在指定大小屏幕下隐藏或显示

| 类名       | 超小屏 | 小屏 | 中屏 | 大屏 |
| ---------- | ------ | ---- | ---- | ---- |
| .hidden-xs | 隐藏   | 可见 | 可见 | 可见 |
| .hidden-sm | 可见   | 隐藏 | 可见 | 可见 |
| .hidden-md | 可见   | 可见 | 隐藏 | 可见 |
| .hidden-lg | 可见   | 可见 | 可见 | 隐藏 |





### 3.0 阿里百秀案例制作

#### 3.1 技术选型

方案：我们采取响应式页面开发方案

技术：bootstrap框架

设计图： 本设计图采用 1280px 设计尺寸

项目结构搭建

Bootstrap 使用四步曲： 

1. 创建文件夹结构  

2. 创建 html 骨架结构  
3. 引入相关样式文件  
4. 书写内容 

container宽度修改

因为本效果图采取 1280的宽度， 而Bootstrap 里面 container宽度 最大为 1170px，因此我们需要手动改下container宽度

```
 /* 利用媒体查询修改 container宽度适合效果图宽度  */
  @media (min-width: 1280px) { 
    .container { 
	width: 1280px; 
     } 
   }

```



*5.21*

*案例完成，笔记完成，前面内容有些遗忘，复习一下前面h5c3基础和移动布局所有内容，尝试写课程里的作业，over*



#### 3.2 开始布局

##### 1.布局思路：由于中屏和大屏布局类似，变化主要在小屏和超小屏，所以先写中屏，然后去修改适配小屏和超小屏

##### 2. 行列布局分析

- 首先要一个div.container布局容器
- 容器里面有一行row，row里面分成三列，在中屏幕以上，按照2-7-3划分
- 第一列 header>. logo+.nav
- 第二列 article> .news+.publish
- 第三列 aside> .banner+.hot

##### 3. header头部部分

- padding:0;去除bootstrap默认内边距
- .logo>img
  - img
    - margin:0 auto居中(行内块不能直接设margin:0 auto，需要转换display:block)
    - 小屏时图片不缩放，所以用max-width:100%限制
- .news>ul>li> a+span
  - .nav
    - 背景色 #eee
    - 下边框
  - li
    - 高度，行高写死，加一个左内边距
  - a
    - 修改颜色 字体大小 下划线
    - hover伪类 背景白色
  - span
    - 用bootstrap的图标类设置图标
    - 用vertical-align:center让图标中线对齐
    - 加5px右外边距

##### 4. article文章部分

- .news>ul>li>a> img+p
  - .news
    - 清除浮动（因为有个下边框，需要高度）
  - li
    - 左浮动
    - 宽高，第一个li宽50%，高266，其余宽25%，高128
    - 通过设置padding-right:10px来留白色缝隙
    - 用margin-bottom:10px做下方白色缝隙，不能用padding-bottom，那样会多出一个下边距，会使图片不整齐（除非改高度）
  - a
    - 子绝父相，相对定位
    - 转换为block，然后设宽高100%
  - img
    - 宽高百分百
  - p
    - position:absolute绝对定位，left0 bottom0
    - 宽100%高41px背景rgba(0,0,0,.5)
    - margin-bottom:0覆盖掉bootstrap的p标签默认下外边距
    - padding:4px 10px 文字调位置，第一个li的p字少些要padding-top:6px，使其垂直居中
    - font-size:12px，第一个li里面p字大一些20px

- .publish>.row> (div> (h3+p+p+p)+div>img)
  - 上边框
- .row
  - row里面分成左9右3两列（小屏以上都是如此）
  - 每行一个下边框
  - padding:10px 0;  改掉默认的上下内边距
  - margin:0;  改掉默认的外边距

- .pic img 放图片
  - 宽100% 图片宽度自动拉伸
  - margin-left:5px 如果图片位置不对，可以用margin-left来调整，但是margin-right不行，因为是左对齐，右边没有东西让他去挤了

##### 5. aside侧边栏

- aside> a.banner+a.hot

- .banner>img

- img

  - 宽度100%

- a.hot> span+h4+p

- a.hot 热搜

  - 转换为block，

    *！注意，a标签如果不转换为block，虽然内部嵌套的标签仍然可以点击，属于超链接一部分，但嵌套的标签不会撑开他的宽高，边框设置后只有padding撑开盒子，不是理想效果*

  - margin-top:20px,padding:0 20px 20px;

- span

  - 调用btn btn-primary类做蓝色图标，并去掉圆角

- p

  - 设置font-size为12px

##### 6. 响应式修改

懒得写了，直接复制进来。。。

```css
/* 写在下面可以防止同级层叠失效（写在上面也可以，提权即可） */
/* 根据设计稿，修改container最大宽度为1280px */
@media screen and (min-width:1280px) {
    .container {
        width: 1280px;
    }
}
@media screen and (max-width:991px) {
    /* 当进入小屏，nav的li浮动，li宽度为五等分 */
    .nav li {
        float: left;
        width: 20%;
    }
    /* 当进入小屏，article添加上边距 */
    article {
        margin-top: 10px;
    }
}
@media screen and (max-width:767px) {
    /* 进入超小屏导航文字变小，左内边距变小以防排不下 */
    .nav li a {
        font-size: 14px;
        padding-left: 5px;
    }
    /* 超小屏改变news li宽度，隐藏部分文字和图片 */
    .news li {
        width: 50%;
    }
	/*第一个li之前加了右内边距，现在要清掉*/
    .news ul li:nth-child(1) {
        width: 100%;
        padding-right: 0;
    }
	/* 字体变小，文字加粗 */
    .publish h3 {
        font-weight:700;
        font-size: 14px;
    }
}
```

- 另外需要改的地方，超小屏下
  - logo会隐藏，里面用span文字代替显示，利用hidden-xs和visible-xs即可
  - news会隐藏部分内容，给他加hidden-xs类

大概就这样了。。。



