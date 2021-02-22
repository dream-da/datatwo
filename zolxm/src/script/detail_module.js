//1.引入jquery模块
import {} from 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js';

let $sid = location.search.substring(1).split('=')[1];
if (!$sid) {
    $sid = 1;
}

//获取元素
const $pic = $('.pic');
const $title = $('.detail-name');
const $price = $('.price'); //价格
const $list = $('.list ul'); //数量加减
const $detail_main = $('.detail-main');
let $liwidth = 0;
let $lilenth = 0;

// 数据传输
$.ajax({
    url: 'http://10.31.165.19/zolxm/php/getsid.php',
    data: {
        datasid: $sid
    },
    dataType: 'json'
}).done(function(data) {
    $pic.attr('src', data.picurl);
    $title.html(data.title);
    $price.html(data.price);
    $('.dename').html('<em>></em>' + data.title);

    // 渲染小图列表------------------
    let $picarr = data.piclisturl.split(',');
    let $strHtml = '';
    $.each($picarr, function(index, value) {
        $strHtml += ` 
                <li>
                    <img src="${value}"/>    
                </li>
            `;
        $list.html($strHtml);
    });

    //给ul添加宽度----------------
    let $listimg = $('.list ul li').eq(0).innerWidth();
    $list.css({
        width: $listimg * $('.list ul li').length
    });

    $lilenth = $('.list ul li').length; // 获取li的数量
    if ($lilenth < 5) {
        $('.rightjt').css('color', '#fff');
    }
    //左右箭头切换--------------------
    $liwidth = $('.list ul li').eq(0).innerWidth(); //单个li的宽度
    let $num = 6;
    $('.rightjt').on('click', function() { //右箭头
        if ($lilenth > $num) {
            $num++;
            $('.leftjt').css('color', 'blue');
            if ($num === $lilenth) {
                $('.rightjt').css('color', 'red');
            }
        }
        $list.animate({
            left: -$liwidth * ($num - 6)
        });
    });

    $('.leftjt').on('click', function() { //左箭头
        if ($num > 6) {
            $num--;
            $('.rightjt').css('color', 'blue');
            if ($num === 6) {
                $('.leftjt').css('color', 'red');
            }
        }
        $list.animate({
            left: -$liwidth * ($num - 6)
        });
    });

});

$list.on('click', 'li', function() {
    let $url = $(this).find('img').attr('src');
    $pic.attr('src', $url);
});

// 购物车-------------------------------------
let $arrsid = [];
let $arrnum = [];

function getLocalStorage() {
    if (localStorage.getItem('localsid') && localStorage.getItem('localnum')) {
        $arrsid = localStorage.getItem('localsid').split(',');
        $arrnum = localStorage.getItem('localnum').split(',');
    } else {
        $arrsid = [];
        $arrnum = [];
    }
}

const $buycar = $('.buycar');
const $size = $('.size input');
let $sizenum = $size.val();
$('.jian').on('click', function() {
    if ($sizenum !== 0) {
        $sizenum--;
        $size.attr('value', $sizenum);
    }
});
$('.jia').on('click', function() {
    $sizenum++;
    $size.attr('value', $sizenum);
});

$buycar.on('click', function() {
    getLocalStorage();
    if ($arrsid.includes(String($sid))) {
        // alert('1判断块');
        let $index = $arrsid.indexOf(String($sid));
        $arrnum[$index] = parseInt($arrnum[$index]) + parseInt($size.val());
        localStorage.setItem('localnum', $arrnum);

    } else {
        // alert('2判断块');
        $arrsid.push($sid);
        localStorage.setItem('localsid', $arrsid);
        $arrnum.push($size.val());
        localStorage.setItem('localnum', $arrnum);
    }
});