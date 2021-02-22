//引入jquery模块
import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";

//引入懒加载模块
import {} from "http://10.31.165.19/zolxm/src/script/jquery.lazyload.js";

import {} from "http://10.31.165.19/zolxm/src/script/jquery.pagination.js";

const $list = $('.list ul');
let $page = null;


let $array = [];
let $array_default = [];
let $prev = 0;
let $next = 0;

$.ajax({
    url: 'http://10.31.165.19/ZOL/php/list.php',
    dataType: 'json'
}).done(function(data) {
    $page = data.pagesize;
    console.log(data);
    let $arrdata = data.pagecontent;
    let $strhtml = '';
    $.each($arrdata, function(index, value) {
        $strhtml += `
            <li>
                <a href="detail.html?sid=${value.sid}">
                    <img class='lazy' data-original="${value.picurl}" alt="" width="200" height="200">
                    <p>${value.title}</p>
                    <span>￥${value.price}</span>
                </a>
            </li>
        `;
    });
    $list.html($strhtml);

    $array = [];
    $array_default = [];

    $('.list li').each(function(index, element) {
        $array[index] = $(this);
        $array_default[index] = $(this);
    });

    $('img.lazy').lazyload({
        effect: "fadeIn"
    });

    $('.page').pagination({
        pageCount: $page,
        jump: true,
        prevContent: '上一页',
        nextContent: '下一页',
        callback: function(api) {
            $.ajax({
                url: 'http://10.31.165.19/ZOL/php/list.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function(data) {
                let $arrdata = data.pagecontent;
                let $strhtml = '';
                $.each($arrdata, function(index, value) {
                    $strhtml += `
                    <li>
                        <a href="detail.html?sid=${value.sid}">
                            <img class='lazy' data-original="${value.picurl}" alt="" width="200" height="200">
                            <p>${value.title}</p>
                            <span>￥${value.price}</span>
                        </a>
                    </li>
                `;
                });
                $list.html($strhtml);

                $array = [];
                $array_default = [];

                $('.list li').each(function(index, element) {
                    $array[index] = $(this);
                    $array_default[index] = $(this);
                });

                $('img.lazy').lazyload({
                    effect: "fadeIn"
                });
            });
        }
    });
});

$('.px li').eq(0).on('click', function() {
    $(this).addClass('active').siblings('li').removeClass('active');
    $.each($array_default, function(index, value) {
        $list.append(value);
    });
    return;
});

$('.px li').eq(1).on('click', function() {
    $(this).addClass('active').siblings('li').removeClass('active');
    for (let i = 0; i < $array.length - 1; i++) {
        for (let j = 0; j < $array.length - i - 1; j++) {
            $prev = parseFloat($array[j].find('span').html().substring(1));
            $next = parseFloat($array[j + 1].find('span').html().substring(1));
            if ($prev > $next) {
                let temp = $array[j];
                $array[j] = $array[j + 1];
                $array[j + 1] = temp;
            }
        }
    };

    $.each($array, function(index, value) {
        $list.append(value);
    });
});

$('.px li').eq(2).on('click', function() {
    $(this).addClass('active').siblings('li').removeClass('active');
    for (let i = 0; i < $array.length - 1; i++) {
        for (let j = 0; j < $array.length - i - 1; j++) {
            $prev = parseFloat($array[j].find('span').html().substring(1));
            $next = parseFloat($array[j + 1].find('span').html().substring(1));
            if ($prev < $next) {
                let temp = $array[j];
                $array[j] = $array[j + 1];
                $array[j + 1] = temp;
            }
        }
    };

    $.each($array, function(index, value) {
        $list.append(value);
    });
});