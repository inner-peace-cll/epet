class Cart {
    constructor(options) {
        this.url = options.url;
        this.tbody = options.tbody;
        this.load();
        this.addEvent();
    }
    load() {
        var that = this;
        ajaxGet(this.url, function (res) {
            that.res = JSON.parse(res);
            that.getCookie();
        })
    }
    getCookie() {
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        this.display();
    }
    display() {
        var str = "";
        for (var i = 0; i < this.res.length; i++) {
            for (var j = 0; j < this.goods.length; j++) {
                if (this.res[i].goodsId === this.goods[j].id) {
                    str += `<tr index="${this.res[j].id}">
                    <td width="60" align="center" class="check">
                        <label>
                            <input type="checkbox" checked>
                        </label>
                    </td>
                    <td><img src="${this.res[i].magnifyImg}" alt="" style="width:90px;height:90px"></td>
                    <td width="520">${this.res[i].title}</td>
                    <td width="150" align="center" class="add-sub">
                        <input type="button" value="-" class="goodsSub"/>
                        <i class="numbox">${this.goods[j].num}</i>
                        <input type="button" value="+" class="goodsAdd"/>
                    </td>
                    <td width="150" align="center" class="price">${this.res[i].priceOne}</td>
                    <td width="150" align="center" class="subtotal"></td>
                    <td width="150" align="center" class="del">
                        <span>删除</span>
                    </td>
                </tr>`
                }
                this.tbody.innerHTML = str;
            }
        }
    }

    addEvent() {
        var that = this;
        this.tbody.addEventListener("click", function (eve) {
            if (eve.target.tagName == "SPAN") {
                that.id = eve.target.parentNode.parentNode.getAttribute("index");
                eve.target.parentNode.parentNode.remove();
                that.updateCookie(function (i) {
                    that.goods.splice(i, 1);
                });
            }
        })
        this.tbody.addEventListener("input", function (eve) {
            if (eve.target.tagName == "INPUT") {
                that.id = eve.target.parentNode.parentNode.getAttribute("index");
                that.updateCookie(function (i) {
                    that.goods[i].num = eve.target.value;
                });
            }
        })
    }
    updateCookie(cb) {
        for (var i = 0; i < this.goods.length; i++) {
            if (this.goods[i].id === this.id) {
                cb(i);
            }
        }
        setCookie("goods", JSON.stringify(this.goods));
    }
}
new Cart({
    url: "http://localhost/epet/goodslist.json",
    tbody: document.querySelector("tbody")
})


$(function () {
    // 全选
    $("#checkAll input").click(function () {
        var flag = $(this).prop("checked");
        if (flag) {
            $(".check label input").prop("checked", true);

            // $("#checkAll label").css("background", "url(img/confirm.png) no-repeat center left");
            // $(".check label").css("background", "url(img/confirm.png) no-repeat center");

        } else {
            $(".check label input").prop("checked", false);

            // $("#checkAll label").css("background", "url(img/confirm_no.png) no-repeat center left");
            // $(".check label").css("background", "url(img/confirm_no.png) no-repeat center");
        }
        counts();
        totalPrice();
    });

    //单选
    $(".check input").click(function () {
        var flag = $(this).prop("checked"); //获取当前input的状态
        var CL = $(".check input").length; //列表长度；
        var CH = $(".check input:checked").length; //列表中被选中的长度

        if (flag) {
            $(this).parent("label").css("background", "url(img/confirm.png) no-repeat center");
        } else {
            $(this).parent("label").css("background", "url(img/confirm_no.png) no-repeat center");
        }

        if (CL == CH) {
            $("#checkAll input").prop("checked", true);
            $("#checkAll label").css("background", "url(img/confirm.png) no-repeat center left");
        } else {
            $("#checkAll input").prop("checked", false);
            $("#checkAll label").css("background", "url(img/confirm_no.png) no-repeat center left");
        }
        counts();
        totalPrice();
    })

    //数目加
    $(".goodsAdd").click(function () {
        var num = $(this).prev().val();
        var price = parseFloat($(this).parent().siblings(".price").text());
        num++;
        $(this).prev().val(num);

        //      小计
        $(this).parent().siblings(".subtotal").text((price * num).toFixed(2));
        counts();
        totalPrice();
    })

    //数目减
    $(".goodsSub").click(function () {
        var num = $(this).next().val();
        var price = parseFloat($(this).parent().siblings(".price").text());
        num--;

        if (num <= 0) {
            num = 0
        }
        $(this).next().val(num);

        //      小计
        $(this).parent().siblings(".subtotal").text((price * num).toFixed(2));
        counts();
        totalPrice();
    })

    //文本框脱里焦点处理
    $('.numbox').each(function (i) {
        $(this).blur(function () {
            let p = parseFloat($(this).parents('tr').find(".subtotal").text());
            let c = parseFloat(this.value);
            console.log(p * c);
            $(this).parents('tr').find(".subtotal").text((c * p).toFixed(2));
            counts();
            totalPrice();
        })
    })

    //单行删除
    $(".del").click(function () {
        var flag = $(this).parent().siblings().find("input").prop("checked");
        if (flag) {
            if (confirm("是否确定删除")) {
                $(this).parents("tr").remove();
                var CL = $(".check input").length; //列表长度；
                if (CL == 0) {
                    $("#checkAll label input").prop("checked", false);
                    $("#checkAll label").css("background", "url(img/confirm_no.png) no-repeat center left");
                }
                counts();
                totalPrice();
            }
        }
    })


    //总价格
    totalPrice();

    function totalPrice() {
        var prices = 0;
        $('.check input:checked').each(function (i) {
            console.log()
            prices += parseFloat($(this).parents("tr").find('.subtotal').text());
        })
        $('#total').text(prices);
    }
    //总数目
    counts();

    function counts() {
        var sum = 0;
        $('.check input:checked').each(function (i) {
            sum += parseInt($(this).parents("tr").find('.numbox').val());
        })
        $('#numAll').text(sum);
    }

})
