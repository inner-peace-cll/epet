;(function($){
    "use strict";
    // 向jQuery的全局对象绑定函数的方法：$.banner = function(){}
    // 向jQuery的DOM对象绑定函数的方法：$.fn.banner = function(){}
    // jQuery提供的专门用来向全局对象绑定函数的方法：$.extend()
    // jQuery提供的专门用来向DOM对象绑定函数的方法：$.fn.extend()

    $.fn.extend({
        banner:function(options){
            //因为this指向jQ的DOM对象，放置重复属性，慎用
            this.obj = {};
            //给this自定义对象，以供面向使用
            var that = this.obj;
            //解析参数
            that.imgs = options.imgs;
            that.list = options.list == false ? false : true;
            that.autoPlay = options.autoPlay == false ? false : true;
            that.delayTime = options.delayTime || 2000;
            that.moveTime = options.moveTime || 200;
            that.listBgColor = options.listBgColor || "#fff";
            
            //假设当前索引为0
            that.index = 0;
            //刚走的是最后一张
            that.iPrev = that.imgs.length - 1;
            
            function btnRight(){
                // 计算索引
                if(that.index == that.imgs.length-1){
                    that.index = 0;
                    that.iPrev = that.imgs.length-1;
                }else{
                    that.index++;
                    that.iPrev = that.index-1;
                }
                // 开始移动，传入方向
                that.btnMove(-1);
            }
            
            //移动：根据方向，在移动之前，先设置初始位置
            that.btnMove = function(t){
                that.imgs.eq(that.iPrev).css({
                    left:0
                }).stop().animate({
                    left:that.imgs.eq(0).width() * t
                })
                that.imgs.eq(that.index).css({
                    left:-that.imgs.eq(0).width() * t
                }).stop().animate({
                    left:0
                })

                if(that.list){
                    ul.children("li").css({
                        background:"#ccc"
                    }).eq(that.index).css({
                        background:that.listBgColor
                    })
                }
            }

            function btnLeft(){
                // 计算索引
                if(that.index == 0){
                    that.index = that.imgs.length-1;
                    that.iPrev = 0;
                }else{
                    that.index--;
                    that.iPrev = that.index+1;
                }
                // 开始移动，传入方向
                that.btnMove(1)
            }

            //判断是否存在按钮
            if(options.left!=undefined && options.left.length>0 && options.right!=undefined && options.right.length>0){
                // 绑定左右按钮事件
                options.left.click(btnLeft)
                options.right.click(btnRight)
            }

            //判断是否有小圆点
            if(that.list){
                var str = "";
                // 创建图片对应的li
                for(var i=0;i<options.imgs.length;i++){
                    str += `<li>${i+1}</li>`;
                }
                // 创建放置li的ul
                var ul = $("<ul>").html(str);
                this.append(ul);
                // 设置ul和li的样式
                ul.css({
                    width:"100%",
                    hieght:20,
                    display:"flex",
                    justifyContent:"center",
                    position:"absolute",
                    left:0,
                    bottom:10,
                    listStyle:"none",
                    margin:0,
                    padding:0,
                    textAlign:"center",
                    lineHeight:"20px"
                }).children("li").css({
                    width:20,
                    height:20,
                    borderRadius:"50%",
                    background:"#ccc",
                    margin:"0 10px",
                    cursor:"pointer"
                }).eq(that.index).css({
                    background:that.listBgColor
                });

                // 给li绑定事件
                ul.children("li").click(function(){
                    // 点击时，通过点击的索引和当前索引的大小，判断移动方向
                    if($(this).index() > that.index){
                        // console.log("左")
                        // 执行list的移动功能
                        that.listMove($(this).index(),1)
                    }else if($(this).index() < that.index){
                        // 执行list的移动功能
                        that.listMove($(this).index(),-1)
                    }
                    // 点击之后设置li的当前项
                    $(this).css({
                        background:that.listBgColor
                    }).siblings().css({
                        background:"#ccc"
                    })

                    // 点击之后，当前点击的索引就是下一次的当前索引
                    that.index = $(this).index();
                })
                // list的移动功能
                that.listMove = function(iNow,t){
                    options.imgs.eq(that.index).css({
                        left:0
                    }).stop().animate({
                        left:-options.imgs.eq(0).width() * t
                    })
                    options.imgs.eq(iNow).css({
                        left:options.imgs.eq(0).width() * t
                    }).stop().animate({
                        left:0
                    })
                }
                
            }

            //判断是否需要自动轮播
            if(that.autoPlay){
                // 立即开启
                that.t = setInterval(() => {
                    // 自动执行右按钮的事件处理函数
                    btnRight()
                }, that.delayTime);

                // 鼠标经过大框停止，离开继续
                this.hover(function(){
                    clearInterval(that.t)
                },function(){
                    that.t = setInterval(() => {
                        btnRight()
                    }, that.delayTime);
                })
            }  
        }
    })
})(jQuery);