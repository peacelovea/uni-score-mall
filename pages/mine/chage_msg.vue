<template>
	<view class="message_view">
		<view class="flexl" style="margin: 15px 0;">
			<view class="message_text">账号：</view>
			<u--input class="msg_input"  type="text" v-model="userData.username" fontSize="12"></u--input>
		</view>
		<view class="flexl" style="margin: 15px 0;">
			<view class="message_text">昵称：</view>
			<u--input class="msg_input"  type="text" v-model="userData.nickname" fontSize="12"></u--input>
		</view>
		<view class="flexl"  style="margin: 15px 0;">
			<view class="message_text">手机：</view>
			<u--input class="msg_input"  type="phone" maxlength = "11"  v-model="userData.phone" fontSize="12"></u--input>
		</view>
		
		<view class="flexl"  style="margin: 15px 0;">
			<view class="message_text">真实姓名：</view>
			<!-- <view class="message_text">{{name}}</view> -->
			<u--input class="msg_input"  type="text" v-model="userData.realname" fontSize="12"></u--input>
		</view>
		<view class="flexl"  style="margin: 15px 0;">
			<view class="message_text">支付宝账户：</view>
			<!-- <view class="message_text">{{zfb}}</view> -->
			<u--input class="msg_input"  type="text" v-model="userData.zfbaccount" fontSize="12"></u--input>
		</view>
		<view class="flexl"  style="margin: 15px 0;">
			<view class="message_text">银行卡号：</view>
			<!-- <view class="message_text">{{yhk}}</view> -->
			<u--input class="msg_input"  type="text" v-model="userData.bankaccount" fontSize="12"></u--input>
		</view>
		<view class="flexl"  style="margin: 15px 0;">
			<view class="message_text">支行信息：</view>
			<!-- <view class="message_text">{{yhkzd}}</view> -->
			<u--input class="msg_input"  type="text" v-model="userData.bankinfo" fontSize="12"></u--input>
		</view>
		
		<view class="mine_button" @click="commitM">确定修改</view>
		
		
		<u-toast ref="uToast"></u-toast>
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	import api from '@/lib/index.js';
	export default{
		data(){
			return{
				userData:{
					username:'',
					nickname:'',
					phone:'',
					realname:'',
					zfbaccount:'',
					bankaccount:'',
					bankinfo:'',
				}
			}
		},
		onLoad() {
			api.getUserMsg({
			}).then(res => {
				
				this.userData = res
			})
		},
		onShow() {
			
		},
		methods:{
			
			commitM(){
				
				if(this.userData.username == null || this.userData.username == ''){
					this.$refs.uNotify.show({
						top: 1,
						type: 'error',
						color: '#fff',
						bgColor: '#F4455D',
						message: '请输入账号名称',
						duration: 1000 * 3,
						fontSize: 12,
						safeAreaInsetTop: true
					})
				}else if(this.userData.username == null || this.userData.username == ''){
					this.$refs.uNotify.show({
						top: 1,
						type: 'error',
						color: '#fff',
						bgColor: '#F4455D',
						message: '请输入昵称',
						duration: 1000 * 3,
						fontSize: 12,
						safeAreaInsetTop: true
					})
				}else if(this.userData.username == null || this.userData.username == ''){
					this.$refs.uNotify.show({
						top: 1,
						type: 'error',
						color: '#fff',
						bgColor: '#F4455D',
						message: '请输入手机号',
						duration: 1000 * 3,
						fontSize: 12,
						safeAreaInsetTop: true
					})
				}else{
					api.updateUseMas(this.userData).then(res => {
						if(res.code == 0){
							this.$refs.uToast.show({
								type: 'default',
								title: '默认主题',
								message: res.msg,
								complete(){
									uni.navigateBack({
										delta: 1
									});
								}
							})
						}else{
							this.$refs.uToast.show({
								type: 'default',
								title: '默认主题',
								message: res.msg,
								
							})
						}
					})
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.message_view{
		width: 90%;
		margin: 0 auto;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
	}
	.message_text{
		width: 100px;
		font-size: 16px;
		text-align: left;
		color: #000;
	}
	.msg_input {
		height: 36px;
		border: 1px solid #E7ECED;
		margin: 0 10px;
	}
	
	.mine_button{
		width: 70%;
		height: 40px;
		background-color: #1baeae;
		border-radius: 5px;
		color: #fff;
		font-size: 12px;
		line-height: 40px;
		text-align: center;
		margin: 0 auto;
		margin-top: 50px;
	}
</style>