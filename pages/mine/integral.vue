<template>
	<view class="integral_view">
		<u-row customStyle="margin-bottom: 15px">
			<u-col span="3">
				<u--text @click="isShowCp = true" :text="cp_name" size="14" style="margin-right: 3px;" color="#000"
					suffixIcon="arrow-down-fill" iconStyle="font-size: 10px;color:#000;margin-left:4px"></u--text>
			</u-col>
			<u-col span="3">
				<u--text @click="isShowDd = true" :text="dd_name" size="14" align="center" style="margin-right: 3px;"
					color="#000" suffixIcon="arrow-down-fill" iconStyle="font-size: 10px;color:#000;margin-left:4px">
				</u--text>
			</u-col>
			<u-col span="3">
				<u--text @click="isShowZt = true" :text="zt_name" size="14" align="center" style="margin-right: 3px;"
					color="#000" suffixIcon="arrow-down-fill" iconStyle="font-size: 10px;color:#000;margin-left:4px">
				</u--text>
			</u-col>
			<u-col span="3">
				<u--text @click="isShowDl = true" :text="dl_name" size="14" align="right" style="margin-right: 3px;"
					color="#000" suffixIcon="arrow-down-fill" iconStyle="font-size: 10px;color:#000;margin-left:4px">
				</u--text>
			</u-col>
		</u-row>
		<u-row customStyle="margin-bottom: 15px">
			<u-col span="3">
				<u--text :text="md_name" size="14" style="margin-right: 3px;" color="#000" suffixIcon="arrow-down-fill"
					iconStyle="font-size: 10px;color:#000;margin-left:4px"></u--text>
			</u-col>
			<u-col span="9">
				<view class="integral_text" @click="isshowcalendar = true">{{time_name}}</view>
			</u-col>
		</u-row>
		<u-row customStyle="margin-bottom: 15px">
			<u-col span="2">
				<view class="integral_text1">手机号</view>
			</u-col>
			<u-col span="6">
				<u--input class="search_input" type="number" maxlength = "11" v-model="bm_name" fontSize="12">
				</u--input>
			</u-col>
			<u-col span="4">
				<view class="integral_button" @click="onButton">查询</view>
			</u-col>
		</u-row>
		<view class="flexl" style="margin-bottom: 10px;">
			<view class="integral_text1">合计：</view>
			<view class="integral_text1" style="margin-right: 8px;">数量：<text
					style="font-size: 12px;color: #FF0023;font-weight: 500;">{{orderSumData.total_num}}</text></view>
			<view class="integral_text1" style="margin-right: 8px;">面额：<text
					style="font-size: 12px;color: #FF0023;font-weight: 500;">{{orderSumData.total_money}}</text></view>
			<view class="integral_text1">积分：<text style="font-size: 12px;color: #FF0023;font-weight: 500;">{{orderSumData.total_socre}}</text>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{height:hwindowHeight+'px'}">
			<view class="integral_scr_view" v-for="(item,index) in integralList" :key="index">
				<view class="flexSb">
					<view class="scroll_text">订单编号：{{item.order_number}}</view>
					<view class="scroll_text1"
						:style="item.order_status <= 4 ? 'background-color:#11AA66':'background-color:#FA5B58'">
						{{item.order_status_text}}
					</view>
				</view>
				<view class="scroll_text" style="margin: 15px 0;">订单日期：{{item.create_time}}</view>
				<view class="scroll_text" style="margin: 15px 0;">上级账号：{{item.parent_name}}</view>
				<view class="scroll_text" style="margin: 15px 0;">核销账号：{{item.username}}</view>
				<view class="scroll_text" style="margin: 15px 0;">通道名称：{{item.channel}}</view>
				<view class="scroll_text" style="margin: 15px 0;">核销面额：{{item.money}}</view>
				<view class="scroll_text" style="margin: 15px 0;">手机号码：{{item.phonenum}}</view>
				<view class="scroll_text" style="margin: 15px 0;">核销数量：{{item.num}}</view>
				<view class="scroll_text" style="margin-top: 15px;">核销积分：{{item.score}}</view>
			</view>
			<u-gap height="20"></u-gap>
		</scroll-view>
		<!-- 全部产品 -->
		<u-picker :show="isShowCp" :columns="columnsCp" closeOnClickOverlay @close="isShowCp = false"
			@cancel="isShowCp = false" @confirm="onPickerCp"></u-picker>

		<!-- 全部订单 -->
		<u-picker :show="isShowDd" :columns="columnsDd" closeOnClickOverlay @close="isShowDd = false"
			@cancel="isShowDd = false" @confirm="onPickerDd"></u-picker>
		<!-- 全部状态 -->
		<u-picker :show="isShowZt" :columns="columnsZt" closeOnClickOverlay @close="isShowZt = false"
			@cancel="isShowZt = false" @confirm="onPickerZt"></u-picker>
		<!-- 全部代理 -->
		<u-picker :show="isShowDl" :columns="columnsDl" closeOnClickOverlay @close="isShowDl = false"
			@cancel="isShowDl = false" @confirm="onPickerDl" keyName="'label'"></u-picker>
		<!-- 日历 -->
		<u-calendar :show="isshowcalendar" startText="开始" endText="结束" :defaultDate="date" color="#f56c6c" mode="range"
			@confirm="onCalendar" @close="isshowcalendar = false" monthNum="10" :min-date="minDateStr"
			:max-date="maxDateStr" ref="calendar"></u-calendar>
	</view>
