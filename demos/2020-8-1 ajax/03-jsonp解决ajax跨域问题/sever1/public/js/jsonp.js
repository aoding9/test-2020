// 封装jsonp方法
function jsonp (options) {
  // 动态创建script标签
  var script = document.createElement('script');
  // 拼接其他参数，并拼接到src后面
  var params = '';
  for (var attr in options.data) {
    params += '&' + attr + '=' + options.data[attr];
  }
  // 自动设置success函数
  // 如果fnName是固定的，后发送的请求会覆盖新发送的请求，所以我们要随机生成fnName
  // 同时options.success的值是匿名函数 我们要动态挂载方法名称
  // 首先生成一个0-1之间的随机小数，然后转为字符串，然后替换掉小数点. 函数名不能数字开头，前面加上一段英文
  var fnName = 'myJsonp' + Math.random().toString().replace('.','');
  // 此时的success已经不是全局函数了，无法直接调用，需要把他挂载到window对象下面，让其成为全局函数
  window[fnName] = options.success;
  // 设置其src，同时将fnName也交给jsonp方法内部进行处理
  script.src = options.url + '?callback=' + fnName + params;
  // 追加节点
  document.body.appendChild(script);
  // 加载完成后，删除script节点
  script.onload = function () {
    document.body.removeChild(script);
  }
}