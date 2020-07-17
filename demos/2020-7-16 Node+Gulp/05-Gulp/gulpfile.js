// gulp.src()获取任务要处理的文件
// gulp.dest()输出文件
// gulp.task()建立gulp任务
// gulp.watch()监控文件的变化

// 下载gulp
// npm install gulp --save-dev
// 引用gulp模块
const gulp = require('gulp');
// gulp.task(任务名称,任务回调函数)    建立任务
gulp.task('first', done => {
  // gulp.src(路径/文件名)获取要处理的文件
  // .pipe()里面，文件流管道，一般是将读取到的文件输出到插件进行处理，再用一次pipe()管道，导入到gulp.dest()中
  // 这里没有导出到插件处理，直接复制的
  // gulp.dest(目录) 将流的内容写入到某个目录下面
  gulp.src('./src/css/base.css')
  .pipe(gulp.dest('dist/css'));

  // 新版gulp不支持同步任务，需要加一个回调函数通知任务已经完成
  done();
})

// 安装gulp脚手架工具
// npm install gulp-cli -g
// 命令行输入gulp 任务名   即可执行任务



// html任务
// 1.抽取html文件的公用代码
// 2.html文件中代码的压缩操作
// 要先抽取在压缩，这样效率更高

// 安装html压缩插件
// npm install gulp-htmlmin --save-dev   (--save-dev表示开发依赖，和--save项目依赖区分开)
// 安装抽取html公共代码插件
// npm install gulp-file-include --save-dev
// 引入插件
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');

gulp.task('htmlmin', done => {
  gulp.src('./src/*.html')
  // 先去手动抽取源html的公共代码部分，保存，然后在html里通过@@include(路径/文件名)引入回去
  .pipe(fileinclude())
  .pipe(htmlmin({
    // 该选项设置是否折叠空格
    collapseWhitespace: true
  }))
  .pipe(gulp.dest('dist'));
  done();
})


// css任务
// 1.less语法转换
// 2.css代码压缩

// 下载对应插件
// npm install gulp-less --save-dev
// npm install gulp-csso --save-dev
// 引入插件
const less = require('gulp-less');
const csso = require('gulp-csso');

gulp.task('cssmin',done => {
  // 选择css目录下的less和css文件，用数组的形式
  gulp.src(['./src/css/*.less','./src/css/*.css'])
  // 将less转换为css
  .pipe(less())
  // 将css压缩
  .pipe(csso())
  // 输出写入
  .pipe(gulp.dest('dist/css'));
  done();
})


// js任务
// 1.es6代码转换
// 2.代码压缩

// 下载安装babel插件以及gulp-babel依赖模块
// npm install gulp-babel @babel/core @babel/preset-env --save-dev
// npm install gulp-uglify --save-dev
// 引入
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
gulp.task('jsmin', done => {
  gulp.src('./src/js/*.js')
  .pipe(babel({
    // 该选项可判断当前代码运行环境，将代码转换为当前环境所支持的代码
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
  done();
})


// 复制文件夹
gulp.task('copy', done => {
  gulp.src('./src/images/*')
  .pipe(gulp.dest('dist/images'));

  // ./** 匹配当前路径下所有子文件夹和文件
  // ./*  匹配当前路径下所有文件（不包含子文件夹以及其中的文件）
  // ./**/* 合起来就是匹配所有文件，子文件夹以及其下的子文件了（还可继续套娃）
  gulp.src('./src/lib/**/*')
  .pipe(gulp.dest('dist/lib'));
  done();
})


// 构建任务
// 新版的加载依赖方式改变导致构建异常，需要加上gulp.series()指定任务顺序
// 参考 https://blog.csdn.net/Pinnsvin/article/details/106692633
gulp.task('default',gulp.series(['htmlmin','cssmin','jsmin','copy']));