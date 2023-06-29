<template>
	<view class="member_view">
		<view style="margin-top: 20px;border-bottom: 1px solid #6C797A;">
			<view class="flexSb" >
				<view class="flexl">
					<view class="">账号：</view>
					<view class="">{{phone}}</view>
				</view>
				<view class="flexl">
					<view >类型：</view>
					<view >{{type == 0 ? '操作员':'代理商'}}</view>
				</view>
			</view>
			<view class="flexl" style="margin-top: 10px;margin-bottom: 10px;">
				<view class="">昵称：</view>
				<view class="">{{name}}</view>
			</view>
		</view>
		<view class="flexSb"
			style="font-size: 12px;border-bottom: 1px solid #e3e3e3;padding: 10px 0;">
			<view class="">渠道</view>
			<view class="">代理折扣</view>
			<view class="">状态</view>
			<view class="">我的折扣</view>
		</view>
		<scroll-view scroll-y="true" :style="{height:hwindowHeight+'px'}">
			<view class="flexl scroll_view" v-for="(item,index) in discountList" :key="index">
				<view style="width: 70px;">{{item.product_name}}</view>
				<view class="flexSb" style="width: 60px;margin-left: 17px;">
					<u--input class="popup_input" inputAlign="center" color="#000" type="number" v-model="item.discount" fontSize="12"></u--input>
						<view>%</view>
				</view>
				<view style="margin-left: 50px">
					<u-switch v-model="item.product_status" activeColor="#F4455D" size="12"></u-switch>
				</view>
				<view class="flexSb">
					<view class="zk_text">{{item.my_discount}}</view>
					<view >%</view>
				</view>
			</view>
		</scroll-view>
		<view class="zk_button" @click="onbutton">保存</view>
	</view>
</template>

<script>
	import api from '@/lib/index.js';
	export default {
		data() {
			return {
				id: '',
				hwindowHeight: 0,
				name: '',
				phone: '',
				type:'',
				discountList:[],
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getUserProduct();
		},
		onShow() {
			let gain = 0;
			// 获取可使用窗口高度 
			gain = uni.getSystemInfoSync().windowHeight;
			this.hwindowHeight = gain - 173;
		},
		methods: {
			getUserProduct() {
				api.getUserProduct({
					user_id: this.id,
				}).then(res => {
					this.name = res.userData.nickname;
					this.phone = res.userData.phone;
					this.type = res.userData.user_type;
					this.discountList = res.dataList;

				})
			},
			onSwitch(e) {
				// console.log(e);
			},
			onChange(e){
				// console.log(e);
			},
			onbutton(){
				let _this = this;
				let json = JSON.stringify(this.discountList);
				api.changeUserProductDatas({
					jsondatas: json,
				}).then(res => {
					this.$refs.uToast.show({
						type: 'default',
						title: '默认主题',
						message: res.msg,
						complete(){
							_this.getUserProduct();
						}
					})
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.member_view {
		width: 90%;
		margin: 0 auto;
		font-family: 'PingFang SC';
		font-style: normal;
		font-size: 12px;
	}

	.scroll_view {
		font-size: 12px;
		border-bottom: 1px solid #e3e3e3;
		padding: 15px 0 15px 0;
	}

	.popup_input {
		width: 60px;
		height: 25px;
		background-color: #fff;
		margin-right: 5px;
	}
	
	.zk_text {
		width: 50px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		color: #000;
		border-radius: 5px;
		border: 1px solid #E7ECED;
		margin-left: 45px;
		font-size: 12px;
		margin-right: 5px;
	}
	.zk_button{
		width: 70%;
		height: 40px;
		border-radius: 40px;
		background-color: #fe6f5f;
		font-size: 16px;
		color: #fff;
		line-height: 40px;
		text-align: center;
		margin: 10px auto;
	}
</style>