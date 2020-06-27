window.addEventListener('DOMContentLoaded', function () {
    // 获取元素
    var focus = document.querySelector('.focus');
    var arrowL = document.querySelector('.arrow-l');
    var arrowR = document.querySelector('.arrow-r');
    // 获取focus宽度，也就是滚动一次的距离
    var focusWidth = focus.offsetWidth;

    // 鼠标进入focus，显示箭头，离开隐藏
    focus.addEventListener('mouseenter', function () {
        arrowL.style.display = 'block';
        arrowR.style.display = 'block';

        // 鼠标进入就清除定时器
        clearInterval(timer);
        // 释放定时器变量
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrowL.style.display = 'none';
        arrowR.style.display = 'none';

        // 鼠标离开就注册定时器
        timer = setInterval(function () {
            arrowR.click()
        }, 2000);
    })


    // 根据图片数量生成ol的li
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    // 声明两个变量，用于保存当前图片和小圆点的索引号，默认为0
    var ulliIndex = 0;
    var olliIndex = 0;
    for (var i = 0; i < ul.children.length; i++) {
        // 创建添加li元素
        var li = document.createElement('li');
        // 生成一个索引号
        li.setAttribute('index', i);
        ol.appendChild(li);
        // 注册点击事件，给当前li添加current类
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            this.className = 'current'

            // 点击就获取olliIndex索引号，保存起来（为了做无缝滚动，ul里面的li数量和ol的li数量不一样，所以需要另外保存)
            olliIndex = this.getAttribute('index');
            ulliIndex = olliIndex;
            // 点击ol的li ul就移动-focusWidth*olliIndex的距离
            animate(ul, -olliIndex * focusWidth); //此处遇到一个bug，如果浏览器缩小了视图，那么-1px无法设置动画，
            console.log(focusWidth);

        });
    }

    // 默认第一个li为current
    ol.children[0].className = 'current';



    // 无缝滚动，生成第一张放到最后面
    var clone = ul.children[0].cloneNode(true);
    ul.appendChild(clone);

    // 节流阀 利用回调函数，等动画完成才允许继续执行
    var flag = true;

    // 点击右侧，滚动一张
    arrowR.addEventListener('click', function () {
        if (flag) {
            // 关闭节流阀
            flag = false
            // 如果走到复制的最后一张（序号为ul.children.length-1)，下次再点击时，就先不做动画地复原到第一张，然后继续动画
            if (ulliIndex == ul.children.length - 1) {
                ulliIndex = 0
                ul.style.left = 0;
            }
            // ulliIndex代表当前ul的li序号 olliIndex代表小圆圈序号，因为最后一张图时，olli是立即变化，而ulli是下次点击才变化，所以要分开（不过也是可以计算他们的差值关系，用ulliIndex-1代替判断条件
            ulliIndex++;
            olliIndex++;
            animate(ul, -ulliIndex * focusWidth, function () {
                // 打开节流阀
                flag = true
            });
            // ol的li也跟着改变，这个必须要先做完动画再进行判断是否改变，因为需要保留他的状态
            if (olliIndex == ol.children.length) {
                olliIndex = 0
            }
            olliChange(olliIndex);
        }
    })
    arrowL.addEventListener('click', function () {
        if (flag) {
            flag = false;

            // 如果走到第一张，就先不做动画地移动到最后一张，然后继续动画
            if (ulliIndex == 0) {
                ulliIndex = ul.children.length - 1
                ul.style.left = -ulliIndex * focusWidth + 'px';

            }
            // 反向移动，递减
            ulliIndex--;
            olliIndex--;
            animate(ul, -ulliIndex * focusWidth, function () {
                flag = true
            });
            // ol的li也跟着改变，这个必须要先做完动画再进行判断是否改变，因为需要保留他的状态
            if (olliIndex < 0) {
                olliIndex = ol.children.length - 1
            }
            olliChange(olliIndex);
        }
    })

    // 因为两个箭头都用到这部分函数，所以单独拿出来，减少代码量
    function olliChange(ulliIndex) {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[ulliIndex].className = 'current'
    }

    // 自动轮播
    // 手动调用arrowR对象的点击事件
    var timer = setInterval(function () {
        arrowR.click()
    }, 2000);
})