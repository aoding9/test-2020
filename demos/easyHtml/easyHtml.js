
// setHeightByWidth()
// 使用场景：如果手机端用百分比布局，图片高度却无法用百分比来设置
// 作用：按照固定宽高比，根据宽度设置高度
// 参数：
//  要设置的元素el
//  宽高比例width和height，不传则默认比例400*300


function setHeightByWidth(el, width, height) {
    width = width || 400;
    height = height || 300;
    el.style.height = height / width * el.offsetWidth + 'px';
}

// 引入之后，添加以下js到目标元素下面，获取目标元素，调用传参
// <!-- 按照固定宽高比，根据宽度设置高度 -->
// <script>
//   var el = document.querySelector('.setHByW-index');
//   setHeightByWidth(el, width, height);
// </script>