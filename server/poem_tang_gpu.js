/*
child.stdout 获取标准输出
child.stderr 获取标准错误输出
*/

var exec = require('child_process').exec;
var iconv = require('iconv-lite');
//随机写诗
function aaa(req, res) {
	exec('python ./public/poem_tang_gpu/main.py --m test', {
		encoding: 'binary',
		timeout: 100000,
		maxBuffer: 200 * 1024,
		killSignal: 'SIGTERM',
		cwd: null,
		env: null
	}, function(error, stdout, stderr) {
		var str = iconv.decode(stdout, 'GBK');
		if(str.length > 1) {
			res.status(200)
				.json({
					str: str,
				});
			console.log(str);
		} else {
			console.log('you don\'t offer args');
		}
		if(error) {
			console.info('stderr : ' + stderr);
		}
	});
}
//藏头诗
function bbb(texthead,req, res) {
	exec('python ./public/poem_tang_gpu/main.py --mode head --m '+ texthead, {
		encoding: 'binary',
		timeout: 100000,
		maxBuffer: 200 * 1024,
		killSignal: 'SIGTERM',
		cwd: null,
		env: null
	}, function(error, stdout, stderr) {
		var str = iconv.decode(stdout, 'GBK');
		if(str.length > 1) {
			res.status(200)
				.json({
					str: str,
				});
			console.log(str);
		} else {
			console.log('you don\'t offer args');
		}
		if(error) {
			console.info('stderr : ' + stderr);
		}

	});

}

module.exports = {
	aaa: aaa,
	bbb: bbb
};