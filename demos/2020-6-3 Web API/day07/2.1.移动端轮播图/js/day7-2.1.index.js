window.addEventListener('DOMContentLoaded', function () {
    // 获取元素
    var focus = document.querySelector('.focus');
    // 获取focus宽度
    var w = focus.offsetWidth;
    // 用子元素节点获取ul和ol
    var ul = focus.children[0];
    var ol = focus.children[1];

    // 动态生成ol的li
    for (var i = 0; i < ul.children.length; i++) {
        var olli = document.createElement('li');
        ol.appendChild(olli);
    }
    // 默认第一个li为current
    ol.children[0].classList.add('current');

    // 自动复制ul第一张图到最后，最后一张图到第一个前面
    var clone1 = ul.children[ul.children.length - 1].cloneNode(true);
    var clone2 = ul.children[0].cloneNode(true);
    ul.insertBefore(clone1, ul.children[0]);
    ul.appendChild(clone2);

    // 结构生成完毕 开始做动画效果

    // 声明一个索引号，默认为0
    var index = 0;



    // 封装几个重复次数多的代码作为函数

    // ulChange函数
    // 传入索引号，根据索引号判断ul移动到哪个位置
    function ulChange(index) {
        ul.target = -index * w;
        ul.style.transform = 'translateX(' + ul.target + 'px)';
    }

    // 设置和清除过渡的函数
    function setTransition(obj, duration) {
        duration = duration || '.3s';
        obj.style.transition = 'all ' + duration;
    }

    function clearTransition(obj) {
        obj.style.transition = 'none'
    }

    // 无缝滚动判断，当过渡完成后，判断是否为第一张和最后一张，如果是，则进行无过渡的跳转
    ul.addEventListener('transitionend', function () {

        // 当index大于等于ol.children.length，说明来到了最后一张图clone2，立即无过渡地快速跳转到clone2对应的原图位置index=0
        if (index >= ol.children.length) {
            clearTransition(ul);
            index = 0;
            ulChange(index);
        }
        // 当index小于等于0，说明来到了第一张图clone1，立即无过渡地快速跳转到clone1对应的原图位置，也就是clone2的前面一张图，clone2是index=ol.children.length,在他基础上-1：index=ol.children.length-1
        else if (index < 0) {
            // 清除过渡
            clearTransition(ul);
            // 
            index = ol.children.length - 1;
            ulChange(index);
        }


        // 小圆圈变化
        // olli跟着变化，这个是过渡动画完成才判断，要写在transitionend里面无缝滚动判断的后面
        // 先选出之前的current，删掉他的这个类，然后再给对应index的li添加current类
        // classList是ie10以上才支持，手机是webkit无所谓兼容性
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    })

    // 轮播定时器函数
    function setTimer() {
        clearInterval(ul.timer);
        ul.timer = setInterval(function () {
            index++;
            setTransition(ul);
            ulChange(index);
        }, 2000)
    }

    // dom加载完成，开启定时器
    setTimer();


    // 开始设置触摸相关的侦听器
    // 开始触摸
    ul.addEventListener('touchstart', function (e) {
        // 停止之前的轮播定时器，防止叠加
        clearInterval(ul.timer);
        // 获取起始手指x坐标
        ul.startX = e.targetTouches[0].pageX;
        // 初始化自定义属性作为全局变量，用于保存移动的距离，便于后面判断，这个距离默认是0
        ul.moveX = 0;

        // 移动手指，拖动图片，图片移动后的位置就是（图片原先位置+手指移动距离）
        ul.addEventListener('touchmove', function (e) {
            clearTransition(ul);
            ul.moveX = e.targetTouches[0].pageX - ul.startX;
            ul.targetX = -index * w + ul.moveX
            ul.style.transform = 'translateX(' + ul.targetX + 'px)';
        })
    })
    // 结束触摸，开始判断图片是回弹还是切换图片
    ul.addEventListener('touchend', function () {
        // 这个过渡动画时间比较短小
        setTransition(ul, '.1s');
        // 首先判断ul.moveX是否为0，为0表示没有移动，无需判断
        // 不为0，则判断移动距离的*绝对值*是否大于50，大于50，就切换图片，小于等于50就回到原先那张
        // 这里简化代码，嵌套两个三元表达式，当值为正数，是上一张,--index前自减，值为负，下一张，++index前自增，先自增自减再传参
        if (ul.moveX) Math.abs(ul.moveX) > 50 ? ulChange(ul.moveX > 0 ? --index : ++index) : ulChange(index);
        // 回弹判断动画完毕，把过渡重置为原先的.3s
        setTransition(ul);

        // 手指离开，开启定时器
        setTimer();

    });


    // 返回顶部按钮
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block'
        } else {
            goBack.style.display = 'none'
        }
    })
    goBack.addEventListener('click', function () {
        var timer = setInterval(function () {
            if (window.pageYOffset < 2) clearInterval(timer);
            step = -window.pageYOffset / 10
            window.scroll(0, window.pageYOffset + step)
        }, 20)
    })

})