</template>

<script>
	import api from '@/lib/index.js';
	export default {
		data() {
			return {
				order_style:'0',
				order_status:'0',
				invitation_id:'',
				product_id:'',
				create_time:'',
				
				cp_name: '全部产品',
				dd_name: '全部订单',
				zt_name: '全部状态',
				dl_name: '全部代理',
				md_name: '全部门店',
				time_name: '',
				//手机号
				bm_name: '',
				orderSumData:'',
				hwindowHeight: 0,
				integralList:[],
				// integralList: [{
				// 	bh: '8366464552846554826',
				// 	isHxtype: 1,
				// 	time: '2023-04-29 17:23:56',
				// 	sjzh: '二狗子',
				// 	hxzh: '二狗子',
				// 	tdmc: '二狗子',
				// 	hxme: '34.78',
				// 	phone: '13888888888',
				// 	hxtime: '1',
				// 	hxjf: '34556',
				// }, {
				// 	bh: '8366464552846554826',
				// 	isHxtype: 0,
				// 	time: '2023-04-29 17:23:56',
				// 	sjzh: '二狗子',
				// 	hxzh: '二狗子',
				// 	tdmc: '二狗子',
				// 	hxme: '34.78',
				// 	phone: '13888888888',
				// 	hxtime: '1',
				// 	hxjf: '34556',
				// }, {
				// 	bh: '8366464552846554826',
				// 	isHxtype: 1,
				// 	time: '2023-04-29 17:23:56',
				// 	sjzh: '二狗子',
				// 	hxzh: '二狗子',
				// 	tdmc: '二狗子',
				// 	hxme: '34.78',
				// 	phone: '13888888888',
				// 	hxtime: '1',
				// 	hxjf: '34556',
				// }, {
				// 	bh: '8366464552846554826',
				// 	isHxtype: 0,
				// 	time: '2023-04-29 17:23:56',
				// 	sjzh: '二狗子',
				// 	hxzh: '二狗子',
				// 	tdmc: '二狗子',
				// 	hxme: '34.78',
				// 	phone: '13888888888',
				// 	hxtime: '1',
				// 	hxjf: '34556',
				// }, {
				// 	bh: '8366464552846554826',
				// 	isHxtype: 1,
				// 	time: '2023-04-29 17:23:56',
				// 	sjzh: '二狗子',
				// 	hxzh: '二狗子',
				// 	tdmc: '二狗子',
				// 	hxme: '34.78',
				// 	phone: '13888888888',
				// 	hxtime: '1',
				// 	hxjf: '34556',
				// }, {
				// 	bh: '8366464552846554826',
				// 	isHxtype: 0,
				// 	time: '2023-04-29 17:23:56',
				// 	sjzh: '二狗子',
				// 	hxzh: '二狗子',
				// 	tdmc: '二狗子',
				// 	hxme: '34.78',
				// 	phone: '13888888888',
				// 	hxtime: '1',
				// 	hxjf: '34556',
				// }],
				isShowCp: false,
				isShowDd: false,
				isShowZt: false,
				isShowDl: false,
				productDatas:[],
				invitationDatas:[],
				columnsCp: [
					//['全部产品', '天翼空间', '穿越火线', '畅游会审卡', '实物邮寄', '畅游实物']
				],
				columnsDd: [
					['全部订单', '我的订单', '下级订单']
				],
				columnsZt: [
					['全部状态', '订单创建', '已上报', '核销中', '核销实物', '核销失败', '订单关闭', '订单核销']
				],
				columnsDl: [
					//['全部代理', '江训玲', '田德海', '周浦华润', '松江万达永辉', '横沙河']
				],
				isshowcalendar: false,
				minDateStr: '',
				maxDateStr: '',
				date: '',
			}
		},
		onLoad() {
			this.minDateStr = new Date().setMonth(new Date().getMonth() - 4)
			this.maxDateStr = new Date().setMonth(new Date().getMonth())
			this.date = [new Date().setDate(new Date().getDate() - 1), new Date()]

			let date = new Date(); //Fri Oct 29 2021 16:37:56 GMT+0800 (CST)
			let y = date.getFullYear(); //获取完整的年份(4位)
			let m = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
			let d = date.getDate(); //获取当前日(1-31)
			let m_name = m > 10 ? m : '0' + m;
			let d_name = d > 10 ? d : '0' + d;
			let Time = this.GetTime();
			this.time_name = Time[6] + ' 至 ' + y + '-' + m_name + '-' + d_name;
			
			this.getTabDatas();
			this.getUserOrderList();
		},
		onShow() {
			let gain = 0;
			// 获取可使用窗口高度 
			gain = uni.getSystemInfoSync().windowHeight;
			this.hwindowHeight = gain - 145;
			
			
		},
		methods: {
			getTabDatas() {
				let _this = this;
				api.getUserScoreTabDatas({}).then(res => {
					_this.productDatas = res.userProducts;
					
					let pArr = ['全部产品'];
					for (var i = 0; i < _this.productDatas.length; i++) {
					    pArr.push(_this.productDatas[i].label)
					}
					_this.columnsCp.push(pArr);
					
					_this.invitationDatas = res.invitations;
					
					let inviArr = ['全部代理'];
					for (var i = 0; i < _this.invitationDatas.length; i++) {
					    inviArr.push(_this.invitationDatas[i].label)
					}
					_this.columnsDl.push(inviArr);
					this.$forceUpdate();
				})
			},
			
			getUserOrderList() {
				let _this = this;
				api.getUserOrderList({
					order_style:this.order_style,
					order_status:this.order_status,
					invitation_id:this.invitation_id,
					product_id:this.product_id,
					create_time:this.create_time,
					phone:this.bm_name,
				}).then(res => {
					_this.integralList = res.orderList;
					_this.orderSumData = res.orderSumData;
					this.$forceUpdate();
				})
			},

			/**搜索按钮*/
			onButton() {
				this.getUserOrderList();
			},
			/**产品选择*/
			onPickerCp(e) {
				this.cp_name = e.value[0];
				
				if(this.cp_name === '全部产品'){
					this.product_id = '';
				}else{
					for (var i = 0; i < this.productDatas.length; i++) {
					    if(this.cp_name == this.productDatas[i].label){
							this.product_id = this.productDatas[i].id;
						}
					}
				}
				
				this.isShowCp = false;
				this.getUserOrderList();
			},
			/**订单类型选择*/
			onPickerDd(e) {
				this.dd_name = e.value[0];

				if(this.dd_name === '全部订单'){
					this.order_style = 0;
				}else if(this.dd_name === '我的订单'){
					this.order_style = 1;
				}else if(this.dd_name === '下级订单'){
					this.order_style = 2;
				}
				
				this.isShowDd = false;
				this.getUserOrderList();
			},
			/**订单状态*/
			onPickerZt(e) {
				this.zt_name = e.value[0];
				
				if(this.zt_name === '全部状态'){
					this.order_status = 0
				}else if(this.zt_name === '订单创建'){
					this.order_status = 1
				}else if(this.zt_name === '已上报'){
					this.order_status = 2
				}else if(this.zt_name === '核销中'){
					this.order_status = 3
				}else if(this.zt_name === '核销实物'){
					this.order_status = 4
				}else if(this.zt_name === '核销失败'){
					this.order_status = 5
				}else if(this.zt_name === '订单关闭'){
					this.order_status = 6
				}else if(this.zt_name === '订单核销'){
					this.order_status = 7
				}
				
				this.isShowZt = false;
				this.getUserOrderList();
			},
			/**代理选择*/
			onPickerDl(e) {
				this.dl_name = e.value[0];
				
				if(this.dl_name === '全部代理'){
					this.invitation_id = '';
				}else{
					for (var i = 0; i < this.invitationDatas.length; i++) {
					    if(this.dl_name == this.invitationDatas[i].label){
							this.invitation_id = this.invitationDatas[i].id;
						}
					}
				}
				this.isShowDl = false;
				this.getUserOrderList();
			},
			onCalendar(e) {
				let date_s = e[0]
				let date_e = e[e.length - 1]
				this.time_name = date_s + ' 至 ' + date_e
				this.create_time = date_s + '/' + date_e;
				this.isshowcalendar = false
				
				this.getUserOrderList();
			},
			GetTime() {
				var date = new Date();
				var base = Date.parse(date);
				//获取当前日
				var oneDay = 24 * 3600 * 1000;
				// 今日时间赋值给变量
				var daytimeArr = []
				for (var i = 0; i < 7; i++) {
					//前七天的时间
					var now = new Date(base -= oneDay);
					var myear = now.getFullYear();
					var month = now.getMonth() + 1;
					var mday = now.getDate()
					daytimeArr.push([myear, month > 10 ? month : '0' + month, mday > 10 ? mday : '0' + mday].join('-'))
				}
				return daytimeArr
			}
		}
	}
</script>

<style lang="scss" scoped>
	.integral_view {
		width: 95%;
		margin: 0 auto;
		font-family: 'PingFang SC';
		font-style: normal;
	}

	.integral_text {
		font-size: 14px;
		color: #000;
		text-align: center;
	}

	.integral_text1 {
		font-size: 14px;
		color: #000;
	}

	.search_input {
		height: 25px;
		border: 1px solid #D9D9D9;
		margin-left: 10px;
	}

	.integral_button {
		width: 70px;
		height: 25px;
		background-color: #1baeae;
		border-radius: 5px;
		text-align: center;
		line-height: 25px;
		color: #fff;
		font-weight: 600;
		margin-left: 20px;
	}

	.integral_scr_view {
		width: 100%;
		background-color: #E7ECED;
		border-radius: 5px;
		padding: 15px 10px;
		margin-bottom: 15px;
	}

	.scroll_text {
		font-size: 14px;
		font-weight: 500;
		color: #000;
	}

	.scroll_text1 {
		width: 60px;
		height: 20px;
		border-radius: 3px;
		background-color: #11aa66;
		color: #fff;
		font-size: 12px;
		text-align: center;
		line-height: 20px;
	}
</style>
