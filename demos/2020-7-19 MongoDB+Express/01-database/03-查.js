const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(()=>console.log('数据库连接成功'))
  .catch(err=>console.log(err, '数据库连接失败'));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  hobbies: [String]
});
const User = mongoose.model('User', userSchema);

// 集合.find()返回集合中所有文档
// 返回值：promise对象
// User.find().then(doc => console.log(doc));
// 集合.find({key:value})返回集合中符合条件的文档
// 备注：用find()查询的文档结果，都是数组形式的，就算没有找到，也是空数组
// User.find({name: '王五'}).then(doc => console.log(doc));
// 如果想只查询一条数据，或者返回对象形式，用fineOne()
// User.findOne({name: '王五'}).then(doc => console.log(doc));

// 更详细的匹配condition查找
// https://blog.csdn.net/weixin_34010949/article/details/88750591

// $gt $lt
// 匹配age大于20小于50的文档
// User.find({
//   age: {
//       $gt: 20,
//       $lt: 40
//     }
//   })
//   .then(doc => console.log(doc));

// $in
// 匹配hobbies包含足球的文档
// User.find({
//   hobbies: {
//       $in: ['足球']
//     }
//   })
//   .then(doc => console.log(doc));


// 复杂查询

// .select()
// 查询字段name和email，并且不匹配_id字段
// User.find()
//   .select('name email -_id')
//   .then(doc => console.log(doc));

// .sort()
// 根据某个key排序
// 根据age排序
// User.find()
//   .sort('age')  //升序
//   // .sort('-age')  //降序
//   .then(doc => console.log(doc));

// .skip() .limit()
// 跳过文档数量 限制查询文档数量
// 先按id排序，再跳过前2个文档，并且只查询3个文档
User.find()
  .sort('_id')
  .skip(2)
  .limit(3)
  .then(doc => console.log(doc));
