// 在浏览器中全局对象是window，nodejs没有在浏览器运行，全局对象不是window，而是global
global.console.log('global~');
// 他和window一样，一般都被我们省略不写
console.log('ha~');