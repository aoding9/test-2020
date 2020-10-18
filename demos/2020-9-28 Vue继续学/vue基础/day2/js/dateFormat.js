/**
 方法1
/*对Date的扩展，将 Date 转化为指定格式的String
/* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
/* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
/* 例子：
/* (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2019-01-02 10:19:04.423
/* (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2019-1-2 10:19:4.18
*/
Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  }
  // 判断是否至少匹配一个y，将匹配到的y+的第一个，替换为getFullYear，并且根据y的数量，用4-y数量，截取年份位数
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  // 由于其他几个都是最多两个占位符，所以统一处理
  // 遍历o的key，分别判断是否有匹配到，然后对匹配到的字符串判断长度，长度为1的，直接输出
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      // RegExp.$1会自动将上一次调用正则匹配到的字符串保存，是RegExp的内置属性
      // 如果占位符的长度为1，说明不足位数的不需要补0，直接输出时间，如果不等于1，则不足位数的要补0
      // 先整体前面拼接2个0，然后根据key对应的value时间位数，截取字符串，如果是1位，则截取掉1个0，如果2位，截取掉2个0
      // 由于o[k]是number类型，没有length属性，所以要先转换为字符串类型
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
  return fmt
}
// 调用：
// var time1 = new Date().Format("yyyy-MM-dd");
// var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
// 方法2
/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
    可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg:
* (new  Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2019-01-10 19:29:09.423      
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2019-01-10 四 19:23:04      
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2019-01-10 周四 19:19:04      
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2019-01-10 星期四19:06:04      
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2019-01-10 19:09:04       
 */
Date.prototype.pattern = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  }
  // 星期数对应的数字的中文编码
  var week = {
    0: '\u65e5',
    1: '\u4e00',
    2: '\u4e8c',
    3: '\u4e09',
    4: '\u56db',
    5: '\u4e94',
    6: '\u516d',
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[this.getDay() + '']
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}

var date = new Date()
window.alert(date.pattern('yyyy-MM-dd hh:mm:ss'))
