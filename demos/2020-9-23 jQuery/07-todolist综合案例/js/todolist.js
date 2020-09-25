$(function(){
    // !获取复用次数多的元素
    // 文本框
    var title = $('#title');
    // ol和ul
    var list = $('#todolist, #donelist');

    // !功能
    // *初始化任务数组，和教程视频里面不同的是，data是作为了当前代码块的全局变量，这样是为了不用每次都重新获取localStorage
    var data = getData();
    // *页面加载时先获取一下数据，然后初始渲染
    render();
    // *文本框按下回车添加数据
    title.on('keyup',function(evt) {
        // keyCode也可以，但是标准已将其弃用了，用key代替
        // !这个是大写的Enter 一开始用的enter小写了死活不对
        // console.log(evt.key);
        if(evt.key == 'Enter'){
            // 判断是否输入了内容
            if (title.val().trim().length > 0){
                data.push({
                    title: title.val(),
                    done: false
                });
                // console.log(data);
                saveData(data);
                render();
                // 清空title
                title.val('');
            }
            else {
                alert('请输入内容')
            }
        }
    })

    // *删除功能
    list.on('click','a',function(){
        // *步骤：
        // 1.获取本地存储(上面已经获取过了)
        // 2.修改数据
        // 3.保存到本地存储
        // 4.渲染页面
        var index = $(this).attr('data-id'); // 这里也可以用data(id)来得到id
        // console.log(index);
        data.splice(index, 1);  // 删除数组元素
        saveData(data);
        render();
    })

    // *已完成状态切换
    list.on('click', 'input', function() {
        var index = $(this).siblings('a').attr('data-id');
        // *根据选框是否选中 设置done的布尔值
        data[index].done = $(this).prop('checked');
        saveData(data);
        render();
    })



    // !封装函数
    // ?localStorage不能直接存对象，存的字符串，需要把数据对象转成json字符串
    // *保存数据
    function saveData(data) {
        localStorage.setItem('todoList', JSON.stringify(data));
    }
    // *获取数据
    function getData() {
        var data = localStorage.getItem('todoList');
        if (data !== null) {
            return JSON.parse(data);
        }else {
            return [];
        }
    }

    
    // *获取并渲染数据
    function render(){
        // *任务计数 写在render()里面 遍历的同时计算
        var todoCount = 0;
        var doneCount = 0;
        // !遍历之前把旧的清除掉再重新渲染
        list.empty();
        $.each(data, function(i,e){
            // ?如果done为false 加到ol，为true则加到ul
            // !渲染时加一个自定义属性，方便后面对某一项单独操作
            if(!e.done) {
                $('ol').prepend('<li><input type="checkbox"><p>'+ e.title +'</p><a href="javascript:;" data-id="'+ i +'"></a></li>');
                todoCount ++; // 任务计数
            }else {
                $('ul').prepend('<li><input type="checkbox" checked="checked"><p>'+ e.title +'</p><a href="javascript:;" data-id="'+ i +'"></a></li>')
                doneCount ++;
            }
        })

        // 任务计数渲染
        $('#todocount').text(todoCount);
        $('#donecount').text(doneCount);
    }
})































/* $(function() {
    // alert(11);
    // 1. 按下回车 把完整数据 存储到本地存储里面
    // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您要的操作");
            } else {
                // 先读取本地存储原来的数据
                var local = getDate();
                // console.log(local);
                // 把local数组进行更新数据 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                // 把这个数组local 存储给本地存储
                saveDate(local);
                // 2. toDoList 本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });
    // 3. toDoList 删除操作
    $("ol, ul").on("click", "a", function() {
        // alert(11);
        // 先获取本地存储
        var data = getDate();
        console.log(data);
        // 修改数据
        var index = $(this).attr("id");
        console.log(index);
        data.splice(index, 1);
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });
    // 4. toDoList 正在进行和已完成选项操作
    $("ol, ul").on("click", "input", function() {
        // alert(11);
        // 先获取本地存储的数据
        var data = getDate();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        // data[?].done = ?
        data[index].done = $(this).prop("checked");
        console.log(data);

        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });
    // 读取本地存储的数据 
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    // 渲染加载数据
    function load() {
        // 读取本地存储的数据
        var data = getDate();
        console.log(data);
        // 遍历之前先要清空ol里面的元素内容
        $("ol, ul").empty();
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已经完成的个数
        // 遍历这个数据
        $.each(data, function(i, n) {
            // console.log(n);
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                todoCount++;
            }

        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);

    }

}) */