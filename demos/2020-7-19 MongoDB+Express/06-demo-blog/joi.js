// 导入joi模块
const Joi = require('joi');
const logout = require('./route/admin/logout');
// 定义对象的验证规则
const schema = Joi.object({
	username: Joi.string()
		.min(2)
		.max(5)
		.required()
		.error(new Error('username属性没有通过验证')),
	birth: Joi.number()
		.min(1900)
		.max(2020)
		.error(new Error('birth属性没有通过验证')),

});
// 验证方法1
// const { value,error } = schema.validate({ username: 'a'});
// console.log(value,error.message);

// 验证方法2
async function run () {
	try {
		// 实施验证
		const value = await schema.validateAsync({
			// username: 'a',
			username: 'ab',
			// birth: 1800,
			birth: 1900,
		});
	}
	catch (ex) {
		// 捕获异常信息
		console.log(ex.message);
		return;
	}
  console.log('验证通过');
}
run();  
 
// 这是老版本joi的验证方式，现在新版不是这么用的了
// // 引入joi模块
// const Joi = require('joi');
// console.log(Joi);
// // 定义对象的验证规则
// const schema = {
// 	username: Joi.string().min(2).max(5).required().error(new Error('username属性没有通过验证')),
// 	birth: Joi.number().min(1900).max(2020).error(new Error('birth没有通过验证'))
// };

// async function run () {
// 	try {
// 		// 实施验证
// 		await Joi.validate({username: 'ab', birth: 1800}, schema);
// 	}catch (ex) {
// 		console.log(ex.message);
// 		return;
// 	}
// 	console.log('验证通过')
// }

// run();