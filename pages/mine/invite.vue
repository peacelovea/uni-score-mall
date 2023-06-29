<template>
	<view class="invite_view">
		<u-row style="margin: 15px auto;">
			<u-col span="6">
				<view class="flexl">
					<view class="invite_text">今日直接邀请：</view>
					<view class="invite_text">{{zjyq}}人</view>
				</view>
			</u-col>
			<u-col span="1">
			</u-col>
			<u-col span="5">
				<view class="flexl">
					<view class="invite_text">直接邀请累计：</view>
					<view class="invite_text">{{zjyq_lj}}人</view>
				</view>
			</u-col>
		</u-row>
		<u-row style="margin: 15px auto;">
			<u-col span="6">
				<view class="flexl">
					<view class="invite_text">今日间接邀请：</view>
					<view class="invite_text">{{jjyq}}人</view>
				</view>
			</u-col>
			<u-col span="1">
			</u-col>
			<u-col span="5">
				<view class="flexl">
					<view class="invite_text">间接邀请累计：</view>
					<view class="invite_text">{{jjyq_lj}}人</view>
				</view>
			</u-col>
		</u-row>
		<u-row style="margin: 15px auto;">
			<u-col span="6">
				<view class="flexl">
					<view class="invite_text">今日邀请分润：</view>
					<view class="invite_text">{{yqfr}}元</view>
				</view>
			</u-col>
			<u-col span="1">
			</u-col>
			<u-col span="5">
				<view class="flexl">
					<view class="invite_text">累计邀请分润：</view>
					<view class="invite_text">{{yqfr_lj}}元</view>
				</view>
			</u-col>
		</u-row>
		
		<view class="flexSb" style="margin-bottom: 10px;">
			<view class="" >邀请方式</view>
			<view class="" style="width: 50px;text-align: center;margin-left: 40px;">被邀请人</view>
			<view class="" style="width: 130px;text-align: center;">邀请时间</view>
		</view>
		<scroll-view scroll-y="true" :style="{height:hwindowHeight+'px'}">
			<view class="flexSb" style="margin: 5px 0;" v-for="(item,index) in scrollList" :key="index">
				<view class="scroll_text" >{{item.yqfs}}</view>
				<view class="scroll_text" style="width: 50px;text-align: center;margin-left: 40px;">{{item.yqr}}</view>
				<view class="scroll_text" style="width: 130px;text-align: center;">{{item.time}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				zjyq:'3',
				zjyq_lj:'3',
				jjyq:'3',
				jjyq_lj:'3',
				yqfr:'374.98',
				yqfr_lj:'8776.00',
				hwindowHeight:0,
				scrollList:[{
					yqfs:'直接邀请',
					yqr:'护肤**',
					time:'2023-04-30 23:34:54',
				},{
					yqfs:'直接邀请',
					yqr:'护肤**',
					time:'2023-04-30 23:34:54',
				},{
					yqfs:'直接邀请',
					yqr:'护肤**',
					time:'2023-04-30 23:34:54',
				},{
					yqfs:'直接邀请',
					yqr:'护肤**',
					time:'2023-04-30 23:34:54',
				},{
					yqfs:'直接邀请',
					yqr:'护肤**',
					time:'2023-04-30 23:34:54',
				}]
			}
		},
		onLoad() {
			
		},
		onShow() {
			let gain = 0;
			// 获取可使用窗口高度 
			gain = uni.getSystemInfoSync().windowHeight;
			this.hwindowHeight = gain - 138;
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.invite_view{
		width: 90%;
		margin: 0 auto;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 500;
		color: #000;
		font-size: 12px;
	}
	.invite_text{
		color: #F4455D;
	}
	.scroll_text{
		font-weight: 400;
	}
</style>