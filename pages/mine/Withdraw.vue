<template>
	<view class="withdraw_view">
		<view class="flexSb">
			<view style="font-size: 16px;">到支付宝</view>
			<view style="padding-top: 20px;" @click="isShowPop = !isShowPop">
				<view class="flexl">
					<u-image width="30px" height="30px" :src="payDatas[pay_index].imageUrl" shape="circle" mode="widthFix"></u-image>
					<view style="font-size: 16px; margin-left: 10px;">
						<text>{{payDatas[pay_index].number}}</text>
						<view style="font-size: 12px;color: #C1C0C0; margin-top: 5px;">{{payDatas[pay_index].msg}}</view>
					</view>
				</view>
				
			</view>
			<u-icon name="arrow-right" color="#000" size="16"></u-icon>
		</view>
		<view style="font-size: 12px;margin-top: 80px;">提现金额</view>
		<u--input class="search_input" border="bottom" type="number" v-model="money_name" placeholder="请输入提现金额，只能是整数"
			fontSize="20">
			<u--text text="¥" slot="prefix" size="20" color="#000" margin="0 10px 10px 0"></u--text>
		</u--input>
		<view class="flexl" style="font-size: 12px;margin-top: 15px;">
			<view style="color: #8a8a8a;">当前可提现金额：{{tx_money}},</view>
			<view style="color: #0065e0;margin-left: 10px;" @click="onTx">全部提现</view>
		</view>

		<view class="mine_button" @click="commitM">确定提现</view>


		<u-popup :show="isShowPop" overlay=true mode='bottom' closeable=true closeOnClickOverlay=true
			@close="isShowPop = false">
			<view class="pop_box">
				<view  v-for="(item,index) in payDatas" :key="index" @click="popClick(index)">
					<view class="flexl" style="margin-bottom: 15px;">
						<u-image width="40px" height="40px" :src="item.imageUrl" mode="widthFix"></u-image>
						<view style="font-size: 16px; margin-left: 10px;">
							<text>{{item.number}}</text>
							<view style="font-size: 12px;color: #C1C0C0;margin-top: 5px;">{{item.msg}}</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pay_index:0,
				money_name: '',
				tx_money: '786.98',

				isShowPop: false,
				
				payDatas:[
					{
						imageUrl:"/static/pay_zfb.png",
						type:1,
						msg:"五分钟内到账",
						number:"137****789",
					},
					{
						imageUrl:"/static/pay_wx.png",
						type:2,
						msg:"五分钟内到账",
						number:"137****789",
					},
					{
						imageUrl:"/static/pay_bank.png",
						type:3,
						msg:"深圳梅龙支行",
						number:"623058****5656",
					},
				],
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			onTx() {
				this.money_name = this.tx_money;
			},
			
			popClick(index){
				this.pay_index = index;
				this.isShowPop = false;
			},
			
			commitM(){
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.withdraw_view {
		width: 90%;
		margin: 0 auto;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 600;
	}

	.search_input {
		height: 30px;
		border-bottom: 1px solid #6C797A;
		margin-top: 15px;
	}

	.mine_button {
		width: 70%;
		height: 40px;
		background-color: #0065e0;
		border-radius: 5px;
		color: #fff;
		font-size: 12px;
		line-height: 40px;
		text-align: center;
		margin: 0 auto;
		margin-top: 50px;
	}

	.pop_box {
		width: 100%;
		padding: 20px;
		padding-top: 50px;
	}
</style>
