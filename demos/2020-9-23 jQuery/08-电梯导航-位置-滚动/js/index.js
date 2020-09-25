$(function(){
    // !声明一个flag变量，将点击电梯滚动页面和滚动页面切换电梯设定为互斥事件,否则会鬼畜(互斥锁、节流阀)
    var flag = true;
    // *1.显示隐藏电梯导航
    toggleTool();  //  页面打开先判断一下是否显示，因为可能是刷新的
    // 页面滚动事件
    $(window).on('scroll',function(){
        // console.log(flag);
        // 电梯导航显示和隐藏
        toggleTool()
        // *3.滚动到某个楼层区域，电梯导航状态跟着改变
        if(flag) {
            $('.floor .w').each(function(i,e){
                if($(document).scrollTop() >= $(e).offset().top) {
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass('current');
                }
            })
        }
    })

    // *2.点击电梯导航，滚动到相应高度
    $('.fixedtool li').on('click',function(){
        flag = false; // 点击的时候，锁上互斥锁，禁止滚动切换电梯
        // 根据索引号得到楼层的offset().top
        var current = $('.floor .w').eq($(this).index()).offset().top;
        // 滚动动画
        // 滚动动画要给body和html加，而不是document
        $('body, html').stop().animate({
            scrollTop: current
        },function() {
            // 动画完成  打开互斥锁
            flag = true;
        });

        // 改变样式
        $(this).addClass('current').siblings().removeClass('current');
        
    })

    function toggleTool() {
        //  *如果页面卷去的头部大于推荐模块的offset top值，就显示电梯导航
        if ($(document).scrollTop() >= $('.recommend').offset().top){
            $('.fixedtool').fadeIn();
        }else {
            $('.fixedtool').fadeOut();
        }
    }
})


































/* $(function() {
    // 当我们点击了小li 此时不需要执行 页面滚动事件里面的 li 的背景选择 添加 current
    // 节流阀  互斥锁 
    var flag = true;
    // 1.显示隐藏电梯导航
    var toolTop = $(".recommend").offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        };
    }

    $(window).scroll(function() {
        toggleTool();
        // 3. 页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名


        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    console.log(i);
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();

                }
            })
        }



    });
    // 2. 点击电梯导航页面可以滚动到相应内容区域
    $(".fixedtool li").click(function() {
        flag = false;
        console.log($(this).index());
        // 当我们每次点击小li 就需要计算出页面要去往的位置 
        // 选出对应索引号的内容区的盒子 计算它的.offset().top
        var current = $(".floor .w").eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $("body, html").stop().animate({
            scrollTop: current
        }, function() {
            flag = true;
        });
        // 点击之后，让当前的小li 添加current 类名 ，姐妹移除current类名
        $(this).addClass("current").siblings().removeClass();
    })
}) */