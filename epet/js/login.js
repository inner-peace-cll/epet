//登录注册
if (window.localStorage.userArr) {//判断是否存在
    var array = JSON.parse(window.localStorage.userArr);
} else {
    array = [];//创建一个新数组
}
document.getElementById("login").onclick = function () {
    var username = document.getElementById("user").value;
    var password = document.getElementById("pass").value;
    var isHad = false;//定义一个开关变量
    var index = 0; //定义一个下标确定用户
    //遍历数组进行匹配
    for (var i = 0; i < array.length; i++) {
        if (username == array[i].username) {//有这个账号
            isHad = true;
            index = i;
        }
    }
    if (isHad) {//如果存在
        if (password == array[index].password) {
            alert("登录成功");
        } else {
            alert("密码错误");
        }
    } else {//账号不存在或输入错误
        alert('账号不存在或输入错误');
    }
}
