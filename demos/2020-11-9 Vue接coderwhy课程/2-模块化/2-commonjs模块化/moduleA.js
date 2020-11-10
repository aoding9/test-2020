const name = '雷军'
function sing() {
  console.log('are you ok')
}
//commonjs需要node环境
// 导出为模块对象，然后在其他地方用require导入
module.exports = {
  name,
  sing
}
