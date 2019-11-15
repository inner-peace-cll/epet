//轮播图
$(".banner").banner({
    imgs: $(".banner").find("img"),
    left: $(".banner").find("#left"),
    right: $(".banner").find("#right"),
    list: true,
    autoPlay: true,
    delayTime: 2000,
    moveTime: 200,
    listBgColor: "#fff"
})

// 页面主体分页选项卡
$(".floor-1-top").children("ul").children("li").hover(function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".container").children("div").css("display", "none").eq($(this).index()).css("display", "block");
})

//楼层
$(".elevator").children("li").click(function () {
    var i = $(this).index();
    var now = $(".floor").eq(i);
    var t = now.offset().top;
    $("html").animate({
        scrollTop: t
    })
})

//懒加载
var imgs = document.querySelectorAll(".lazyload");
var clientH = document.documentElement.clientHeight;
var scrollT = document.documentElement.scrollTop;
var arr = [];
for (var i = 0; i < imgs.length; i++) {
    arr.push(imgs[i]);
}
function lazyLoad(elements, cH, sT) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].offsetTop < cH + sT) {
            arr[i].src = arr[i].getAttribute("src-data");
            arr.splice(i, 1);
            i--;
        }
    }
}
lazyLoad(imgs, clientH, scrollT);
onscroll = function () {
    var scrollT = document.documentElement.scrollTop;
    lazyLoad(imgs, clientH, scrollT);
}