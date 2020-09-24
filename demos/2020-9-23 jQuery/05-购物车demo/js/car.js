$(function() {
    // 全选功能
    // 点击全选复选框
    $('.checkall').on('change',function () {
        // prop()方法可以获取或设置元素固有属性 如src、alt 等等
        $('.j-checkbox, .checkall').prop('checked',$(this).prop('checked'));

        // 修改选中项的类名
        if ($(this).prop("checked")) {
            // 让所有的商品添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(".cart-item").removeClass("check-cart-item");
        }
    })

    // 判断checkbox是否全部选中，如果全部选中，也给checkall勾选
    // 核心算法： .xxxx:checked的长度是否等于.xxxx的长度
    $('.j-checkbox').on('change',function() {
        // :chekced选择器 可以选出checked为true的项
        if($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true)
        } else {
            $('.checkall').prop('checked', false)
        }

        // 修改选中项类名
        if ($(this).prop("checked")) {
            // 让当前的商品添加 check-cart-item 类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
        // 修改底部总计数值
        calcSum();
    })

    // 商品数量增减功能
    // 由于用的多，封装一个获取商品数量的函数
    // 为了方便后面统一使用，把siblings获取改为先获取parent在find .itxt的val 因为siblings无法获取自身
    const getNumber = (item => item.parents('.cart-item').find('.itxt').val());
    // 获取单价的函数
    // 截取掉前面的￥符号
    const getPrice = (item => item.parents('.cart-item').find('.p-price').html().substr(1));
    // 计算商品总价的函数
    // toFixed(2)保留两位小数
    const calcGoodsPrice = (item =>  (getNumber(item) * getPrice(item)).toFixed(2));
    // 视图更新函数
    const refresh = ((item, n) => {
        item.siblings('.itxt').val(n);
        item.parents('.cart-item').find('.p-sum').html('￥' + calcGoodsPrice(item));
        calcSum();
    });
    
    // 增减
    $('.increment').on('click',function(){
        var n = getNumber($(this));
        n++;
        // 小计
        // console.log(getNumber($(this)),getPrice($(this)),calcGoodsPrice($(this)));
        refresh($(this), n);

    })
    // 减少
    $('.decrement').on('click',function(){
        var n = getNumber($(this));
        // 如果等于1就不能再减少了
        if (n == 1) return false;
        n--;
        refresh($(this), n);
    })
    
    // 文本框直接输入数字修改
    $('.itxt').on('change', function() {
        // 先获取文本框里的值
        var n = getNumber($(this));
        // console.log(n);
        // 然后更新数据
        refresh($(this), n);
    })

    // 求总计和总额的函数
    const calcSum = function () {
        var count = 0; //总件数
        var money = 0; //总价格
        // 先找到商品的item爸爸，再找小儿子itxt和p-sum
        var checkedItems = $('.j-checkbox:checked').parents('.cart-item');
        checkedItems.find(".itxt").each(function(index, element){
            // 循环累加
            count += parseInt($(element).val());
        })
        // 修改已选商品数
        $('.amount-sum em').text(count);
        
        // 计算总价
        checkedItems.find('.p-sum').each(function (i,e) {
            money += parseFloat($(e).text().substr(1));
        })
        // 修改总价
        // 浮点数保留两位小数
        $('.price-sum em').text('￥' + money.toFixed(2));
    }
})









/* $(function() {
    // 1. 全选 全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
    // 事件可以使用change
    $(".checkall").change(function() {
        // console.log($(this).prop("checked"));
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 让所有的商品添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
    $(".j-checkbox").change(function() {
        // if(被选中的小的复选框的个数 === 3) {
        //     就要选中全选按钮
        // } else {
        //     不要选中全选按钮
        // }
        // console.log($(".j-checkbox:checked").length);
        // $(".j-checkbox").length 这个是所有的小复选框的个数
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            // 让当前的商品添加 check-cart-item 类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    // 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    $(".increment").click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);
        // 3. 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
        // 当前商品的价格 p  
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        console.log(p);
        var price = (p * n).toFixed(2);
        // 小计模块 
        // toFixed(2) 可以让我们保留2位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });
    $(".decrement").click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        // console.log(n);
        n--;
        $(this).siblings(".itxt").val(n);
        // var p = $(this).parent().parent().siblings(".p-price").html();
        // parents(".p-num") 返回指定的祖先元素
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        console.log(p);
        // 小计模块 
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    //  4. 用户修改文本框的值 计算 小计模块  
    $(".itxt").change(function() {
        // 先得到文本框的里面的值 乘以 当前商品的单价 
        var n = $(this).val();
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    // 5. 计算总计和总额模块
    getSum();

    function getSum() {
        var count = 0; // 计算总件数 
        var money = 0; // 计算总价钱
        $(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    // 6. 删除商品模块
    // (1) 商品后面的删除按钮
    $(".p-action a").click(function() {
        // 删除的是当前的商品 
        $(this).parents(".cart-item").remove();
        getSum();
    });
    // (2) 删除选中的商品
    $(".remove-batch").click(function() {
        // 删除的是小的复选框选中的商品
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    // (3) 清空购物车 删除全部商品
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    })
}) */