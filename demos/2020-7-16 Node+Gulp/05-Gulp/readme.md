
### 使用步骤
- gulp库文件只有当前项目可用，所以是安装在项目根目录而不是全局安装
- 切换到项目根目录，使用// npm install gulp --save-dev下载gulp库文件 --save-dev表示开发依赖，后续打包生产版本时，不会安装开发依赖的模块
- 在项目根目录建立gulpfile.js
- 重构项目的文件夹结构 src目录放置源代码文件 dist目录放构建后的文件
- 在gulpfile.js文件中编写任务
- 在命令行工具中执行gulp任务



### package.json文件
- 有时需要复制项目文件夹到其他电脑，由于装了很多模块，复制会很慢
- 另外模块有时会更新，导致项目报错
- 为了解决这些问题，可以使用npm init生成package.json文件，里面有项目的描述，保存安装了哪些模块以及版本，之后不用复制node_modules文件夹，别人可以用npm install或者npm install --production来根据package.json自动下载对应的模块
- 安装依赖时自动生成package-lock.json，记录了模块的依赖关系，模块版本，下载的地址=》锁定包的版本，不用再次识别依赖关系，加快下载安装速度

### 项目依赖和开发依赖
- 安装的时候加--save或者省略是项目依赖安装，加--save-dev就是开发依赖，线上版本不需要安装开发依赖，到时候直接npm install --production安装项目依赖