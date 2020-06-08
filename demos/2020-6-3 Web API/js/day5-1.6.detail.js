window.addEventListener('load', function () {
    var previewImg = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');

    previewImg.addEventListener('mouseover', function () {
        // 鼠标经过就显示出来
        mask.style.display = 'block';
        big.style.display = 'block';

        function maskMove(e) {
            // 先计算鼠标在盒子的坐标
            var x = e.pageX - previewImg.offsetLeft;
            var y = e.pageY - previewImg.offsetTop;
            // 鼠标在盒子中心，mask左移和上移50%宽高即可
            var maskX = x - mask.offsetWidth / 2;
            var maskY = y - mask.offsetHeight / 2;
            // 计算mask最大移动距离，超出后不再继续移动，由于是正方形，xy都一样，如果是不一样则需要分开算
            var maskMax = previewImg.offsetWidth - mask.offsetWidth;
            // 如果x 坐标小于了0 就让他停在0 的位置
            // if (maskX < 0) {
            //     maskX = 0;
            //     // maskX和maskY移动到maskMax会超出，设为maskMax阻止移动
            // } else if (maskX > maskMax) {
            //     maskX = maskMax
            // }
            // if (maskY < 0) {
            //     maskY = 0;
            // } else if (maskY > maskMax) {
            //     maskY = maskMax;
            // }
            // 三元表达式更简洁
            maskX < 0 ? maskX = 0 : maskX > maskMax ? maskX = maskMax : maskX;
            maskY < 0 ? maskY = 0 : maskY > maskMax ? maskY = maskMax : maskY;
            mask.style.left = maskX + 'px';
            mask.style.top = maskY + 'px';

            //大盒子
            var bigImg = document.querySelector('.bigImg');
            // 大盒子图片最大移动距离
            var bigMax = bigImg.offsetWidth - big.offsetWidth;
            // 大图片的移动距离 / 大图片最大移动距离 = 遮挡层移动距离 / 遮挡层的最大移动距离
            // 大图片的移动距离 = 遮挡层移动距离 / 遮挡层的最大移动距离 * 大图片最大移动距离
            // 两个盒子的移动距离具有相同的比例关系 bigX:bigMax = maskX:maskMax bigX = bigMax *maskX/maskMax
            // 也可以这么理解，maskX移动距离占maskMax的百分比等于bigX移动距离占bigMax的百分比，bigX =百分比*bigMax
            var bigX = maskX * bigMax / maskMax;
            var bigY = maskY * bigMax / maskMax;
            bigImg.style.left = -bigX + 'px';
            bigImg.style.top = -bigY + 'px';
        }
        previewImg.addEventListener('mousemove', maskMove)
    })

    previewImg.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })




})