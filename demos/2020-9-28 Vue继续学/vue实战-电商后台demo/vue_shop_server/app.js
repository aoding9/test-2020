const express = require('express')
// 开启gzip压缩，安装插件，然后注册中间件，他必须在静态资源托管的前面
// npm i compression -S
const compression = require('compression')

// 配置https访问，需要申请https证书放到服务器里，然后配置
const https = require('https')
const fs = require('fs')

const app = express()

// 配置https对象
const options = {
  cert: fs.readFileSync('./full_chain.pem'),
  key: fs.readFileSync('./private.key')
}

// 必须在托管静态资源前面
app.use(compression())

app.use(express.static('./dist'))

app.listen(80, () => {
  console.log('http://127.0.0.1')
})

// 创建https服务
// https.createServer(options, app).listen(443)

// pm2管理网站服务
// npm i pm2 -g
// 启动项目 pm2 start 脚本名 --name
// 查看项目 pm2 ls
// 停止 pm2 stop 项目名/id
// 重启 pm2 restart 删除 delete
