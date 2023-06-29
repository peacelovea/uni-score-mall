<template>
	<view class="wallet_view">
		<view class="wallet_zd_view" @click="getCheck">我的账单</view>
		<view style="margin: 15px 0;">
			<u-image style="align-items: center;" width="50px" height="50px" src="/static/wallet.png" shape="circle"
				mode="widthFix"></u-image>
			<view style="width: 100%;text-align: center;margin-top: 10px;font-size: 16px;">账户余额</view>
			<view style="width: 100%;text-align: center;margin-top: 10px;font-size: 24px;">¥{{money}}</view>
			<view style="width: 100%;text-align: center;margin-top: 10px;font-size: 14px;color: #ff0023;">
				可体现金额{{tx_money}}</view>
			<view class="wallet_tx_view" @click="onWithdraw">提现</view>
			<view style="width: 100%;text-align: center;margin: 20px 0;font-size: 12px;color:#0065E0;" @click="onRecord">提现记录</view>
		</view>
		<u-image width="100%" height="170px" src="/static/wallet_sm.png" mode="widthFix"></u-image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: '7876.87',
				tx_money: '7464.78'
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			// 我的账单
			getCheck() {
				uni.navigateTo({
					url:'/pages/mine/Check',
				})
			},
			// 提现按钮
			onWithdraw(){
				uni.navigateTo({
					url:'/pages/mine/Withdraw',
				})
			},
			// 提现记录
			onRecord(){
				uni.navigateTo({
					url:'/pages/mine/Record',
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wallet_view {
		width: 90%;
		margin: 0 auto;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 500;
	}

	.wallet_zd_view {
		font-size: 12px;
		color: #F97C79;
		text-align: right;
	}

	.wallet_tx_view {
		align-items: center;
		width: 40%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		margin-top: 20px;
		font-size: 14px;
		color: #fff;
		background-color: #ff0023;
		margin-left: 30%;
		border-radius: 5px;
	}
</style>