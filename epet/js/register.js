//登录注册
if (window.localStorage.userArr) {//判断是否存在
    var array = JSON.parse(window.localStorage.userArr);
} else {
    array = [];//创建一个新数组
}

document.getElementById("register").onclick = function () {
    var username = document.getElementById('user').value;
    var password = document.getElementById('pass').value;
    //遍历数组进行匹配
    for (var i = 0; i < array.length; i++) {
        //判断是否有相同账号
        if (username == array[i].username) {
            alert("该账号已存在");
            return;
        }
    }
    //创建对象
    var obj = { username: username, password: password }
    array.push(obj);
    window.localStorage.userArr = JSON.stringify(array);
    alert("注册成功");

}
