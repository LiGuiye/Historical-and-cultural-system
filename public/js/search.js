function search() {
	//	alert(document.getElementById("txtSearch").value);

	var aaa = document.getElementById("txtSearch").value;
	showPopup();
	console.log("hahahah" + checkvalue);
	if(checkvalue == "诗人") {

		selectpoet(aaa);

	} else {
		selectpoem(aaa);
	}

}
//数据库中搜索诗人========================================================================================
function selectpoet(str) {
	var xmlhttp;
	if(str == "") {
		document.getElementById("popForm").innerHTML = "让我搜空气？";
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

			if(jsonObj.data.length == 0) {
				document.getElementById("empty").innerHTML = "不好意思我们暂未收录相关数据，请联系1171116470@qq.com进行反馈";
			} else if(jsonObj.data.length > 0) {

				var d = document.getElementById("Poem_Picture");
				d.style.backgroundImage = null;
				document.getElementById("empty").innerHTML = "";
				document.getElementById("Poem_show").innerHTML = "【诗人姓名】" + '<br/>' + '&emsp;&emsp;' + jsonObj.data[0].poetname;
				document.getElementById("poemtranslate").innerHTML = "【朝代】" + '<br/>' + '&emsp;&emsp;' + jsonObj.data[0].dynasty;
				document.getElementById("poemappreciation").innerHTML = "【诗人简介】" + '<br/>' + '&emsp;&emsp;' + jsonObj.data[0].intro;
				document.getElementById("poemhistory").innerHTML = "【作品数量】" + '<br/>' + '&emsp;&emsp;' + jsonObj.data[0].number;
			}

		}
	}
	xmlhttp.open("GET", "http://127.0.0.1:3500/selectpoet?name=" + str, true);
	xmlhttp.send();
}

