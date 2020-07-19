const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/playground')
// 这样连接会有警告信息，告诉我们当前url解析器和服务发现和监视引擎已经被废弃，将来会移除，需要通过第二个参数option来使用新的解析器和引擎
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.log(err, '数据库连接失败'))