import {
	HTTP_REQUEST_URL,
	HEADER,
	HEADERPARAMS
} from '@/app/config';

import {
	toLogin,
	checkLogin
} from '@/lib/login';
/**
 * 发送请求
 */
function baseRequest(url, method, data, {
	noAuth = false,
	noVerify = false
}, params) {
	let Url = HTTP_REQUEST_URL,
		header = HEADER
	if (!noAuth) {
		//登录过期自动登录
		checkLogin()
	}
	let key = uni.getStorageSync("key_")
	if (key) header['key'] = key;
	return new Promise((reslove, reject) => {
		uni.request({
			url: Url + url,
			method: method || 'GET',
			header: header,
			data: data || {},
			success: (res) => {
				uni.hideLoading()
				if (noVerify) //没有状态的
					reslove(res.data.data, res);
				else if (res.data.status == 200)
					reslove(res.data.data, res);
				else if (res.data.msg.indexOf("404") !== -1 || res.data.msg.indexOf("403") !== -1) {
					if (checkLogin()) {
						uni.showModal({
							title: '提示',
							content: "您没有权限访问该功能，请联系管理员进行授权，谢谢",
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.redirectTo({
										url: '/pages/log/log'
									})
								}
							},
						});
					}
				} else
					uni.showModal({
						title: '提示',
						content: res.data.msg || "系统错误",
						showCancel: false
					});
			},
			fail: (msg) => {
				uni.hideLoading()
				uni.showModal({
					title: '提示',
					content: "请求错误",
					showCancel: false
				});
			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt, params) => baseRequest(api, method, data, opt || {}, params)
});



export default request;