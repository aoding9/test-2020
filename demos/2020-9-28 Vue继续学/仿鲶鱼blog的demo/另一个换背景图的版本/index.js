const vm = new Vue({
  el: '#app',
  data: function () {
    return {
      webTitle: '吴瀚园',
      webDescription: 'No cross, no crown',
      avatarPath: './public/avatar.jpg',
      // 是否显示对话框
      dialogVisible: false,
      dialogItem: {},
      // 评分
      rateValue: null,
      // 搜索
      query: '',
      articles: [],
      // 备案号
      record: '湘ICP备19023323号'
      // haha: ``
    };
  },
  mounted() {
    this.getArticles();
    // console.log(this.htmlToEscapeString(this.haha));
  },
  methods: {
    // 获取文章数据
    getArticles() {
      fetch('./data/articles.json')
        .then(data => {
          return data.json();
        })
        .then(data => {
          this.articles = data;
        })
        .catch(err => err);
    },
    // 转义处理html
    htmlToEscapeString(str) {
      str = str.replace(/</g, '&lt;');
      str = str.replace(/>/g, '&gt;');
      str = str.replace(/"/g, '&quot;');
      // 要把换行删掉，不然json格式报错
      str = str.replace(/\n/g, '');
      str = str.replace(/\t/g, '');
      str = str.replace(/\\5FAE/g, '微');
      str = str.replace(/\\5B8B/g, '宋');
      return str;
    },
    escapeStringToHtml(str) {
      str = str.replace(/&lt;/g, '<');
      str = str.replace(/&gt;/g, '>');
      str = str.replace(/&quot;/g, '"');
      str = str.replace(/\\5FAE/g, '微');
      str = str.replace(/\\5B8B/g, '宋');
      return str;
    },
    showDialog(item) {
      this.dialogItem = item;
      // 反转义html
      this.dialogItem.content = this.escapeStringToHtml(this.dialogItem.content);
      this.dialogVisible = true;
    },
    handleDialogClose() {
      this.dialogVisible = false;
      // 将scrollTop重置
      this.$refs.arcDialogRef.$el.scrollTop = 0;
    },
    handleDialogClosed() {
      this.dialogItem = {};
    },
    searchInfo() {
      window.open('https://www.baidu.com/s?wd=' + this.query, '_target');
    }
  },
  filters: {
    dateFormat(date, fmt) {
      if (typeof date === 'string') {
        var mts = date.match(/(\/Date\((\d+)\)\/)/);
        if (mts && mts.length >= 3) {
          date = parseInt(mts[2]);
        }
      }
      date = new Date(date);
      if (!date || date.toUTCString() == 'Invalid Date') {
        return '日期格式不正确';
      }
      // 映射
      var map = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S+': date.getMilliseconds() //毫秒
      };
      // 判断是否至少匹配一个y，将匹配到的y+的第一个，替换为getFullYear，并且根据y的数量，用4-y数量，截取年份位数
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      // 由于其他几个都是最多两个占位符，所以统一处理
      // 遍历o的key，分别判断是否有匹配到，然后对匹配到的字符串判断长度，长度为1的，直接输出

      /** 关于正则表达式$1 $2
        $1，$2表达的是小括号里面的内容
        $1是第一个小括号里的内容，$2是第二个小括号里面的内容，依此类推
        比如(\\d{4})(\\d{2})(\\d{2})  匹配"20190919"
        $1是第一个括号里匹配的2019
        $2是第二个括号里匹配的09
        $3是第三个括号里匹配的19
       */
      for (var k in map)
        if (new RegExp('(' + k + ')').test(fmt))
          // RegExp.$1会自动将上一次调用正则匹配到的字符串保存，是RegExp的内置属性
          // 如果占位符的长度为1，说明不足位数的不需要补0，直接输出时间，如果不等于1，则不足位数的要补0
          // 先整体前面拼接2个0，然后根据key对应的value时间位数，截取字符串，如果是1位，则截取掉1个0，如果2位，截取掉2个0
          // 由于o[k]是number类型，没有length属性，所以要先转换为字符串类型
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? map[k] : ('00' + map[k]).substr(('' + map[k]).length));
      return fmt;
    }
  }
});
