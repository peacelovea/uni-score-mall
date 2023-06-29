import {
	HTTP_REQUEST_URL,
	HEADER,
	HEADERPARAMS
} from '@/app/config';
function prePage(){
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 1];
	return prePage.route;
}
//跳转登录页
export function _toLogin(push, pathLogin) {
	
	let path = prePage();
	//判断登录地址是否为空
	if(!pathLogin){
		pathLogin = '/pages/log/log'
		uni.setStorageSync('login_back_url',path);//登录回调地址
		uni.$u.route({url: pathLogin,params: {}})
	}
	
}

//检查登录
export function checkLogin()
{
	let key = uni.getStorageSync("key_")
	if(!key){
		_toLogin()
	}
	else{
		return true
	}
}

