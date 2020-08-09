/*
ajax函数封装
@type:请求方式
@url:请求地址
@header:请求头部
@data:请求参数
@success: 请求处理函数
@error: 错误处理函数
*/
// *部分参数有默认值，可以不传
// *如果是post方式，需要将options.data按需处理后，赋值给options.dataSend，dataSend将会传给xhr.send()方法
/* 
如何使用：
ajax({
  type: 'get',
  url: 'http://localhost:3000/first',
  header: {
    'Content-Type': 'application/json',
  },
  data: { name: '张三', age: 20 },
  success: function (data) {
    console.log(data);
  },
  error: function (data, xhr) {
    document.body.innerHTML = data;
    console.log('error\n' + data, xhr);
  },
});
*/

function ajax(options) {
  //  默认值对象
  var defaults = {
    type: 'get',
    url: '',
    data: {},
    // data是源数据，dataSend是post方式放到send里面的数据
    dataSend: null,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    success: function () {},
    error: function () {},
  };

  /*
  自定义方法 myFn.changeParams()
  作用：将对象data请求参数拼接成&分割的字符串
  @data:对象类型的请求参数
  */
  var myFn = {};
  myFn.changeParams = function (data) {
    // *声明变量用于保存请求参数
    var params = '';
    // **循环用户传进来的对象类型数据，拼接为字符串
    for (var attr in data) {
      params += attr + '=' + data[attr] + '&';
    }
    // **截取掉最后一个&符号
    return (params = params.substr(0, params.length - 1));
  };
  /*
  自定义方法 myFn.openAndSend()
  作用：配置xhr.open()以及发送请求xhr.send()，兼具设置请求头
  @options: 对象类型的请求相关信息
  @options.dataSend: myFn.send()里面的参数，不传就是null
  */
  myFn.openAndSend = function (options) {
    // **如果没有传dataSend参数 就默认为null(改到最上面定义默认值了)
    var dataSend = options.dataSend;
    // 配置ajax对象
    xhr.open(options.type, options.url);
    // **如果是post方式，设置header中的参数类型
    if (options.type == 'post') {
      xhr.setRequestHeader('Content-Type', options.header['Content-Type']);
    }
    xhr.send(dataSend);
    // 发送请求
  };
  // ****
  // 主内容开始
  // ****
  // 覆盖默认值，用Object.assign()方法，他可以用新对象覆盖目标对象，这里可以不用options接收，他会影响源对象，但是我懒得改下面的options为defaults，所以直接用options接收返回值，也就是覆盖后的对象
  options = Object.assign(defaults, options);
  // 创建ajax对象
  var xhr = new XMLHttpRequest();
  // *判断请求方式
  // **如果请求方式是post
  if (options.type == 'post') {
    // ***如果请求参数的类型是json，就不需要单独拼接，可以直接转换为json字符串
    if (options.header['Content-Type'] == 'json') {
      console.log(options.data);
      options.dataSend = JSON.stringify(options.data);
    } else {
      // ***如果不是json类型参数
      // ****则拼接参数，再把params放到send里面
      // myFn.changeParams是自定义的方法
      options.dataSend = myFn.changeParams(options.data);
    }
  }

  // **如果是get方式，则把参数拼接到url后面
  else if (options.type == 'get') {
    options.url = options.url + '?' + myFn.changeParams(options.data);
  } else {
    return alert('不是post或者get');
  }
  // 配置open和send方法，这个是自定义的方法
  myFn.openAndSend(options);

  // 监听onload事件
  xhr.onload = function () {
    // 把响应数据重新转成对象
    // *获取到响应数据的类型
    var contentType = xhr.getResponseHeader('Content-Type');
    // **String.includes()方法判断字符串是否包含某个字符，包含就返回true
    // 如果是json类型数据
    if (contentType.includes('application/json')) {
      // console.log('响应数据是json类型');
      // 把json字符串转换成json对象，方便后续使用
      responseText = JSON.parse(xhr.responseText);
    } else {
      responseText = xhr.responseText;
    }

    // *判断ajax请求是否成功
    // **如果http状态码为200再调用success
    if (xhr.status == 200) {
      // 把响应数据暴露出去
      options.success(responseText);
    } else {
      // **错误处理
      options.error(responseText, xhr);
    }
  };
  // 监听onerror事件，判断网络是否中断
  xhr.onerror = function () {
    alert('网络中断，无法发送ajax请求');
  };
}
