// ------------------------切换
$('#login a').click(function() {
    $('#register').show().prev().hide();
});

$('#register a').click(function() {
    $('#login').show().next().hide();
});

// .prev()  下一个兄弟;

var form = layui.form;
form.verify({
    // 规则名：[正则 不符合正则提醒信息]
    changdu: [/^\S{6,12}$/, "不满足长度要求"],
    // 规则名：函数 必须要return 不符合正则提醒信息
    same: function(val) {
        // 再次输入 val
        // 第一次输入：直接获取;html结构上做一些简单类名补充 方便获取
        if ($(".pwd").val() != val) {
            return "两次输入的密码不一致";
        }
    }

});

// --------------------------注册
$("#register .layui-form").on("submit", function(e) {
    // 1.阻止默认行为
    e.preventDefault();
    // 2.收集数据
    var data = $(this).serialize();
    // 3.接口 发出请求
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        data: data,
        success: function(res) {
            // 弹窗：msg（简单弹窗 会自动消失）
            layer.msg(res.message);

            if (res.status === 0) {
                // 注册成功，显示登录的盒子
                $('#login').show().next().hide();

                // 清空注册的表单(reset是dom方法，所以把jQuery对象转成DOM对象)
                $('#register .layui-form')[0].reset();
            }
        }
    });
});
// -----------------------------登陆
$('#login form').on('submit', function(e) {
    e.preventDefault();

    // 收集账号、密码
    var data = $(this).serialize();
    // ajax提交
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/login',
        data: data,
        success: function(res) {
            // 无论登录成功，还是失败，都给提示
            layer.msg(res.message);
            if (res.status === 0) {
                // 把token保存到本地存储
                localStorage.setItem('token', res.token);
                // 跳转到index.html
                location.href = '../index.html';
            }
        }
    });
})