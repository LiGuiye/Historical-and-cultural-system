let AipSpeech = require("baidu-aip-sdk").speech;
let fs = require('fs');

// 务必替换百度云控制台中新建百度语音应用的 Api Key 和 Secret Key
let client = new AipSpeech(0, 'urU0qiz4c7GO6oDygH8v4btf', '4PHlezxALg5bhZU2NgWD16ld3oUn0ok1');

function yuyinhecheng(text, req, res) {
	// 语音合成，保存到本地文件
	client.text2audio(text, {
		spd: 2,
					pit: 5,
					vol: 15,
					per: 3
	}).then(function(result) {
		if(result.data) {
			console.log('语音合成成功，文件保存到tts.mp3，打开听听吧');
			fs.writeFileSync('tts.mp3', result.data);
		} else {
			// 合成服务发生错误
			console.log('语音合成失败: ' + JSON.stringify(result));
		}
	}, function(err) {
		console.log(err);
	});
}
module.exports = {
	yuyinhecheng: yuyinhecheng
};