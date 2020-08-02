const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground' ,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.log(err, '数据库连接失败'));


// 创建集合规则（模型）
// 用mongoose.Schema()
// 参数：{键名：键值规则}
// 返回值：构造函数
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean
});

// 创建集合（编译模型）
// mongoose.model()
// 参数：集合名，集合模型
// 返回值：构造函数，.model()方法会生成schema的编译副本
// 备注：集合名和数据库里的实际名不一样，会转成复数小写的形式
const Course = mongoose.model('Course', courseSchema);

// 创建文档（模型的实例称为文档）
// 方式1：
// const course = new Course({
//   name: 'Node.js course',
//   author: '黑马讲师',
//   isPublished: true
// });
// 保存到数据库中
// course.save();

// 方式2
// 集合.create()
// 参数：{key:value},(err, doc) => {回调函数体}
// 返回值：promise对象

// 1通过回调函数获取处理结果
// Course.create({
//   name: 'javascript',
//   author: '黑马讲师',
//   isPublished: false
// }, (err, doc) => {
//   // 错误对象
//   console.log(err);
//   // 当前插入的文档
//   console.log(doc);
// });

// 备注：和数据库相关的操作都是异步操作
// 2通过promise对象获取处理结果
Course.create({
  name: 'javascript',
  author: '黑马讲师',
  isPublished: false
})
  .then(doc => console.log(doc))
  .catch(err => console.log(err));


// 将MongoDB下的bin目录C:\Program Files\MongoDB\Server\4.2\bin\添加到系统环境变量path，重新打开命令行工具
// mongoimport -d 数据库名 -c 集合名 --file 要导入的文件
// mongoimport -d playground -c users --file ./user.json
// mongoimport -d playground -c users --jsonArray ./user.json 导入json数组用--jsonArray
