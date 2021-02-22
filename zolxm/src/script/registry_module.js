// 操作过程：
// 引入或者加载jquey模块
import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";


const $username = $('.username');
const $password = $('.password');
const $repass = $('.repass');
const $span = $('.tstext');
const $form = $('form');
let $userflag = true;
let $passflag = true;
let $repassflag = true;

//失去焦点将前端的用户名传给后端
$username.on('focus', function() {
    // $spans.eq(1).html('输入正确的用户密码');
    $username.css({
        border: '1px solid red'
    });
});
$username.on('blur', function() {
    $username.css({
        border: '1px solid #ddd'
    });
    if ($username.val() !== '') {
        if (/^1[34578][0-9]{9}$/.test($username.val())) {
            $.ajax({
                type: 'post',
                url: 'http://10.31.165.19/zolxm/php/reg.php',
                data: {
                    checkname: $username.val()
                }
            }).done(function(data) { //根据后端的返回值确定是否重名
                if (data === 'true') { //存在
                    $span.eq(0).html('该手机号已存在');
                    $span.eq(0).css('color', 'red');
                    $userflag = false;
                } else if (data === 'false') {
                    $span.eq(0).html('√');
                    $span.eq(0).css('color', 'green');
                    $userflag = true;
                }
            });
        } else {
            $span.eq(0).html('输入的手机号码格式不对');
            $span.eq(0).css('color', 'red');
            $userflag = false;
        }
    } else {
        $span.eq(0).html('手机号码不能为空');
        $span.eq(0).css('color', 'red');
        $userflag = false;
    }
});

$password.on('focus', function() {
    $password.css({
        border: '1px solid red'
    });
});
$password.on('blur', function() {
    $password.css({
        border: '1px solid #ddd'
    });
    if ($password.val() !== '') {
        if ($password.val().length >= 6) {
            $span.eq(1).html('√');
            $span.eq(1).css('color', 'green');
            $passflag = true;

        } else {
            $span.eq(1).html('密码至少6位');
            $span.eq(1).css('color', 'red');
            $passflag = false;
        }

    } else {
        $span.eq(1).html('密码不能为空');
        $span.eq(1).css('color', 'red');
        $passflag = false;
    }
});

$repass.on('focus', function() {
    $repass.css({
        border: '1px solid red'
    });
});

$repass.on('blur', function() {
    $repass.css({
        border: '1px solid #ddd'
    });
    if ($repass.val() === $password.val()) {
        if ($repass.val().length >= 6) {
            $span.eq(2).html('√');
            $span.eq(2).css('color', 'green');
            $repassflag = true;

        } else {
            $span.eq(2).html('输入的密码不一致');
            $span.eq(2).css('color', 'red');
            $repassflag = false;
        }

    } else {
        $span.eq(2).html('你还没有输入用户密码');
        $span.eq(2).css('color', 'red');
        $repassflag = false;
    }
});

//阻止浏览器的submit跳转，如果用户名不能通过，不允许提交注册。
$form.on('submit', function() {
    if ($userflag === false || $passflag === false || $repassflag === false) {
        return false;
    }
});


//如果注册成功跳转到登录页面 - 后端做的