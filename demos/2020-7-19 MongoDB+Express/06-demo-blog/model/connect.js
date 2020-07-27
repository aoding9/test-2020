// 引用mongoose模块
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost/blog',{
  // 解决一些新版的警告信息
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('数据库连接成功'))
  .catch(() => console.log('数据库连接失败'))
