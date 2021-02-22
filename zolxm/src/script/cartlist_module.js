//1.引入jquery模块
import {} from 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js';


//2.获取本地存储里面的数据进行渲染(渲染过程封装函数实现)
if (localStorage.getItem('localsid') && localStorage.getItem('localnum')) {
    let arrsid = localStorage.getItem('localsid').split(','); //编号  [1,2,3,4]
    let arrnum = localStorage.getItem('localnum').split(','); //数量  [10,20,30,40]
    for (let i = 0; i < arrsid.length; i++) {
        renderList(arrsid[i], arrnum[i]); //sid:编号  num:数量。
    }

}


function renderList(sid, num) { //sid:编号  num:数量。
    $.ajax({
        url: 'http://10.31.165.19/zolxm/php/alldata.php',
        dataType: 'json'
    }).done(function(data) {

        $.each(data, function(index, value) { //遍历数组和对象  index:数组索引  value:每一个数据-对象
            if (value.sid === sid) { //根据当前的sid找对应的数据
                let $clonebox = $('.cart-box:hidden').clone(true, true);
                $clonebox.find('.desc-img img').attr('src', value.picurl); //小图片
                $clonebox.find('.p-nameone').html(value.title); //商品名字
                $clonebox.find('.p-nametwo').html(value.title); //商品名字2
                $clonebox.find('.cart-box-price').html(value.price);
                // // 单价
                $clonebox.find('.cart-box-num input').val(num); //输入框
                $clonebox.find('.cart-box-prices .mi').html((value.price * num).toFixed(2)); //单项商品总价
                $clonebox.css('display', 'block'); //显示克隆的元素
                $('.cart-bigbox').append($clonebox); //追加

                allprice(); //计算总价
                // jiajian();
            }
        });
    });
}

// function jiajian() {
//     $('.cart-box:visible').each(function(index, element) {
//         let $nums = $(this).find('.cart-box-num input').val();
//         // console.log($nums);
//         $('.jian').on('click', function() { //-
//             if ($nums !== 0) {
//                 $nums--;
//                 $(this).find('.cart-box-num input').attr('value', $nums);
//             }
//         });
//         // $('.jia').on('click', function() { //+
//         //     $nums++;
//         //     console.log($nums);
//         //     // $(this).find('.cart-box-num input').attr('value', $nums);
//         // });
//         // });

//     });
// }
// 4.封装函数统计商品的数量和总价(多次涉及改变，所有封装)
function allprice() {
    let $allnum = 0; //存储商品的数量
    let $allprice = 0; //存储商品的总价
    $('.cart-box:visible').each(function(index, element) {
        $allnum += parseInt($(this).find('.cart-box-num input').val());

        $allprice += parseInt($(this).find('.cart-box-prices .mi').html());

        $('.bycar-sp span').html($allnum); //赋值总的数量 全部商品总数量
        $('.bycar-prices span').html('￥' + $allprice); //赋值总的价格 总价
    });

}