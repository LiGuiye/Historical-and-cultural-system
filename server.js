
//引入我们需要的各种模块  ======================================================================
var express  = require('express');
//=====================第三方中间件==========================
//在www.npmjs.com可以查询和学习怎么使用
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 3500;

var passport = require('passport');
var flash    = require('connect-flash');


var path = require('path')
////app.js
var cors = require('cors');
	app.use(cors());



// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration
//配置中间件
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
//设置模板位置并配置ejs模板引擎
app.set('views', __dirname +'/views');
app.set('view engine', 'ejs');// set up ejs for templating

//给public目录下面的文件按提供静态web服务
app.use(express.static('public'));

//配置中间件express-session
app.use(session({
	secret: 'vidyapathaisalwaysrunning',//随便写一个string字符串用于服务器生成session时的签名，加密
	resave: false,
	saveUninitialized: true,   //强制将未初始化的session保存
	rolling:true 
} ));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//设置路由
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
