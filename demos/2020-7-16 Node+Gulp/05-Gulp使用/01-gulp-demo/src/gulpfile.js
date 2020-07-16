// 引用gulp模块
const gulp = require('gulp');
// gulp.task建立任务
// 任务名称,任务回调函数
gulp.task('first', () => {
  // gulp.src获取要处理的文件
  gulp.src('../../../01-node的基本使用/01-node初体验/01-ECMAscript都可以用.js').pipe(gulp.dest('dist/js'));
})