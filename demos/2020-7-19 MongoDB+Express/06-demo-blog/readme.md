# 项目环境搭建
## 一、案例初始化

### 1.建立项目所需文件夹
- public 静态资源
- model 数据库操作
- route 路由
- views 模板

### 2.初始化项目描述文件
- npm init

### 3.下载项目所需第三方模块
- npm install express mongoose art-template express-art-template body-parser

### 4.创建网站服务器
- 引用express框架，创建网站服务器对象，监听端口

### 5.构建模块化路由
- 在route目录新建路由模块文件，引用express框架，创建路由对象，设置一级路由，导出路由对象
- 入口文件引用路由模块
- 拦截请求，匹配对应路由

### 6.构建博客管理页面模板
- 复制静态文件到public
- 开放静态资源文件
- 复制html文件到views，修改为art后缀
- 配置模板默认路径和后缀，以及art后缀模板使用的模板引擎
- 渲染模板
- 修改模板
  - 外链静态资源路径处理
    - 模板文件中，外链静态资源必须写绝对路径
    - 外链静态资源相对路径是相对客户端的请求路径，浏览器会把localhost/admin/login中的/admin当成相对目录，login当成文件，而css则是/admin下的文件
    - 若public和views下文件夹都叫admin，则可以访问到，但如果他们文件夹名字不同，则无法访问到
    - 加上/就代表绝对路径，这里就是public目录了，然后/admin或者/home
    - 可以先只改几个看看效果，之后抽离公共部分了再处理
  - 优化模板，抽离公共部分
    - 观察页面，找出重复的部分=》找到对应的代码
    - 新建common目录，新建art子模板，将公共代码剪切过来
    - {{include 子模板}}引入回来 （子模板相对路径就是相对当前文件，因为他是服务器端模板引擎来解析，而不是浏览器解析
    - 新建骨架模板，复制骨架，留坑，继承骨架模板，填坑


## 二、项目功能实现

### （一、登录
#### 1.创建用户集合，初始化用户
- 连接数据库
  - 在module文件夹新建connect.js，引用mongoose模块，连接blog数据库，然后入口里引入connect.js
- 创建用户集合
  - 同样新建user.js，引用xx模块，创建集合规则，根据业务需要设定字段，创建集合，导出集合（对象形式
- 初始化用户
  - 创建一个测试用户，入口导入模块测试一下，之后删掉或者注释掉相关代码

#### 2.为登录表单项设置请求地址，请求方式以及表单项name属性
- get方式不安全，用post
- 请求地址为/admin/login
#### 3.当用户点击登录按钮时，客户端验证用户是否填写了登录表单
- 在下面写前端验证的js代码
  - 首先获取到form的dom，阻止默认提交事件，用jQuery提供的serializeToJson()获取form信息
  - 写一个serializeToJson()来将信息转换为json格式
    - serializeToJson()返回值是对象数组，[{name: 'email', value: '输入的内容'}]，获取到他，然后遍历，将name对应的值设置为新对象的属性，然后将value对应的值赋值给这个属性
    - 返回新对象
    - 由于其他地方可能也用到这个函数，将其保存到public/admin/js/common.js，然后引入到骨架模板
#### 3.如果其中一项没有输入，阻止表单提交
  - 进行表单内容的一系列判断，如果不通过就return false阻止提交，同时给出提示信息
  - 当验证通过，则允许提交
#### 5.服务端接收请求参数，验证用户是否填写了登录表单
#### 6.如果其中一项没有输入，为客户端作出响应，阻止程序向下执行
#### 7.根据邮箱地址查询用户信息
#### 8.如果用户不存在，微客户端作出响应，阻止程序向下执行
#### 9.如果用户存在，将用户名和密码进行比对
#### 10.比对成功，用户登录成功
#### 11.比对失败，用户登录失败

### （二、项目包含的知识点
#### 1.密码加密 bcrypt
- 哈希加密是单程加密方式，但是可以比对密码库来暴力破解，所以要在加密的密码中加入随机字符串增加破解难度
- 安装模块和依赖环境
  - python 2.x
  - node-gyp 此模块需要全局安装 => npm i -g node-gyp
  - windows-build-tools 此模块需要用管理员权限的powershell全局安装 => npm i -g --production windows-build-tools
  - 然后安装bcrypt => npm i bcrypt

#### 2.cookie和session
- 安装express-session模块
- 导入模块，在登录成功的路由里，将用户名存储到req.session对象中
- 由于很多地方用到username，所以将user信息存到app.locals.userInfo开放给模板
- 注意，在修改文件后，服务器重启了，这时原有cookie会失效，需要重新登录获取新的cookie

#### 3.代码优化

#### 修改 删除 用户 文章

懒得写了。。。

# 省略若干。。。

#### mongoDB数据库添加账号
***用默认的账号不安全，实际项目需要创建单独的数据库用户来读写数据库***
- 管理员运行powershell
- 连接数据库 mongo
- 查看数据库 show dbs
- 切换到admin数据库 use admin
- 创建超级管理员账户  db.createUser()
  - db.createUser({user:'root',pwd:'root',roles:['root']})
- 切换到blog数据 use blog
- 创建普通账号 db.createUser()
  - db.createUser({user:'admin123',pwd:'admin123',roles:['readWrite']})
- 卸载mongodb服务
  - 停止服务 net stop mongodb
  - 卸载服务 mongod --remove
- 创建mongodb服务
  - mongod --logpath="日志保存目录\文件名" --dbpath="数据保存目录" --install --auth
  - --auth表示必须要用户密码登录后才允许修改数据库
  - mongod --logpath="C:\Program Files\MongoDB\Server\4.2\log\mongod.log" --dbpath="C:\Program Files\MongoDB\Server\4.2\data" --install --auth
- 启动mongodb服务 net start mongoDB
*此时启动网站服务器，再登录，后台报错，find requires authentication 意思是find()需要身份验证*
- 在项目中使用账号连接数据库
  - mongoose.connect('mongodb://user:pass@localhost:port/database')


### 开发环境与生产环境
#### 是什么？
- 环境就是项目运行的地方，开发阶段在开发人员电脑上，开发完放到服务器上，项目所处就是生产环境
#### 为什么？
- 不同环境的配置不一样，需要在项目代码中判断当前项目运行环境，根据不同环境应用不同项目配置
#### 怎么做
- 通过电脑操作系统中的系统环境变量区分当前是开发环境还是生产环境
  - 手动加系统环境变量NODE_ENV:development 或者 set NODE_ENV=development通过命令来添加 // windows使用set，Mac和Linux上set要换export
  - 修改后要重新打开powershell
- 通过全局对象process.env.NODE_ENV获取系统环境变量的值，判断环境
#### morgan第三方模块 打印客户端请求信息
- app.use(morgan('dev'));

#### config第三方模块 允许将不同运行环境的配置信息抽离到单独文件中，模块自动判断环境并读取配置信息
- npm install config 
- 根目录新建config文件夹，新建 default.json development.json production.json
- 导入模块，用模块的config.get()方法获取配置信息
- 将敏感信息存储在环境变量中
  - config目录新建custom-environment-variables.json
  - 把敏感配置项写到custom里面，属性值写系统环境变量的名字，然后把真正的值写到系统环境变量
  - 项目运行时config模块会查找系统环境变量，将其值作为当前配置项的值