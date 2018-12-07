	function show_writeDiv() { //弹出层
		var objDiv = document.getElementById("popdiv_write");
		objDiv.style.visibility = "visible"; //改变属性可见
	}

	function hide_writeDiv() { //关闭层
		//获得Div
		var objDiv = document.getElementById("popdiv_write");
		//改变属性—隐藏
		objDiv.style.visibility = "hidden";
	}

	function CreatPoem() {

		var aaa = document.getElementById("PoemText").value;
		var checknum = "";

		var obj1 = document.getElementsByName("radio");

		for(var i = 0; i < obj1.length; i++) {

			if(obj1[i].checked) {

				checknum = obj1[i].value;
				console.log(obj1[i].value);

			}

		}
		if(checknum == "option1") {

			//唐诗
			if(aaa == '') {
				//随机写诗
				CreatTestPoem_Tang();
				console.log("CreatTestPoem_Tang");
			} else {
				//写藏头诗
				CreatHeadPoem_Tang(aaa);
				console.log("CreatHeadPoem_Tang");
			}
		} else {

			//宋词
			if(aaa == '') {
				//随机写诗
				CreatTestPoem_Song();
				console.log("CreatTestPoem_Song");
			} else {
				//写藏头诗
				CreatHeadPoem_Song(aaa);
				console.log("CreatHeadPoem_Song");
			}
		}

	}
	//写唐诗===========================================================================
	//随机写诗
	function CreatTestPoem_Tang() {
		var xmlhttp;

		if(window.XMLHttpRequest) {
			// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
			xmlhttp = new XMLHttpRequest();
		} else {
			// IE6, IE5 浏览器执行代码
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {

			if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {

				var jsonObj = JSON.parse(xmlhttp.responseText)
				console.log(jsonObj);
				document.getElementById("write_output").innerHTML = jsonObj.str;
			}
		}
//		xmlhttp.open("GET", "http://47.106.158.161:3500/CreatPoem_Tang_test");
		xmlhttp.open("GET", "http://localhost:3500/CreatPoem_Tang_test");
		xmlhttp.send();
	}
	//写藏头诗
	function CreatHeadPoem_Tang(str) {
		var xmlhttp;
		if(str == "") {
			document.getElementById("empty").innerHTML = "请输入搜索内容";
			return;
		}
		if(window.XMLHttpRequest) {
			// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
			xmlhttp = new XMLHttpRequest();

		} else {
			// IE6, IE5 浏览器执行代码
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {

			if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {

				var jsonObj = JSON.parse(xmlhttp.responseText)

				document.getElementById("write_output").innerHTML = jsonObj.str;

			}
		}
//		xmlhttp.open("GET", "http://47.106.158.161:3500/CreatPoem_Tang_head?head=" + str, true);
xmlhttp.open("GET", "http://localhost:3500/CreatPoem_Tang_head?head=" + str, true);
		xmlhttp.send();
	}
	//写宋词===========================================================================	
	//随机写诗
	function CreatTestPoem_Song() {
		var xmlhttp;

		if(window.XMLHttpRequest) {
			// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
			xmlhttp = new XMLHttpRequest();
		} else {
			// IE6, IE5 浏览器执行代码
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {

			if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {

				var jsonObj = JSON.parse(xmlhttp.responseText)
				console.log(jsonObj);
				document.getElementById("write_output").innerHTML = jsonObj.str;
			}
		}
//		xmlhttp.open("GET", "http://47.106.158.161:3500/CreatPoem_Song_test");
xmlhttp.open("GET", "http://localhost:3500/CreatPoem_Song_test");
		xmlhttp.send();
	}
	//写藏头诗
	function CreatHeadPoem_Song(str) {
		var xmlhttp;
		if(str == "") {
			document.getElementById("empty").innerHTML = "请输入搜索内容";
			return;
		}
		if(window.XMLHttpRequest) {
			// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
			xmlhttp = new XMLHttpRequest();

		} else {
			// IE6, IE5 浏览器执行代码
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {

			if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {

				var jsonObj = JSON.parse(xmlhttp.responseText)

				document.getElementById("write_output").innerHTML = jsonObj.str;

			}
		}
//		xmlhttp.open("GET", "http://47.106.158.161:3500/CreatPoem_Song_head?head=" + str, true);
xmlhttp.open("GET", "http://localhost:3500/CreatPoem_Song_head?head=" + str, true);
		xmlhttp.send();
	}

	//在线播放==========================================================================
	// 初始化变量
	var audio = null;
	var playBtn = null;

	// dom加载完毕回调后注册按钮对象
	ready(function() {
		playBtn = document.getElementById('playBtn');
	});

	// 合成按钮
	function tts() {
		let text = document.getElementById('write_output').innerHTML;
		// 调用语音合成接口
		// 参数含义请参考 https://ai.baidu.com/docs#/TTS-API/41ac79a6
		audio = btts({
			tex: text,
			tok: '25.9c5ce8215438262719fa19b375147bfa.315360000.1855578061.282335-11760682',
			spd: 2,
			pit: 5,
			vol: 15,
			per: 3
		}, {
			volume: 0.3,
			autoDestory: true,
			timeout: 10000,
			hidden: false,
			onInit: function(htmlAudioElement) {

			},
			onSuccess: function(htmlAudioElement) {
				audio = htmlAudioElement;

				audio.play();
			},
			onError: function(text) {
				alert(text)
			},
			onTimeout: function() {
				alert('timeout')
			}
		});

	}

	// dom加载完毕回调
	function ready(callback) {
		var doc = document;
		if(doc.addEventListener) {
			doc.addEventListener('DOMContentLoaded', function() {
				callback();
			}, false);
		} else if(doc.attachEvent) {
			doc.attachEvent('onreadystatechange', function() {
				if(doc.readyState === 'complete') {
					callback();
				}
			});
		}
	}

	function btts(param, options) {
		var url = 'http://tsn.baidu.com/text2audio';
		var opt = options || {};
		var p = param || {};

		// 如果浏览器支持，可以设置autoplay，但是不能兼容所有浏览器
		var audio = document.createElement('audio');
		if(opt.autoplay) {
			audio.setAttribute('autoplay', 'autoplay');
		}

		// 隐藏控制栏
		if(!opt.hidden) {
			audio.setAttribute('controls', 'controls');
		} else {
			audio.style.display = 'none';
		}

		// 设置音量
		if(typeof opt.volume !== 'undefined') {
			audio.volume = opt.volume;
		}

		// 调用onInit回调
		isFunction(opt.onInit) && opt.onInit(audio);

		// 默认超时时间60秒
		var DEFAULT_TIMEOUT = 60000;
		var timeout = opt.timeout || DEFAULT_TIMEOUT;

		// 创建XMLHttpRequest对象
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url);

		// 创建form参数
		var data = {};
		for(var p in param) {
			data[p] = param[p]
		}

		// 赋值预定义参数
		data.cuid = data.cuid || data.tok;
		data.ctp = 1;
		data.lan = data.lan || 'zh';

		// 序列化参数列表
		var fd = [];
		for(var k in data) {
			fd.push(k + '=' + encodeURIComponent(data[k]));
		}

		// 用来处理blob数据
		var frd = new FileReader();
		xhr.responseType = 'blob';
		xhr.send(fd.join('&'));

		// 用timeout可以更兼容的处理兼容超时
		var timer = setTimeout(function() {
			xhr.abort();
			isFunction(opt.onTimeout) && opt.onTimeout();
		}, timeout);

		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				clearTimeout(timer);
				if(xhr.status == 200) {
					if(xhr.response.type === 'audio/mp3') {

						// 在body元素下apppend音频控件
						//document.body.append(audio);

						audio.setAttribute('src', URL.createObjectURL(xhr.response));

						// autoDestory设置则播放完后移除audio的dom对象
						//                  if (opt.autoDestory) {
						//                      audio.onended = function() {
						//                          document.body.removeChild(audio);
						//                      }
						//                  }

						isFunction(opt.onSuccess) && opt.onSuccess(audio);
					}

					// 用来处理错误
					if(xhr.response.type === 'application/json') {
						frd.onload = function() {
							var text = frd.result;
							isFunction(opt.onError) && opt.onError(text);
						};
						frd.readAsText(xhr.response);
					}
				}
			}
		}

		// 判断是否是函数
		function isFunction(obj) {
			if(Object.prototype.toString.call(obj) === '[object Function]') {
				return true;
			}
			return false;
		}
	}

	//下载音频文件========================================================================
	function Download() {

		var aaa = document.getElementById("write_output").innerHTML;

		DownloadMusic(aaa);
	}

	function DownloadMusic(str) {
		var xmlhttp;
		if(str == "") {
			document.getElementById("empty").innerHTML = "请输入搜索内容";
			return;
		}
		if(window.XMLHttpRequest) {
			// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
			xmlhttp = new XMLHttpRequest();
		} else {
			// IE6, IE5 浏览器执行代码
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {

			if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				document.getElementById("write_output").innerHTML += "语音合成成功，文件保存到tts.mp3，打开听听吧";
			}
		}
//		xmlhttp.open("GET", "http://47.106.158.161:3500/SpeechSynthesis?text=" + str, true);
xmlhttp.open("GET", "http://localhost:3500/SpeechSynthesis?text=" + str, true);
		xmlhttp.send();
	}