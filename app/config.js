let domain = 'http://127.0.0.1:8070'


//发版本
// let domain = ''
module.exports = {
	HTTP_REQUEST_URL: domain+"/api",
	HTTP_UPLOAD_URL: domain+"/upload/",//显示图片的地址
	HTTP_IMG_URL : domain+"/img/",
	HEADER:{
		//'Access-Control-Allow-Origin': '*', //跨域加上头
		'content-type': 'application/json',
	},
	HEADERPARAMS:{
		//'content-type': 'application/x-www-form-urlencoded'
	},
};