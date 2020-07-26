// 创建用户集合

// 引用mongoose模块
const mongoose = require('mongoose');
// 引用bcrypt模块
const bcrypt = require('bcrypt');
// 导入joi模块
const Joi = require('joi');

// 创建集合规则
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '用户名不能为空'],
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    // 保证邮箱地址不重复
    unique: [true, '该邮箱已经存在'],
  },
  password: {
    type: String,
    required: [true, '密码不能为空'],
  },
  // admin 超级管理员
  // normal 普通用户
  role: {
    type: String,
    required: [true, '角色不能为空'],
  },
  // 0:启用状态
  // 1:禁用状态
  state: {
    type: Number,
    default: 0,
  }
});

// 创建集合
const User = mongoose.model('User', userSchema);

// 创建一个初始用户，创建之后注释掉
// User.create({
//   username: 'admin',
//   email: 'admin@qq.com',
//   password: '123456',
//   role: 'admin',
//   state: 0
// })
//   .then(() => {
//     console.log('用户创建成功');
//   })
//   .catch(() => {
//     console.log('用户创建失败');
//   })

// 在创建用户时对密码加密
async function createUser () {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash('123456', salt);
  const user = await User.create({
      username: 'admin',
      email: 'admin@qq.com',
      password: pass,
      role: 'admin',
      state: 0
    });
}
// createUser();

// 验证用户信息
const validateUser = user => {
    // 定义对象的验证规则
    const schema = Joi.object({
      username: Joi.string()
        .min(2)
        .max(12)
        .required()
        .error(new Error('用户名不符合验证规则')),
      email: Joi.string()
        .email()
        .required()
        .error(new Error('邮箱格式不符合要求')),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required()
        .error(new Error('密码格式不符合要求')),
      role: Joi.string()
        .valid('normal', 'admin')
        .required()
        .error(new Error('角色值非法')),
      state: Joi.number()
        .valid(0,1)
        .required()
        .error(new Error('状态值非法')),
    });
    // 实施验证
    // 返回一个promise对象
    return schema.validateAsync(user);
}

// 导出User，因为以后可能还有其他东西要导出，所以写成对象形式
module.exports = {
  // User: User  ES6中键值相同名字时，可以写成下面这样
  User,
  validateUser
}