//数据库中搜索诗歌========================================================================================
function selectpoem(str) {
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

			if(jsonObj == null) {
				document.getElementById("Poem_name").innerHTML = "没东西";
			} else {

				if(jsonObj.data.length == 0) {
					document.getElementById("empty").innerHTML = "不好意思我们暂未收录相关数据，请联系1171116470@qq.com进行反馈";
				} else if(jsonObj.data.length > 0) {

					document.getElementById("empty").innerHTML = "";
					document.getElementById("Poem_name").innerHTML = jsonObj.data[0].poemname;
					document.getElementById("Poet").innerHTML = "【诗人】" + jsonObj.data[0].poet;
					document.getElementById("dynasty").innerHTML = "【朝代】" + jsonObj.data[0].dynasty;
					document.getElementById("Poem_content").innerHTML = '&emsp;&emsp;' + jsonObj.data[0].content;

					if(jsonObj.data[0].photos == null) {

						var d = document.getElementById("Poem_Picture");
						d.style.backgroundImage = null;
					} else {
						var ss = "url(../img/" + jsonObj.data[0].photos + ".jpg)";
						var d = document.getElementById("Poem_Picture");
						d.style.backgroundImage = ss;
					}

					if(jsonObj.data[0].translation == null) {
						document.getElementById("poemtranslate").innerHTML = "";
					} else {
						document.getElementById("poemtranslate").innerHTML = "【翻译】" + '<br/>' + '&emsp;&emsp;' + jsonObj.data[0].translation;
					}
					if(jsonObj.data[0].appreciation == null) {
						document.getElementById("poemappreciation").innerHTML = "";
					} else {
						document.getElementById("poemappreciation").innerHTML = "【赏析】" + '<br/>' + '&emsp;&emsp;' + jsonObj.data[0].appreciation;
					}
					if(jsonObj.data[0].history == null) {
						document.getElementById("poemhistory").innerHTML = "";
					} else {
						document.getElementById("poemhistory").innerHTML = "【历史传说】" + '<br/>' + '&emsp;&emsp;' + jsonObj.data[0].history;
					}

				}

			}
		}
	}
	xmlhttp.open("GET", "http://127.0.0.1:3500/selectpoem?name=" + str, true);
	xmlhttp.send();
}
//查询有位置点对应的诗歌===================================================================================
function showpoem(str) {
	var xmlhttp;
	if(str == "") {
		document.getElementById("popForm").innerHTML = "";
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
			var neirong = "";
			var jsonObj = JSON.parse(xmlhttp.responseText)
			document.getElementById("Poem_name").innerHTML = jsonObj.data[0].poemname;
			document.getElementById("Poet").innerHTML = "【诗人】" + jsonObj.data[0].poet;
			document.getElementById("dynasty").innerHTML = "【朝代】" + jsonObj.data[0].dynasty;
			document.getElementById("Poem_content").innerHTML = '&emsp;&emsp;' + jsonObj.data[0].content;

			if(jsonObj.data[0].photos == null) {

				var d = document.getElementById("Poem_Picture");
				d.style.backgroundImage = null;
			} else {
				var ss = "url(../img/" + jsonObj.data[0].photos + ".jpg)";
				var d = document.getElementById("Poem_Picture");
				d.style.backgroundImage = ss;
			}

			if(jsonObj.data[0].translation == null) {
				document.getElementById("poemtranslate").innerHTML = "";
			} else {
				document.getElementById("poemtranslate").innerHTML = "【翻译】" + '<br/>' + '&emsp;&emsp;' + jsonObj.data[0].translation;
			}
			if(jsonObj.data[0].appreciation == null) {
				document.getElementById("poemappreciation").innerHTML = "";
			} else {
				document.getElementById("poemappreciation").innerHTML = "【赏析】" + '<br/>' + '&emsp;&emsp;' + jsonObj.data[0].appreciation;
			}
			if(jsonObj.data[0].history == null) {
				document.getElementById("poemhistory").innerHTML = "";
			} else {
				document.getElementById("poemhistory").innerHTML = "【历史传说】" + '<br/>' + '&emsp;&emsp;' + jsonObj.data[0].history;
			}
		}
	}
	xmlhttp.open("GET", "http://127.0.0.1:3500/selectpoem?name=" + str, true);
	xmlhttp.send();
}
//搜索数据库中十大景点的内容==================================================================
function showshidajingdian(str) {
	var xmlhttp;
	if(str == "") {
		document.getElementById("popForm").innerHTML = "";
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
			var ss = "url(../img/" + jsonObj.name + ".jpg)";
			var d = document.getElementById("Poem_Picture");
			d.style.backgroundImage = ss;

			document.getElementById("Poem_show").innerHTML = "【景点名称】" + '<br/>' + '&emsp;&emsp;' + jsonObj.name;
			document.getElementById("poemtranslate").innerHTML = "【景点介绍】" + '<br/>' + '&emsp;&emsp;' + jsonObj.introduction;
			document.getElementById("poemappreciation").innerHTML = "【历史传说】" + '<br/>' + '&emsp;&emsp;' + jsonObj.historicallegend;

		}
	}
	xmlhttp.open("GET", "http://127.0.0.1:3500/chaxun?id=" + str, true);
	xmlhttp.send();
}

var checkvalue = "诗名";

$(function() {
	$(".select_box").click(function(event) {
		event.stopPropagation();
		$(this).find(".option").toggle();
		$(this).parent().siblings().find(".option").hide();
	});
	$(document).click(function(event) {
		var eo = $(event.target);
		if($(".select_box").is(":visible") && eo.attr("class") != "option" && !eo.parent(".option").length)
			$('.option').hide();
	});
	$(".option li").click(function() {
		var check_value = $(this).text();
		checkvalue = check_value;
		console.log("check_value:" + checkvalue);
		//诗人
		var zlValue = $('.option li:eq(1)').html();
		//诗名
		var bqValue = $('.option li:eq(2)').html();
		$(this).parent().siblings(".select_txt").text(check_value);
		$("#txtSearch").val('请输入' + check_value + '名称');

	});
})