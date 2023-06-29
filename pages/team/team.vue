<template>
	<view class="team_view">
		<view class="team_search_view flexSb">
			<u--input class="search_input" type="text" v-model="bm_name" placeholder="请输入手机号进行搜索" prefixIcon="search"
				fontSize="12" prefixIconStyle="font-size: 20px;color: #909399">
			</u--input>
			<view class="search_button" @click="getButton()">搜索</view>
		</view>
		<view class="team_money_view">
			<view class="team_date_view flexl">
				<view class="flexl" @click="isShowPicker = true">
					<view class="team_n_view">{{n_date}}年</view>
					<u-icon top="5" name="arrow-down" color="#fff" size="14"></u-icon>
				</view>
				<view class="team_y_view">{{y_date}}月</view>
			</view>
			<view class="team_money">
				<view class="flexSb">
					<view class="">
						<view class="money_view1">个人业绩（元）</view>
						<view class="money_view">{{person_money}}</view>
					</view>
					<view class="">
						<view class="money_view1">团队业绩（元）</view>
						<view class="money_view">{{group_money}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="flexSb" style="margin: 15px 0;">
			<view class="flexl">
				<view class="flexl">
					<view style="color: #666;font-size: 12px;margin-right: 5px;">类型</view>
					<view class="flexSb" style="width: 60px;height: 20px;border: 1px solid #e7eced;padding: 0 5px;"
						@click="isShowLx = true">
						<view style="font-size: 10px;">{{lx_name}}</view>
						<u-icon name="arrow-down-fill" color="#8A8A8A" size="10"></u-icon>
					</view>
				</view>
				<view class="flexl" style="margin-left: 30px;">
					<view style="color: #666;font-size: 12px;margin-right: 5px;">状态</view>
					<view class="flexSb" style="width: 60px;height: 20px;border: 1px solid #e7eced;padding: 0 5px;"
						@click="isShowZt = true">
						<view style="font-size: 10px;">{{zt_name}}</view>
						<u-icon name="arrow-down-fill" color="#8A8A8A" size="10"></u-icon>
					</view>
				</view>
			</view>

			<view class="team_tj_view" @click="onShowmember">添加</view>
		</view>
		<scroll-view class="scroll_view" scroll-y="true" :style="{height:hwindowHeight+'px'}">
			<view style="margin: 20px 0;" v-for="(item,index) in groupingList" :key="index">
				<view class="flexSb">
					<view class="flexl">
						<u-image width="20px" height="20px" src="/static/vector.png" mode="widthFix"></u-image>
						<view class="scroll_text" style="margin-left: 5px;">{{item.nickname}}</view>
					</view>
					<view class="flexl">
						<view class="scroll_text" style="font-weight: 400;">开启/禁用：</view>
						<u-switch v-model="item.status" activeColor="#11AA66" size="12" @input="onInput"
							@change="onSwitch(item)"></u-switch>
					</view>
				</view>
				<view class="flexSb" style="margin: 10px 0;">
					<view class="scroll_text" style="font-weight: 400;">账号：{{item.phone}}</view>
					<view class="scroll_text" style="font-weight: 400;">类型：{{item.user_type == 1 ? '代理商':'操作员'}}</view>
				</view>
				<view class="flexSb">
					<view class="scroll_text" style="font-weight: 400;">业绩：{{item.totalmoney}}元</view>
					<view class="scroll_text" style="font-weight: 400;">创建时间：{{item.create_time}}</view>
				</view>
				<view class="flexSb" style="margin-top: 10px;">
					<view></view>
					<view class="flexl">
						<view class="scroll_zt_view" style="margin: 0 30px;"
							@click="onSelect(0,item)">修改折扣</view>
						<view class="scroll_zt_view" @click="onSelect(1,item)">重置密码
						</view>
					</view>
				</view>
			</view>
			<u-gap height="20"></u-gap>
		</scroll-view>
		<!-- 时间选择器 -->
		<u-datetime-picker :show="isShowPicker" v-model="value1" mode="year-month" closeOnClickOverlay
			@cancel="isShowPicker = false" @close="isShowPicker = false" @confirm="onConfirm" :maxDate="value1"
			confirmColor="#F4455D"></u-datetime-picker>

		<!-- 修改密码弹出框 -->
		<u-popup :show="isShowamend" mode="center" closeOnClickOverlay @close="isShowamend = false"
			:customStyle="{width: '70%',height: '220px',borderRadius: '5px',}">

			<view style="width: 90%;margin: 0 auto;">
				<u-icon class="popup_icon" name="close" color="#8a8a8a" size="18" :bold="true"
					@click="isShowamend = false"></u-icon>
				<view class="popup_title">修改密码</view>
				<view style="margin-top: 10px;">
					<u--input class="popup_input" style="height: 30px;" :password="true" placeholder="请输入新密码"
						placeholderStyle="color:#666;" type="text" v-model="xg_password" fontSize="12"></u--input>
					<u--input class="popup_input" style="height: 30px;" :password="true" placeholder="请确认新密码"
						placeholderStyle="color:#666;" type="text" v-model="qrxg_password" fontSize="12"></u--input>
				</view>
				<view class="flexl" style="color: #aaa;font-size: 10px;">
					<view>修改用户账号：</view>
					<view>{{tck_phone}}</view>
					<view style="margin-left: 5px;">昵称：</view>
					<view>({{tck_nickname}})</view>
				</view>
				<view class="popup_button" @click="onShowamend">确认</view>
			</view>
		</u-popup>
		<!-- 类型 -->
		<u-picker :show="isShowLx" :columns="columnsLx" keyName="label" closeOnClickOverlay @close="isShowLx = false"
			@cancel="isShowLx = false" @confirm="onPickerLx"></u-picker>
		<!-- 状态 -->
		<u-picker :show="isShowZt" :columns="columnsZt" keyName="label" closeOnClickOverlay @close="isShowZt = false"
			@cancel="isShowZt = false" @confirm="onPickerZt"></u-picker>

		<u-toast ref="uToast"></u-toast>
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	import api from '@/lib/index.js';
	export default {
		data() {
			return {
				lx_name: '全部',
				zt_name: '全部',
				lx_id:2,
				zt_id:2,
				isShowLx: false,
				isShowZt: false,
				xg_password: '',
				qrxg_password: '',
				isShowamend: false,
				// 搜索框输入内容
				bm_name: '',
				// 年
				n_date: '',
				// 月
				y_data: '',
				chose_date:'',
				// 个人业绩金额
				person_money: '111111.00',
				// 团队业绩金额
				group_money: '222222.00',
				// 高度
				hwindowHeight: 0,
				// 时间选择器
				isShowPicker: false,
				// 时间戳
				value1: Number(new Date()),
				// 分组管理数组
				groupingList: [],
				radio_id: 0,
				columnsLx: [
					[{
						label: '全部',
						id: 2
					}, {
						label: '操作员',
						id: 0
					}, {
						label: '代理商',
						id: 1
					}]
				],
				columnsZt: [
					[{
						label: '全部',
						id: 2
					}, {
						label: '开启',
						id: 0
					}, {
						label: '禁用',
						id: 1
					}]
				],
				status:true,
				user_id:0,
				tck_nickname:'',
				tck_phone:'',
			}
		},
		onLoad() {
			this.getDate();
		},
		onShow() {
			let gain = 0;
			// 获取可使用窗口高度 
			gain = uni.getSystemInfoSync().windowHeight;
			this.hwindowHeight = gain - 231;
			
			getApp().globalData.reviseTabbarByUserType();
			
			this.getUserTeamUserDatas();
		},
		methods: {
			getUserTeamUserDatas() {
				api.getUserTeamUserDatas({
					user_type:this.lx_id,
					user_status:this.zt_id,
					phone:this.bm_name,
					create_time:this.chose_date,
				}).then(res => {
					this.groupingList = res.data;
					this.person_money = res.my_money;
					this.group_money = res.team_money;
				})
			},
			// 点击搜索按钮
			getButton() {
				this.getUserTeamUserDatas();
			},
			// 获取时间戳
			getDate() {
				let date = new Date(); //Fri Oct 29 2021 16:37:56 GMT+0800 (CST)
				let y = date.getFullYear(); //获取完整的年份(4位)
				let m = date.getMonth(); //获取当前月份(0-11,0代表1月)
				this.y_date = m + 1;
				this.n_date = y;
				
				if(m+1 < 10){
					this.chose_date = y + "-0" + (m+1);
				}else{
					this.chose_date = y + "-" + (m+1);
				}
			},
			// 选择器确定按钮
			onConfirm(e) {
				const timeFormat = uni.$u.timeFormat;
				// 截取十月份以下的,并去掉月份前面的0
				let y = timeFormat(e.value, 'mm').substring(0, 2);
				if (y[0] == '0') {
					y = y.slice(1);
				}
				this.n_date = timeFormat(e.value, 'yyyy');
				this.y_date = y;
				
				if(y < 10){
					this.chose_date = timeFormat(e.value, 'yyyy') + "-0" + y;
				}else{
					this.chose_date = timeFormat(e.value, 'yyyy') + "-" + y;
				}
				this.isShowPicker = false;
				
				this.getUserTeamUserDatas();
			},
			onSelect(type, item) {
				this.user_id = item.user_id;
				this.tck_nickname = item.nickname;
				this.tck_phone = item.phone;
				if (type == 0) {
					uni.navigateTo({
						url:'/pages/team/examine_member?id='+this.user_id,
					})
				} else {
					this.xg_password = '';
					this.qrxg_password = '';
					this.isShowamend = true;
				}
			},
			// 修改密码
			onShowamend() {
				if(this.xg_password == ''){
					this.$refs.uNotify.show({
						top: 1,
						type: 'error',
						color: '#fff',
						bgColor: '#F4455D',
						message: '请输入密码',
						duration: 1000 * 3,
						fontSize: 12,
						safeAreaInsetTop: true
					})
				}else if(this.qrxg_password == ''){
					this.$refs.uNotify.show({
						top: 1,
						type: 'error',
						color: '#fff',
						bgColor: '#F4455D',
						message: '请输入确认密码',
						duration: 1000 * 3,
						fontSize: 12,
						safeAreaInsetTop: true
					})
				}else{
					if(this.xg_password == this.qrxg_password){
						this.isShowamend = false;
						api.changeTeamUserPass({
							password:this.xg_password,
							user_id:this.user_id,
						}).then(res => {
							this.$refs.uToast.show({
								type: 'default',
								title: '默认主题',
								message: res.msg,
							})
							
						})
					}else{
						this.$refs.uNotify.show({
							top: 1,
							type: 'error',
							color: '#fff',
							bgColor: '#F4455D',
							message: '请确认输入的密码是否一样',
							duration: 1000 * 3,
							fontSize: 12,
							safeAreaInsetTop: true
						})
					}
				}
			},
			// 成员添加
			onShowmember() {
				uni.navigateTo({
					url:'/pages/team/addMember',
				})
			},
			onPickerLx(e) {
				this.lx_name = e.value[0].label;
				this.lx_id = e.value[0].id;
				this.isShowLx = false;
				this.getUserTeamUserDatas();
			},
			onPickerZt(e) {
				this.zt_name = e.value[0].label;
				this.zt_id = e.value[0].id;
				this.isShowZt = false;
				this.getUserTeamUserDatas();
			},
			// 开关选择器
			onSwitch(res) {
				let statusid = 0;
				if(this.status == false){
					statusid = 0
				}else{
					statusid = 1
				}
				api.changeUserStatusByID({
					user_id:res.user_id,
					status:statusid,
				}).then(res => {
					if(res.code == 0){
						this.$refs.uToast.show({
							type: 'default',
							title: '默认主题',
							message: res.msg,
						})
					}
					
				})
			},
			onInput(e) {
				this.status = e;
			}
		}

	}
</script>

<style lang="scss" scoped>
	.team_view {
		width: 95%;
		margin: 0 auto;
		font-family: 'PingFang SC';
		font-style: normal;
	}

	.search_input {
		height: 28px;
		border: 1px solid #D9D9D9;
		border-radius: 14px;
	}

	.search_button {
		width: 53px;
		height: 28px;
		background-color: #1baeae;
		color: #fff;
		text-align: center;
		line-height: 28px;
		font-size: 12px;
		font-weight: 500;
		border-radius: 5px;
		margin-left: 10px;
	}

	.team_money_view {
		width: 100%;
		height: 128px;
		background: linear-gradient(90deg,#1baeae,#51c7c7);
		margin-top: 20px;
		border-radius: 5px;
	}

	.team_date_view {
		margin-left: 15px;
		padding-top: 10px;
	}

	.team_y_view {
		color: #fff;
		font-size: 20px;
		font-weight: 600;
		margin-top: 10px;
	}

	.team_n_view {
		color: #fff;
		font-size: 12px;
		font-weight: 600;
		margin-top: 15px;
		margin-left: 5px;
		margin-right: 5px;
	}

	.team_money {
		width: 85%;
		margin: 0 auto;
		margin-top: 20px;
	}

	.money_view {
		font-size: 16px;
		color: #fff;
		text-align: center;
	}

	.money_view1 {
		font-size: 16px;
		color: #fff;
		text-align: center;
		margin-top: 5px;
	}
	.scroll_view {
		width: 95%;
		margin: 0 auto;
	}

	.scroll_text {
		font-weight: 500;
		font-size: 12px;
	}

	.scroll_zt_view {
		width: 60px;
		height: 20px;
		border-radius: 3px;
		font-size: 12px;
		background-color: #0065e0;
		color: #fff;
		font-weight: 500;
		text-align: center;
		line-height: 20px;
	}

	.popup_icon {
		position: absolute;
		right: 5px;
		top: 5px;
		padding: 5px;
	}

	.popup_title {
		text-align: center;
		font-size: 14px;
		font-weight: 500;
		margin-top: 25px;
	}

	.popup_input {
		height: 20px;
		margin: 20px 0 10px 0;
		border-bottom: 1px solid #E7ECED;
	}

	.popup_button {
		width: 130px;
		height: 24px;
		margin: 15px auto;
		background-color: #f4455d;
		border-radius: 5px;
		font-size: 12px;
		line-height: 24px;
		text-align: center;
		color: #fff;
	}

	.team_tj_view {
		width: 50px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		color: #fff;
		font-weight: 500;
		border-radius: 2px;
		background-color: #1baeae;
		font-size: 12px;
	}
</style>