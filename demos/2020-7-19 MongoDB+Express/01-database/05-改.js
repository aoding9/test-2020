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


// 更新一个文档
// 备注返回值 { n: 6, nModified: 6, ok: 1 }分别表示查询到6个符合的文档，修改了6个文档，ok:1表示修改成功
// User.updateOne({
//   name: '李四'
// },{
//   name: '李霸霸'
// })
//   .then(doc=> console.log(doc));


// 更新多个文档
User.updateMany({
  
},{
  age: 100
})
.then(doc=> console.log(doc));