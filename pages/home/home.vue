<template>
	<view>
		<view class="home_content">
			<view style="margin-bottom:30px;margin-left:20px;font-size: 16px;">积分查询</view>
			<view class="home_content_center">
				<view class="home_content_center_middle">
					<view class="middle_list">
						<view class="middle_item" @click="clickScoreJf(index)" :class="{'middle_items':currect==index}"
							v-for="(item,index) in scoreList" :key="index">
							<image style="width: 70px; height: 70px;margin-bottom: 5px;" :src="item.product_img"
								mode="">
							</image>
							<text style="margin-top: 20px;font-size: 16px;color: #68aea3;">{{item.product_name}}</text>
						</view>
					</view>
				</view>
			</view>

			<u-toast ref="uToast"></u-toast>
			<u-popup :show="isShowpopup" mode="center"
				:customStyle="{width: '70%',height: '200px',borderRadius: '5px',}">

				<view style="width: 90%;margin: 0 auto;">
					<u-icon class="popup_icon" name="close" color="#8a8a8a" size="20" :bold="true"
						@click="isShowpopup = false"></u-icon>
					<view class="popup_title">温馨提示</view>
					<view class="popup_text">
						兑换积分务必客户知情，严禁不知情兑换，一旦发现不知情兑换暂停合作。
					</view>
					<view class="popup_button" @click="onButton">我已知晓</view>
				</view>
			</u-popup>
		</view>

	</view>
</template>

<script>
	import api from '@/lib/index.js';
	export default {
		data() {
			return {
				currect: null,
				vipGoldIndex: 0,
				vipDemonIndex: 0,

				swiperList: [],
				scoreList: [{
						product_img: '/static/score_yd.png',
						product_name: '中国移动',
					},
					{
						product_img: '/static/score_uni.png',
						product_name: '中国联通',
					},
					{
						product_img: '/static/score_tel.png',
						product_name: '中国电信',
					},
				],
				scoreYDList: [],
				scoreLTList: [],
				scoreDXList: [],
				isShowpopup: false,
				type: 0,

			}
		},
		onLoad(e) {
			this.type = e.type;
			if (this.type == 1) {
				this.isShowpopup = true;
			}
			this.type = 0;
			this.initData();
		},
		onShow() {
			getApp().globalData.reviseTabbarByUserType();
		},
		methods: {
			//点击banner
			goToSwiperPage(index) {

			},
			initData() {
				let _this = this
				api.getIndex({

				}).then(res => {
					this.swiperList = res.bannerList;
					// this.List = res.productList;

					for (let index = 0; index < res.productList.length; index++) {
						if (res.productList[index].type == "1") {
							_this.scoreYDList.push(res.productList[index])
						}

						if (res.productList[index].type == "2") {
							_this.scoreLTList.push(res.productList[index])
						}

						if (res.productList[index].type == "3") {
							_this.scoreDXList.push(res.productList[index])
						}

					}

					console.log(_this.scoreYDList)
				})
			},
			clickScoreJf(index) {
				this.currect = index
				uni.navigateTo({
					url: '/pages/home/Score',
				})
			},
			//点击积分
			clickScore(index) {
				// for (var i = 0; i < this.List.length; i++) {
				// 	if (this.scoreList[index].istype == this.List[i].type) {
				// 		console.log(this.scoreList[index].istype)
				// 	}
				// }
			},
			onButton() {
				this.isShowpopup = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.topview {
		width: 100%;
	}

	.score_tips {
		width: 100%;
		color: #000000;
		font-size: 15px;
		font-weight: bold;
		padding: 25px 0 10px 15px;
	}

	.score_content {
		width: 100%;
		font-size: 14px;
		font-weight: bold;
	}

	.popup_icon {
		position: absolute;
		right: 5px;
		top: 5px;
		padding: 5px;
	}

	.popup_title {
		text-align: center;
		font-size: 16px;
		font-weight: 600;
		margin-top: 30px;
	}

	.popup_text {
		font-size: 12px;
		margin: 30px 0;
	}

	.popup_button {
		width: 150px;
		height: 30px;
		margin: 0 auto;
		background-color: #FA5B58;
		border-radius: 5px;
		font-size: 12px;
		line-height: 30px;
		text-align: center;
		color: #fff;
	}

	page {
		babackground-color: #FFFFFF;
	}

	.home_content_center {
		// border: solid 1px blue;
		// margin-top: 0px;

		.home_content_center_top {
			background-color: #FE9F59;
			height: 200rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx 130rpx;
			color: #FFFFFF;

			.home_content_center_top_left {
				display: flex;
				flex-direction: column;
				align-items: left;
			}
		}

		.home_content_center_middle {
			// border: solid 1px red;
			border-radius: 40rpx 40rpx 0 0;
			position: relative;
			bottom: 60rpx;
			background-color: #FFFFFF;

			.middle_list {
				padding: 40rpx 30rpx 20rpx;
				display: flex;
				justify-content: space-between;

				.middle_item {
					// border: solid 1px pink;
					background: rgb(255, 255, 255);
					box-shadow: 0px 0px 10px rgba(6, 0, 1, 0.05);
					// box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.2),
					// 	-18px -18px 30px rgba(237, 243, 249, 1);
					transition: all .3s ease-out;
					height: 200rpx;
					width: 200rpx;
					padding: 30rpx;
					border-radius: 40rpx/50rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.middle_items {
					height: 130rpx;
					width: 130rpx;
					box-shadow: 0 0 0 rgba(0, 0, 0, 0.2),
						0 0 0 rgba(237, 243, 249, 0.8),
						inset 8px 8px 8px rgb(207, 221, 237),
						inset -8px -8px 8px rgba(255, 255, 255, 0.5)
				}
			}
		}

		.middle_scroll-list {
			padding: 40rpx 30rpx 0;
			// border: solid 1px red;
			// height:100%;

			.scroll-list {
				display: flex;
				margin-top: 20rpx;

				.scroll-list_item {
					// border: solid 1px blue;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-right: 40rpx;
					height: 200rpx;

					.scroll-list_item_image {
						width: 120rpx;
						height: 120rpx;
						background-color: #FFA45C;
						border-radius: 25rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-bottom: 10rpx;
					}
				}
			}
		}

		.dynamic_list {
			padding: 20rpx 30rpx 0;
			// border: solid 1px blue;

			.dynamic_list_title {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}

		.dynamic_list_line {
			background-color: #FE9F59 !important;
		}
	}

	/deep/ .u-scroll-list__indicator {
		display: none !important;
	}
</style>