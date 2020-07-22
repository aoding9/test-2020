// 大致思路
// 1.搭建网站服务器，实现客户端与服务器通信
// 2.连接数据库，创建用户集合，向集合导入文档
// 3.当用户访问/list时，将所有用户信息查询出来
//  a.实现路由功能
//  b.呈现用户列表页面
//  c.从数据库中查询用户信息，将用户信息展示到列表里
// 4.将用户信息和表格HTML进行拼接，并将凭借结果响应给客户端
// 5.当用户访问/add时，呈现表单页面，并实现添加用户信息功能
// 6.当用户访问/modify时，呈现修改页面，并实现修改用户信息功能
//  a.增加页面路由，呈现页面
//    （1.在点击修改按钮时，将用户id传递到当前页面
//    （2.从数据库查询当前用户信息，将数据展示到页面中
//  b.实现用户修改功能
//     （1.指定表单的提交地址及请求方式
//     （2.接收客户端提交的信息，找到用户，并修改用户信息
// 7.当用户访问/delete时，实现删除用户功能

// 模块引入
const http = require("http");
const mongoose = require("mongoose");
const url = require("url");
const querystring = require("querystring");

// 数据库连接
mongoose
  .connect("mongodb://localhost:27017/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("数据库ok"))
  .catch(() => console.log("数据库连接失败"));

// 定义模型结构
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  age: {
    type: Number,
    min: 18,
    max: 80,
  },
  password: String,
  email: String,
  hobbies: [String],
});

// 编译模型构造器
const User = mongoose.model("User", userSchema);

// 去导入一下数据库 mongoimport -d playground -c users --file .\user.json

