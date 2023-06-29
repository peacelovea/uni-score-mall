<template>
	<view class="log_view">
		<u-image style="align-items: center;" width="200px" height="200px" src="/static/logo.png"
			mode="widthFix"></u-image>
		<view style="margin-top: 20px;">
			<u--input class="search_input" border="bottom" type="number" maxlength="11" v-model="phone_name" placeholder="请输入您的账号"
				placeholderStyle="color:#666;" fontSize="14" prefixIcon="phone"
				prefixIconStyle="font-size: 20px;color: #9bcffc;margin-right: 20px;">
			</u--input>
			<u--input class="search_input" border="bottom" type="text" v-model="open_name" :password='true' placeholder="请输入您的密码"
				placeholderStyle="color:#666;" fontSize="14" prefixIcon="lock-open"
				prefixIconStyle="font-size: 20px;color: #9bcffc;margin-right: 20px;">
			</u--input>
		</view>
		<view class="flexSb" style="margin-top: 10px;">
			<view class="flexl">
				<u-checkbox-group @change="handerChange">
					<u-checkbox class="check_box" v-model="readChecked" activeColor="#5FB878"></u-checkbox>
				</u-checkbox-group>
				<view >同意协议</view>
			</view>
			<view style="color: #1989fa;" @click="onAgreement">平台使用协议</view>
		</view>
		<view class="log_button" @click="onButton">登录</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import api from '@/lib/index.js';
	export default {
		data() {
			return {
				phone_name: '',
				open_name: '',
				readChecked:false,
			}
		},
		onLoad() {
			
			// let userKey = uni.getStorageSync("key_")
			// if(userKey != null && userKey != ''){
			// 	uni.reLaunch({
			// 		url:'/pages/home/home?type=1'
			// 	})
			// }
			
			
		},
		
		onShow() {
			this.phone_name = uni.getStorageSync('phone');
			this.open_name = uni.getStorageSync('pwd');
		},
		methods: {
			handerChange(){
				this.readChecked = !this.readChecked;
			},
			onAgreement(){
				uni.navigateTo({
					url:'/pages/log/agreement',
				})
			},
			onButton(){
				var _this = this;
				if(this.phone_name == ''){
					this.$refs.uToast.show({
						type: 'default',
						title: '默认主题',
						message: '请输入您的账号',
					})
				}else if(this.open_name == ''){
					this.$refs.uToast.show({
						type: 'default',
						title: '默认主题',
						message: '请输入您的密码',
					})
				}else if(!this.readChecked){
					this.$refs.uToast.show({
						type: 'default',
						title: '默认主题',
						message: '请先阅读并勾选协议',
					})
				}else{
					api.getloginByPwd({
						phone:this.phone_name,
						pwd:this.open_name
					}).then(res => {
						uni.setStorageSync('phone', _this.phone_name);
						uni.setStorageSync('pwd',_this.open_name);
						uni.setStorageSync('key_', res.key);
						uni.setStorageSync('user_type',res.user_type);
						uni.reLaunch({
							url:'/pages/home/home?type=1'
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.log_view {
		width: 90%;
		margin: 0 auto;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		font-size: 12px;
	}
	.search_input{
		margin-top: 10px;
	}
	.check_box{
		transform: scale(0.8)
	}
	.log_button{
		height: 38px;
		margin: 20px;
		color: #fff;
		background-image: linear-gradient(to top, #6f9afc, #9bcffc);
		text-align: center;
		line-height: 38px;
		border-radius: 8px;
		
	}
</style>