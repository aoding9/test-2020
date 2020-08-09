// 模块引入
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

//初始化
const app = express();

// 实现静态资源访问功能
app.use(express.static(path.join(__dirname, "public")));
// 拦截json格式post请求参数
app.use(bodyParser.json());

// 路由
// 01
app.get("/first", (req, res) => {
  res.send("我是/first");
  // res.status(400).send('我是/first');
});

// 监听3000端口
app.listen(3000);
console.log("网站服务器启动成功");
