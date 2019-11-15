// 商品列表渲染
class List {
    constructor(options) {
        this.url = options.url;
        this.cont = options.cont;
        this.load();
        this.addEvent();
    }
    load() {
        var that = this;
        ajaxGet(this.url, function (res) {
            that.res = JSON.parse(res);
            that.display();
        })
    }
    display() {
        var str = "";
        for (var i = 0; i < this.res.length; i++) {
            str += `
            <div class="goods-box" index="${this.res[i].goodsId}">
            <a href='goodsdetails.html?goodsId=${this.res[i].goodsId}'><img src="${this.res[i].magnifyImg}"/></a>
            <h4>${this.res[i].title}</h4>
            <p><i>${this.res[i].price}</i><span>${this.res[i].discount}</span></p>
            <input type="button" class="addcart" value="加入购物车"/>
        </div>
            `
        }
        this.cont.innerHTML = str;
    }
    addEvent() {
        var that = this;
        this.cont.onclick = function (eve) {
            if (eve.target.className == "addcart") {
                that.id = eve.target.parentNode.getAttribute("index");
                that.setCookie();
            }
        }
    }
    setCookie() {
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        if (this.goods.length == 0) {
            this.goods.push({
                id: this.id,
                num: 1
            })
        } else {
            // //
            // var onoff = true;
            // for (var i = 0; i < this.goods.length; i++) {
            //     if (this.goods[i].id === this.id) {
            //         this.goods[i].num++;
            //         onoff = false;
            //     }
            // }
            // if (onoff) {
            //     this.goods.push({
            //         id: this.id,
            //         num: 1
            //     })
            // }
            //
            var i = 0;
            var onoff = this.goods.some((val, index) => {
                i = index;
                return val.id == this.id;
            });
            if (onoff) {
                this.goods[i].num++;
            } else {
                this.goods.push({
                    id: this.id,
                    num: 1
                })
            }
        }
        setCookie("goods", JSON.stringify(this.goods));

    }
}

new List({
    url: "http://localhost/epet/goodslist.json",
    cont: document.querySelector(".goods-cont")
})