// 服务器对象
const app = http.createServer();
app.on("request", async (req, res) => {
  const method = req.method;
  const { pathname, query } = url.parse(req.url, true);
  // 路由
  if (method == "GET") {
    // 呈现list页面
    if (pathname == "/list") {
      // 使用异步函数来获取数据，使用await关键字，因此需要修改上面的处理函数为异步函数，添加async关键字
      let users = await User.find();
      // console.log(users);

      // 拼接内容，将数据填充到模板里面
      let content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>用户列表</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
        </head>
        <body>
          <div class="container">
            <h6>
              <a href="/add" class="btn btn-primary">添加用户</a>
            </h6>
            <table class="table table-striped table-bordered">
              <tr>
                <td>用户名</td>
                <td>年龄</td>
                <td>爱好</td>
                <td>邮箱</td>
                <td>操作</td>
              </tr>
      `;
      // 对数据循环遍历，find()查询结果是数组，所以可以forEach()
      users.forEach(item => {
        content += `
        <tr>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>
        `;
        // 其中hobbies是数组，但是模板字符串里面不能嵌套循环，所以需要再次拆分，循环拼接
        item.hobbies.forEach(item => {
          content += `
            <span>${item}</span>
          `;
        });
        // 传递用户id
        content += `
            </td>
            <td>${item.email}</td>
            <td>
              <a href="/delete?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
              <a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a>
            </td>
          </tr>
        `;
      });

      content += `
            </table>
          </div>
        </body>
        </html>
      `;
      res.end(content);
    } else if (pathname == "/add") {
      let content = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>用户列表</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" />
          </head>
          <body>
            <div class="container">
              <h3>添加用户</h3>
              <form method="post" action="/add">
                <div class="form-group">
                  <label>用户名</label>
                  <input name="name" type="text" class="form-control" placeholder="请填写用户名" />
                </div>
                <div class="form-group">
                  <label>密码</label>
                  <input name="password" type="password" class="form-control" placeholder="请输入密码" />
                </div>
                <div class="form-group">
                  <label>年龄</label>
                  <input name="age" type="text" class="form-control" placeholder="请填写邮箱" />
                </div>
                <div class="form-group">
                  <label>邮箱</label>
                  <input name="email" type="email" class="form-control" placeholder="请填写邮箱" />
                </div>
                <div class="form-group">
                  <label>请选择爱好</label>
                  <div>
                    <label class="checkbox-inline">
                      <input name="hobbies" type="checkbox" value="足球" /> 足球
                    </label>
                    <label class="checkbox-inline">
                      <input name="hobbies" type="checkbox" value="篮球" /> 篮球
                    </label>
                    <label class="checkbox-inline">
                      <input name="hobbies" type="checkbox" value="橄榄球" /> 橄榄球
                    </label>
                    <label class="checkbox-inline">
                      <input name="hobbies" type="checkbox" value="敲代码" /> 敲代码
                    </label>
                    <label class="checkbox-inline">
                      <input name="hobbies" type="checkbox" value="抽烟" /> 抽烟
                    </label>
                    <label class="checkbox-inline">
                      <input name="hobbies" type="checkbox" value="喝酒" /> 喝酒
                    </label>
                    <label class="checkbox-inline">
                      <input name="hobbies" type="checkbox" value="烫头" /> 烫头
                    </label>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">添加用户</button>
              </form>
            </div>
          </body>
        </html>
      `;
      res.end(content);
    } else if (pathname == "/modify") {
      // 查询当前用户信息，find()返回了数据不方便处理，用findOne()
      let user = await User.findOne({
        _id: query.id,
      });
      // 声明一个hobbies数组，用于生成复选框，以及和数据库信息比较判断
      let hobbies = [
        "足球",
        "篮球",
        "橄榄球",
        "敲代码",
        "抽烟",
        "喝酒",
        "烫头",
      ];
      // 将信息展示到页面中
      // 主要要修改form的action为/modify
      // 同时，为了后台修改用户信息时能获取到id，需要在action里面再传递一下id
      let content = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>用户列表</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" />
          </head>
          <body>
            <div class="container">
              <h3>修改用户</h3>
              <form method="post" action="/modify?id=${user._id}">
                <div class="form-group">
                  <label>用户名</label>
                  <input value="${user.name}" name="name" type="text" class="form-control" placeholder="请填写用户名" />
                </div>
                <div class="form-group">
                  <label>密码</label>
                  <input value="${user.password}" name="password" type="password" class="form-control" placeholder="请输入密码" />
                </div>
                <div class="form-group">
                  <label>年龄</label>
                  <input value="${user.age}" name="age" type="text" class="form-control" placeholder="请填写邮箱" />
                </div>
                <div class="form-group">
                  <label>邮箱</label>
                  <input value="${user.email}" name="email" type="email" class="form-control" placeholder="请填写邮箱" />
                </div>
                <div class="form-group">
                  <label>请选择爱好</label>
                  <div>
      `;
      // 生成hobbies复选框
      hobbies.forEach(item => {
        // 判断当前循环项是否在hobbies中存在
        let isHobbies = user.hobbies.includes(item);
        let checked = "";
        if (isHobbies) {
          checked = ' checked="checked"';
        }
        content += `
        <label class="checkbox-inline">
          <input${checked} name="hobbies" type="checkbox" value="${item}" /> ${item}
        </label>
        `;
      });
      content += `
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">修改用户</button>
              </form>
            </div>
          </body>
        </html>
      `;
      res.end(content);
    } else if (pathname == "/delete") {
      await User.findOneAndDelete({
        _id: query.id,
      }).catch(err => {
        const errors = err.errors;
        for (let item in errors) {
          res.end(errors[item]["message"]);
        }
      });
      res.writeHead(301, {
        Location: "/list",
      });
      res.end();
    } else {
      res.end("ok");
    }
  } else if (method == "POST") {
    if (pathname == "/add") {
      // 添加用户功能
      //  接收post参数
      let formData = "";
      req.on("data", param => {
        formData += param;
      });
      //  接收完毕
      req.on("end", async () => {
        let user = querystring.parse(formData);
        // 将信息提交到数据库
        // 备注：提交数据库是异步方法，需要在函数前面加async
        await User.create(user).catch(err => {
          const errors = err.errors;
          for (let item in errors) {
            res.end(errors[item]["message"]);
          }
          return;
        });
        // 响应客户端，通过重定向
        // 301代表重定向
        res.writeHead(301, {
          Location: "/list",
        });
        // 必须用res.end()表示响应结束，不然客户端会一直等待
        res.end();
      });
    } else if (pathname == "/modify") {
      let postParams = "";
      req.on("data", param => {
        postParams += param;
      });
      req.on("end", async () => {
        let user = querystring.parse(postParams);
        // 修改用户信息
        await User.updateOne({ _id: query.id }, user).catch(err => {
          const errors = err.errors;
          for (let item in errors) {
            res.end(errors[item]["message"]);
          }
        });
        res.writeHead(301, {
          Location: "/list",
        });
        res.end();
      });
    }
  } else {
    res.end("not get or post");
  }
});

// 监听3000端口
app.listen(3000);
console.log("服务器启动成功");
