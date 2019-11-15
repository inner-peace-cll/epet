
//请求json数据拼接字符串，并在URL传参数id跳转
$(function () {
    var str = window.location.href;
    //获取url中的参数?goodsId="1"
    function getUrlParam(str) {
        if (str.indexOf('?') == -1) {
            return false;
        } else {
            var s = str.slice(str.indexOf('?') + 1);
            var arr = s.split('=');
            return arr[1];
        }
    }
    getUrlParam(str);
    //接收URL中的参数booksId
    var id = getUrlParam(str);
    $.ajax({
        type: 'get',
        url: 'http://localhost/epet/goodsdetails.json',
        dataType: 'json',
        success: function (res, status) {
            $.each(res.goods, function (inx, val) {
                //根据id获取详情数据
                if (id == val.goodsId) {
                    var str = "<div class='purchase'><div class='magnifying'><img src='" + val.magnifyImg + "'class='magnify-img'><h5>商品ID：" + val.goodsId + "</h5></div><div class='add-to-cart'><h3>" + val.title + "</h3><h4>市场价：<span class='span1'>" + val.price + "</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E宠价：<span class='span2'>" + val.discount + "</span></h4><p>数量：<input type='button' class='augment' value='-' /><input type='text' class='inputnum' value='0' /><input type='button' class='subtract' value='+' /></p><input type='button' class='addTo' value='加入购物车' /></div></div ><div class='goods-detail'><img src='" + val.detailsImg + "' alt=''></div>"
                    console.log('index:' + inx);
                }
                $('.goodsdetails-box').append(str);
            });
        }
    })
})
