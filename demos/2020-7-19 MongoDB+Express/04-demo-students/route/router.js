// 引入router模块
const getRouter = require('router');
// 通过router模块的返回值构造函数，初始化路由对象，定义这个路由对象，然后在请求响应里调用router()这个方法启用路由
const router = getRouter();
// 学生信息集合 数据库
const Student = require('../module/user');
// 引入模板引擎
const template = require('art-template');
// 引入querystring模块
const querystring = require('querystring');
// 呈递添加页
router.get('/add', (req, res) => {
  let html = template('index', {});
  res.end(html);
})

// 呈递列表页
router.get('/list', async (req, res) => {
  // 查询学生信息
  let students = await Student.find();
  let html = template('list', {
    students: students
  });
  res.end(html);
})
// 实现学生信息添加功能的路由
router.post('/add', (req, res) => {
  // 接收数据
  let formData = '';
  req.on('data', param => {
    formData += param
  });
  req.on('end', async () => {
    // 插入数据库
    await Student.create(querystring.parse(formData))
    res.writeHead(301, {
      Location: '/list'
    })
    res.end();
  })
})

module.exports = router;