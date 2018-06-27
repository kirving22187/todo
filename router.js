var LocalStorage = require('node-localstorage').LocalStorage;
var sessionStorage = require('sessionstorage');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

localStorage = new LocalStorage('./scratch');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//静态资源
router.use(express.static('public'));



//login登陆
router.get('/', function(req, res) {
    res.sendFile(__dirname + "/htmls/" + "login.html");
})
router.get('/login', function(req, res) {
    res.sendFile(__dirname + "/htmls/" + "login.html");
})

//注销
router.get('/logout', function(req, res) {
    console.log('hello')
    sessionStorage.removeItem('userState');
    console.log('hello')
    res.sendFile(__dirname + "/htmls/" + "login.html");
})

//index首页
router.get('/home', function(req, res) {
    const UserInfoState = sessionStorage.getItem('userState');
    if (UserInfoState) {
        res.sendFile(__dirname + "/htmls/" + "main.html");
    } else {
        res.redirect('/login');
    }

})

//

//表单提交数据处理

//登陆
router.post('/login_post', urlencodedParser, function(req, res) {
    var name = req.body.username;
    var password = req.body.password;
    var curAcc = JSON.parse(localStorage.getItem('users'));
 
        let id = 0;
         if (password === curAcc[id].passwd) { //密码正确 存储session
            const UserInfoNow = {
                name: name,
                passwd: password
            }
            sessionStorage.setItem('userState', JSON.stringify(UserInfoNow));
            res.redirect('/home');
            console.log(name + ' login success');
        } else {
            res.redirect('/login');
            console.log('password not right');
        }
    
    res.end();
})


module.exports = router;