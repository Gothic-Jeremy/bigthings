// ------------------------------------------------基本信息获取
var form = layui.form;

function get() {
    $.ajax({
        url: "/my/userinfo",
        success: function(res) {
            layer.msg(res.message);
            console.log(res);
            if (res.status == 0) {
                // var data = res.data;
                // input框赋值：{username:xxx}
                // $("input[name='username']").val(data.username);
                // $("input[name='nickname']").val(data.nickname);
                // $("input[name='email']").val(data.email);

                // 快速赋值：layUI
                form.val("user", res.data);
            }
        }
    });
}
get();


// -----------------------------------------------------更新数据
// 1. 初始化赋值id
// 2. 收集不会收集disabled；
$("form").on("submit", function(e) {
    e.preventDefault();

    // 1 收集数据
    var data = $(this).serialize();

    // 2.发送请求
    $.ajax({
        type: 'POST',
        url: '/my/userinfo',
        data: data,
        success: function(res) {
            layer.msg(res.message);
            if (res.status == 0) {
                // 业务设计： userInfo页面虽然看起来index在一个页面；其实这是两个页面；
                // 需要：通知外层  JS 代码 重新获取用户信息；
                //       回到index.js 进行获取用户数据的函数封装；
                //       以便在这里调用
                window.parent.get();
            }
        }
    })



})



// --------------------------------------------------重置不是清空，恢复到服务器上数据
$('.my-reset').click(function(e) {
    e.preventDefault();

    // 用户数据重新获取；
    get();
});