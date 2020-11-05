const vm = new Vue({
  el: '#app',
  data: function () {
    return {
      webTitle: '防骗小灵通',
      webDescription: '看2020防骗知识，就上防骗小灵通',
      avatarPath: './public/avatar.jpg',
      // 是否显示抽屉
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
    }
  },
  mounted() {
    this.getArticles()
  },
  methods: {
    // 获取文章数据
    getArticles() {
      fetch('./data/articles.json')
        .then(data => {
          // text()方法属于fetchAPI的一部分，它返回一个Promise实例对象，用于获取后台返回的数据
          return data.json()
        })
        // 返回的数据在下一个then里面获取到
        .then(data => {
          // console.log(data, typeof data)
          this.articles = data
        })
        .catch(err => err)
    },
    // 转义处理html
    htmlToEscapeString(str) {
      str = str.replace(/</g, '&lt;')
      str = str.replace(/>/g, '&gt;')
      str = str.replace(/"/g, '&quot;')
      // 要把换行删掉，不然json格式报错
      str = str.replace(/\n/g, '')
      str = str.replace(/\t/g, '')
      return str
    },
    escapeStringToHtml(str) {
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      str = str.replace(/&quot;/g, '"')
      return str
    },
    showDialog(item) {
      this.dialogItem = item
      // 反转义html
      this.dialogItem.content = this.escapeStringToHtml(this.dialogItem.content)
      this.dialogVisible = true
    },
    handleDialogClose() {
      // 将scrollTop重置
      this.$refs.arcDialogRef.$el.scrollTop = 0

      this.dialogVisible = false
      this.dialogItem = {}
    },
    searchInfo() {
      window.open('https://www.baidu.com/s?wd=' + this.query, '_target')
    }
  },
  filters: {
    dateFormat(date, fmt) {
      if (typeof date === 'string') {
        var mts = date.match(/(\/Date\((\d+)\)\/)/)
        if (mts && mts.length >= 3) {
          date = parseInt(mts[2])
        }
      }
      date = new Date(date)
      if (!date || date.toUTCString() == 'Invalid Date') {
        return '日期格式不正确'
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
      }
      // 判断是否至少匹配一个y，将匹配到的y+的第一个，替换为getFullYear，并且根据y的数量，用4-y数量，截取年份位数
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      // 由于其他几个都是最多两个占位符，所以统一处理
      // 遍历o的key，分别判断是否有匹配到，然后对匹配到的字符串判断长度，长度为1的，直接输出
      for (var k in map)
        if (new RegExp('(' + k + ')').test(fmt))
          // RegExp.$1会自动将上一次调用正则匹配到的字符串保存，是RegExp的内置属性
          // 如果占位符的长度为1，说明不足位数的不需要补0，直接输出时间，如果不等于1，则不足位数的要补0
          // 先整体前面拼接2个0，然后根据key对应的value时间位数，截取字符串，如果是1位，则截取掉1个0，如果2位，截取掉2个0
          // 由于o[k]是number类型，没有length属性，所以要先转换为字符串类型
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? map[k] : ('00' + map[k]).substr(('' + map[k]).length))
      return fmt
    }
  }
})
