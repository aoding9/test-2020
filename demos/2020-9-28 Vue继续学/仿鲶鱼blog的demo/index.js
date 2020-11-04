const app = new Vue({
  el: '#app',
  data: function () {
    return {
      webTitle: 'myBlog',
      webDescription: '网站描述',
      avatarPath: './public/avatar.jpg',
      articles: [
        {
          id: 1,
          title: '标题',
          author: 'admin',
          date: '2020年',
          click: '101',
          content: `
          <div>可以哦</div>
          <img src="./public/avatar.jpg" alt="">
          <p>还不错</p>
          `
        },
        {
          id: 2,
          title: '标题',
          author: 'admin',
          date: '2020年',
          click: '101',
          content: '哈哈哈哈哈嗯嗯嗯嗯大会的哈德好'
        },
        {
          id: 3,
          title: '标题',
          author: 'admin',
          date: '2020年',
          click: '101',
          content: '哈哈哈哈哈嗯嗯嗯嗯大会的哈德好'
        },
        {
          id: 4,
          title: '标题',
          author: 'admin',
          date: '2020年',
          click: '101',
          content: '哈哈哈哈哈嗯嗯嗯嗯大会的哈德好'
        },
        {
          id: 5,
          title: '标题',
          author: 'admin',
          date: '2020年',
          click: '101',
          content: '哈哈哈哈哈嗯嗯嗯嗯大会的哈德好<p>hh</p>'
        },
        {
          id: 6,
          title: '标题',
          author: 'admin',
          date: '2020年',
          click: '101',
          content: '哈哈哈哈哈嗯嗯嗯嗯大会的哈德好<p>hh</p>'
        },
        {
          id: 7,
          title: '标题',
          author: 'admin',
          date: '2020年',
          click: '101',
          content: '哈哈哈哈哈嗯嗯嗯嗯大会的哈德好<p>hh</p>'
        }
      ]
    }
  }
})
