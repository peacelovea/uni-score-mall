<template>
	<view class="score_view">
		<view class="jf_content jf_bg1 flexSb" style="margin-top: 30px;">
			<view class="flexcS">
				<text>中国移动积分查询方式</text>
				<text style="margin-top: 5px;">发送JF到10086或10658999</text>
			</view>
			<view class="jf_btn" style="color: #0085D0;" @click="isShow(0)">二维码查询</view>
		</view>

		<view class="jf_content jf_bg2 flexSb">
			<view class="flexcS">
				<text>中国联通积分查询方式</text>
				<text style="margin-top: 5px;">发送JF到105或10010</text>
			</view>
			<view class="jf_btn" style="color: #0254A4;" @click="isShow(1)">二维码查询</view>
		</view>

		<view class="jf_content jf_bg3 flexSb">
			<view class="flexcS">
				<text>中国电信积分查询方式</text>
				<text style="margin-top: 5px;">发送jfcx到105或10001</text>
			</view>
			<view class="jf_btn" style="color: #0065E0;" @click="isShow(2)">二维码查询</view>
		</view>
		<u-popup :show="isShowamend" mode="center" closeOnClickOverlay @close="isShowamend = false"
			:customStyle="{width: '70%',height: '220px',borderRadius: '5px',}">
				<u-image width="100%" height="100%" :src="isImg" mode="widthFix"></u-image>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowamend:false,
				isImg:'',
			}
		},
		methods: {
			isShow(type){
				this.isShowamend = true;
				if(type == 0){
					this.isImg = '/static/imageYd.png';
				}else if(type == 1){
					this.isImg = '/static/imageLt.png';
				}else{
					this.isImg = '/static/imageDx.png';
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.score_view {
		width: 85%;
		margin: 0 auto;
		font-family: 'PingFang SC';
		font-style: normal;
	}

	.jf_bg1 {
		background-color: #0085d0;
	}

	.jf_bg2 {
		background-color: #0254A4;
	}

	.jf_bg3 {
		background-color: #0065E0;
	}

	.jf_content {
		width: 100%;
		padding: 20px 10px;
		margin-top: 15px;
		border-radius: 10px;

		text {
			color: #fff;
			font-size: 14px;
			font-weight: 500;
		}
	}

	.jf_btn {
		background-color: #fff;
		color: #0085D0;
		font-size: 14px;
		font-weight: bold;
		padding: 5px 15px;
		border-radius: 30px;
	}
</style>