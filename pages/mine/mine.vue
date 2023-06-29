<template>
	<view class="mine_view">
		<view class="mine_top_view">
			<view style="width: 90%;margin: 0 auto;">
				<view class="flexl" style="padding-top:40px;">
					<u-image width="60px" height="60px" src="/static/vector.png" shape="circle"
						mode="widthFix"></u-image>
					<view style="margin-left: 5px;">
						<view class="mine_text">{{name}}</view>
						<view class="mine_text" style="margin-top: 5px;">{{type == 0 ? '操作员':'代理商'}}</view>
					</view>
				</view>
				<view class="flexSb" style="margin-top: 30px;">
					<view class="mine_text">
						<view style="text-align: center;">¥{{today_money}}</view>
						<view>今日收入</view>
					</view>
					<view class="mine_text">
						<view style="text-align: center;">¥{{total_money}}</view>
						<view>累计收入</view>
					</view>
					<view class="mine_text" @click="onWallet">
						<view style="text-align: center;">¥{{balance}}</view>
						<view>我的钱包</view>
					</view>
				</view>
			</view>
			<view class="toolbar">
				<view class="title">我的工具栏</view>
				<view class="list">
					<view class="box" @click="onMember(0)">
						<view class="img">
							<image src="/static/Frame-4.png"></image>
						</view>
						<view class="text">积分订单</view>
					</view>
					<view class="box" @click="onMember(1)">
						<view class="img">
							<image src="/static/Frame.png"></image>
						</view>
						<view class="text">我的折扣</view>
					</view>
					<view class="box" @click="onMember(5)">
						<view class="img">
							<image src="/static/change_msg.png"></image>
						</view>
						<view class="text">修改资料</view>
					</view>
					<view class="box" @click="onMember(3)">
						<view class="img">
							<image src="/static/Frame-2.png"></image>
						</view>
						<view class="text">修改密码</view>
					</view>
				</view>
			</view>
			<!-- <view class="list" style="width: 95%;margin: 0 auto;margin-top: 40px;">
				<view class="box" @click="onMember(0)">
					<view class="img">
						<u-image src="/static/Frame-4.png" mode="widthFix"></u-image>
						<view class="mine_text" style="color: #000;margin-left: 5px;">积分订单</view>
					</view>
				</view>
				<view class="box" @click="onMember(1)">
					<view class="flexl">
						<u-image width="20px" height="20px" src="/static/Frame.png" mode="widthFix"></u-image>
						<view class="mine_text" style="color: #000;margin-left: 5px;">我的折扣</view>
					</view>
				</view>
				<view class="box" @click="onMember(5)">
					<view class="flexl">
						<u-image class="img" width="20px" height="20px" src="/static/change_msg.png"
							mode="widthFix"></u-image>
						<view class="mine_text" style="color: #000;margin-left: 5px;">修改资料</view>
					</view>
				</view>
				<view class="box" @click="onMember(3)">
					<view class="flexl">
						<u-image width="20px" height="20px" src="/static/Frame-2.png" mode="widthFix"></u-image>
						<view class="mine_text" style="color: #000;margin-left: 5px;">修改密码</view>
					</view>
				</view>
			</view> -->
		</view>
		<view class="mine_button" @click="onButton">退出登录</view>
	</view>
</template>

<script>
	import api from '@/lib/index.js';
	export default {
		data() {
			return {
				name: '',
				type: '',
				today_money: '0',
				total_money: '0',
				balance: '0',
			}
		},
		onLoad() {
			api.getUserMsg({}).then(res => {
				this.name = res.nickname;
				this.type = res.user_type;
				this.today_money = res.today_money;
				this.total_money = res.total_money;
				this.balance = res.balance;
			})
		},
		onShow() {
			getApp().globalData.reviseTabbarByUserType();
		},
		methods: {
			onMember(type) {
				if (type == 0) { //积分订单
					uni.navigateTo({
						url: '/pages/mine/integral',
					})
				} else if (type == 1) { //我的折扣
					uni.navigateTo({
						url: '/pages/mine/discount',
					})
				} else if (type == 2) { //我的邀请
					uni.navigateTo({
						url: '/pages/mine/invite',
					})
				} else if (type == 3) { //修改密码
					uni.navigateTo({
						url: '/pages/mine/message',
					})
				} else if (type == 4) { //投诉建议

				} else if (type == 5) { //修改资料
					uni.navigateTo({
						url: '/pages/mine/chage_msg',
					})
				}
			},
			onButton() {
				uni.setStorageSync("key_", '')
				uni.setStorageSync("user_type", '')
				uni.reLaunch({
					url: '/pages/log/log',
				})
			},
			onWallet() {
				uni.navigateTo({
					url: '/pages/mine/wallet',
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine_top_view {
		font-family: 'PingFang SC';
		font-style: normal;
		margin: 10px;
		height: 180px;
		background: linear-gradient(90deg, rgb(27, 174, 174), rgb(81, 199, 199));
		box-shadow: rgb(38, 144, 144) 0px 0.05333rem 0.13333rem;
		border-radius: 0.5rem;
	}

	.mine_text {
		font-size: 14px;
		color: #fff;
	}

	.mine_member {
		margin: 25px 0;
	}

	.mine_button {
		width: 50%;
		height: 30px;
		background-color: #1baeae;
		border-radius: 5px;
		color: #fff;
		font-size: 12px;
		line-height: 30px;
		text-align: center;
		position: fixed;
		bottom: 120px;
		left: 25%;
	}

	.toolbar {
		// width: 100%;
		margin: 8% 0;
		padding: 0 0 20upx 0;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0, 0, 0, 0.1);
		border-radius: 15upx;

		.title {
			padding-top: 10upx;
			margin: 0 0 10upx 3%;
			font-size: 30upx;
			height: 80upx;
			display: flex;
			align-items: center;
		}

		.list {
			display: flex;
			flex-wrap: wrap;

			.box {
				width: 25%;
				margin-bottom: 30upx;

				.img {
					width: 23vw;
					height: 10.5vw;
					display: flex;
					justify-content: center;

					image {
						width: 9vw;
						height: 9vw;
					}
				}

				.text {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 26upx;
					color: #3d3d3d;
				}
			}
		}
	}
</style>