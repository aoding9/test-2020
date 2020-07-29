// 引用mongoose模块
const mongoose = require('mongoose');
// 导入config模块 根据环境自动读取配置
const config = require('config');

// 连接数据库
const connectStr = `mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`;
mongoose.connect(connectStr ,{
  // 解决一些新版的警告信息
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('数据库连接成功@'+ config.get('db.host')))
  .catch(() => console.log('数据库连接失败@'+ config.get('db.host')))
