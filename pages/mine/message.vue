<template>
	<view class="message_view">
		<view class="flexl" style="margin: 15px 0;">
			<view class="message_text">昵称：</view>
			<view class="message_text">{{lc}}</view>
		</view>
		<view class="flexl"  style="margin: 15px 0;">
			<view class="message_text">账号：</view>
			<view class="message_text">{{zh}}</view>
		</view>
		<view class="flexl"  style="margin: 15px 0;">
			<view class="message_text">真实姓名：</view>
			<view class="message_text">{{name}}</view>
		</view>
		<view class="flexl"  style="margin: 15px 0;">
			<view class="message_text">支付宝账户：</view>
			<view class="message_text">{{zfb}}</view>
		</view>
		<view class="flexl"  style="margin: 15px 0;">
			<view class="message_text">银行卡号：</view>
			<view class="message_text">{{yhk}}</view>
		</view>
		<view class="flexl"  style="margin: 15px 0;">
			<view class="message_text">支付信息：</view>
			<view class="message_text">{{yhkzd}}</view>
		</view>
		
		<view class="message_button" @click="isShowpopup = true">修改密码</view>
		
		<u-popup :show="isShowpopup" mode="center" closeOnClickOverlay @close="isShowpopup = false"
			:customStyle="{width: '70%',height: '200px',borderRadius: '5px',}">
		
			<view style="width: 90%;margin: 0 auto;">
				<u-icon class="popup_icon" name="close" color="#8a8a8a" size="18" :bold="true"
					@click="isShowpopup = false"></u-icon>
				<view class="popup_title">新增分组</view>
				<view class="flexl" style="margin-top: 20px;">
					<view style="font-size: 12px;">原始密码</view>
					<u--input class="popup_input" :password="true" type="text" v-model="ys_password" fontSize="12"></u--input>
				</view>
				<view class="flexl" style="margin-top: 10px;">
					<view style="font-size: 12px;">新密码</view>
					<u--input style="margin-left: 22px;" :password="true" class="popup_input" type="text" v-model="x_password" fontSize="12"></u--input>
				</view>
				<view class="flexl" style="margin-top: 10px;">
					<view style="font-size: 12px;">确认密码</view>
					<u--input class="popup_input" type="text" :password="true" v-model="qr_password" fontSize="12"></u--input>
				</view>
				<view class="popup_button" @click="onButton">保存</view>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	import api from '@/lib/index.js';
	export default{
		data(){
			return{
				lc:'',
				zh:'',
				name:'',
				zfb:'',
				yhk:'',
				yhkzd:'',
				isShowpopup:false,
				ys_password:'',
				x_password:'',
				qr_password:'',
			}
		},
		onLoad() {
			api.getUserMsg({
			}).then(res => {
				this.lc = res.nickname;
				this.zh = res.phone;
				this.name = res.realname;
				this.zfb = res.zfbaccount;
				this.yhk = res.bankaccount;
				this.yhkzd = res.bankinfo;
			})
		},
		onShow() {
			
		},
		methods:{
			onButton(){
				if(this.ys_password == ''){
					this.$refs.uNotify.show({
						top: 1,
						type: 'error',
						color: '#fff',
						bgColor: '#F4455D',
						message: '请输入原始密码',
						duration: 1000 * 3,
						fontSize: 12,
						safeAreaInsetTop: true
					})
				}else if(this.x_password == ''){
					this.$refs.uNotify.show({
						top: 1,
						type: 'error',
						color: '#fff',
						bgColor: '#F4455D',
						message: '请输入新密码',
						duration: 1000 * 3,
						fontSize: 12,
						safeAreaInsetTop: true
					})
				}else if(this.qr_password == ''){
					this.$refs.uNotify.show({
						top: 1,
						type: 'error',
						color: '#fff',
						bgColor: '#F4455D',
						message: '请输入确认新密码',
						duration: 1000 * 3,
						fontSize: 12,
						safeAreaInsetTop: true
					})
				}else{
					if(this.qr_password == this.x_password){
						this.isShowpopup = false;
						api.changePwd({
							password:this.x_password,
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
							message: '请确认输入的新密码是否一样',
							duration: 1000 * 3,
							fontSize: 12,
							safeAreaInsetTop: true
						})
					}
				}
				
			}
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
		font-size: 16px;
		color: #000;
	}
	.message_button{
		width: 100px;
		height: 40px;
		margin: 50px auto;
		font-size: 16px;
		background-color: #1baeae;
		border-radius: 5px;
		color: #fff;
		line-height: 40px;
		text-align: center;
		
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
		border: 1px solid #E7ECED;
		margin: 0 10px;
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
</style>