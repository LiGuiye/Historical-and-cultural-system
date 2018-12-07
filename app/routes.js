var express = require('express')
var app = express();
var db = require('../server/db');
var poem_tang_gpu = require('../server/poem_tang_gpu');
var poem_song_cpu = require('../server/poem_song_cpu');
var SpeechSynthesis = require('../server/DownloadVoice');
var cors = require('cors');
	app.use(cors());

// app/routes.js
module.exports = function(app, passport) {
	
	//匹配所有路由，next使路由继续向下匹配，否则就会卡死不继续向下
	app.use(function(req, res, next) {
		console.log(new Date());
		next();
	});
	
	//随机写唐诗
	app.get('/CreatPoem_Tang_test',function(req, res) {
		poem_tang_gpu.aaa( req, res);
	});
	//写唐藏头诗
	app.get('/CreatPoem_Tang_head', function(req, res) {
		texthead = req.query.head;
		poem_tang_gpu.bbb(texthead, req, res);
	});
	//随机写宋词
	app.get('/CreatPoem_Song_test',function(req, res) {
		poem_song_cpu.aaa( req, res);
	});
	//写宋藏头诗
	app.get('/CreatPoem_Song_head', function(req, res) {
		texthead = req.query.head;
		poem_song_cpu.bbb(texthead, req, res);
	});
	
	//语音合成
	//地址栏输入例：localhost:3500/SpeechSynthesis?text=途说诗话
	//即可在代码目录下生成途说诗话四个字的语音文件
	app.get('/SpeechSynthesis', function(req, res){
		text = req.query.text;
		SpeechSynthesis.yuyinhecheng(text, req, res);
	});
	//在线语音合成
	app.get('/OnlineVoice', function(req, res) {
		res.render('OnlineVoice.ejs');
	});


	//================主页================================== 
	app.get('/', function(req, res) {
		res.render('index.ejs', {
			poemname: '',
			poemcontent: '',
			PoemTRANSLATE: '',
			PoemHISTORY: '',
			name: ''

		});
	});
	//搜索数据库中十大景点的内容
	app.get('/chaxun', function(req, res) {
		xuhao = req.query.id;
		db.getSingleFID(xuhao, req, res);
	});
	//查询诗人
	app.get('/selectpoet', function(req, res) {
		name = req.query.name;
		db.selectpoet(name, req, res);
	});
	app.get('/selectpoem', function(req, res) {
		name = req.query.name;
		db.selectpoem(name, req, res);
	});

	//调用数据库查询函数
	app.get('/suoyou', db.getAllPlayers);
	app.get('/dandian/:id', db.getSinglePlayer);
	app.post('/players', db.createPlayer);
	app.put('/players/:id', db.updatePlayer);
	app.delete('/players/:id', db.deletePlayer);

	app.get('/slider1', function(req, res) {
		res.render('slider1.ejs');
	});
	
	app.get('/slider2', function(req, res) {
		res.render('slider2.ejs');
	});
	
	app.get('/shidajingdian', function(req, res) {
		res.render('十大景点.ejs');
	});
	
	app.get('/xianqin', function(req, res) {
		res.render('先秦.ejs');
	});
	
	app.get('/chuyi', function(req, res) {
		res.render('初一.ejs');
	});
	
	app.get('/luxianguihua', function(req, res) {
		res.render('路线规划.ejs');
	});
	
	app.get('/shirenluxian', function(req, res) {
		res.render('李白.ejs');
	});
	// ================用户登录=====================
	//登陆失败就返回主页并显示错误提示loginMessage
	app.get('/login', function(req, res) {
		res.render('index.ejs', {
			message: req.flash('loginMessage')
		});
	});
	//两边都是post，建立一个中间件接收前端输入的表单并传给后端passport.js
	app.post('/login', passport.authenticate('local-login', {
			successRedirect: '/profile', // redirect to the secure profile section
			failureRedirect: '/login', // redirect back to the signup page if there is an error
			failureFlash: true // allow flash messages
		}),
		function(req, res) {
			console.log("hello");
			//设置cookie过期时间，单位为ms
			if(req.body.remember) {
				req.session.cookie.maxAge = 1000 * 60 * 3;
			} else {
				req.session.cookie.expires = false;
			}
			res.redirect('/');
		});

	// ================用户注册=====================
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('index.ejs', {
			message: req.flash('signupMessage')
		});
	});
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/signup', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));

	// ==============登录成功的页面=======================
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('loggedin.ejs', {
			poemname: '',
			poemcontent: '',
			PoemTRANSLATE: '',
			PoemHISTORY: '',
			name: ',' + req.user.username + '!' // get the user out of session and pass to template
		});
	});

	// ===============退出登录返回主页======================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	//匹配上面未匹配到的所有路由，并报错
	app.use(function(req, res) {
		res.status(404).send('没有匹配到路由，请检查routes.js');
	});

};

//next使路由继续向下匹配,用于权限判断,没有登陆跳转到首页,登录以后就继续往下匹配路由页面
//路由中间件
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	//如果用户在会话中进行了身份验证，请继续
	if(req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	//如果他们没有将他们重定向到主页
	res.redirect('/');
}