import request from "@/lib/request.js";
//登录
function getloginByPwd(requestData)
{
	return request.get('/log/loginByPwd',requestData,{noAuth:false})
}
//首页
function getIndex(requestData)
{
	return request.get('/index',requestData,{noAuth:false})
}
//获取成员
function getUserTeamUserDatas(requestData)
{
	return request.get('/team/getUserTeamUserDatas',requestData,{noAuth:false})
}
//根据用户id修改用户状态
function changeUserStatusByID(requestData)
{
	return request.get('/team/changeUserStatusByID',requestData,{noAuth:false})
}
//添加团队用户
function addTeamUser(requestData)
{
	return request.post('/team/addTeamUser',requestData,{noAuth:false})
}
//根据用户ID查询用户产品
function getUserProduct(requestData)
{
	return request.get('/team/getUserProductDatasByUserID',requestData,{noAuth:false})
}
//根据ID修改用户产品状态
function changeUserProductDatas(requestData)
{
	return request.post('/team/changeUserProductDatas',requestData,{noAuth:false})
}
//修改成员密码
function changeTeamUserPass(requestData)
{
	return request.post('/team/changeTeamUserPass',requestData,{noAuth:false})
}
//我的
function getUserMsg(requestData)
{
	return request.get('/user/getUserMsg',requestData,{noAuth:false})
}
//修改密码
function changePwd(requestData)
{
	return request.post('/user/changePwd',requestData,{noAuth:false})
}
//获取用户产品折扣信息
function getUserProductMsg(requestData)
{
	return request.post('/user/getUserProductMsg',requestData,{noAuth:false})
}

function getUserProductDatas(requestData)
{
	return request.get('/team/getUserProductDatas',requestData,{noAuth:false})
}

/**获取用户积分订单页面,TAB数据*/
function getUserScoreTabDatas(requestData)
{
	return request.get('/user/getUserScoreTabDatas',requestData,{noAuth:false})
}

/**获取用户积分订单数据*/
function getUserOrderList(requestData)
{
	return request.get('/user/getUserOrderList',requestData,{noAuth:false})
}

/**获取用户积分订单数据*/
function updateUseMas(requestData)
{
	return request.post('/user/updateUseMas',requestData,{noAuth:false})
}

const api = {
	getloginByPwd:getloginByPwd,
	getIndex:getIndex,
	getUserTeamUserDatas:getUserTeamUserDatas,
	changeUserStatusByID:changeUserStatusByID,
	addTeamUser:addTeamUser,
	getUserProduct:getUserProduct,
	changeUserProductDatas:changeUserProductDatas,
	changeTeamUserPass:changeTeamUserPass,
	getUserMsg:getUserMsg,
	changePwd:changePwd,
	getUserProductMsg:getUserProductMsg,
	getUserProductDatas:getUserProductDatas,
	getUserScoreTabDatas:getUserScoreTabDatas,
	getUserOrderList:getUserOrderList,
	updateUseMas:updateUseMas,
}

module.exports = api