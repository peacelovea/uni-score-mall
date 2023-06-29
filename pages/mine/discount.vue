<template>
	<view class="discount_view">
		<view class="flexSb" style="margin-bottom: 10px;">
			<u--input class="search_input" type="text" v-model="bm_name" placeholder="请输入用户名进行搜索" fontSize="12">
				<u--text @click="isShow = true" :text="cq_name" slot="prefix" size="10" style="margin-right: 3px;"
					type="info" suffixIcon="arrow-down-fill" iconStyle="font-size: 10px"></u--text>
			</u--input>
			<view class="search_button" @click="getButton()">搜索</view>
		</view>
		<view class="discount_titel">
			<u-row>
				<u-col span="4">
					<view class="discount_text">产品名称</view>
				</u-col>
				<u-col span="4">
					<view class="discount_text">类型</view>
				</u-col>
				<u-col span="4">
					<view class="discount_text">折扣</view>
				</u-col>
			</u-row>
		</view>
		<scroll-view scroll-y="true" :style="{height:hwindowHeight+'px'}">
			<view class="discount_list" v-for="(item,index) in discountList" :key="index">
				<u-row>
					<u-col span="4">
						<view class="discount_text" style="font-weight: 400;">{{item.product_name}}</view>
					</u-col>
					<u-col span="4">
						<view class="discount_text" style="font-weight: 400;" v-if="item.type == 1">移动积分</view>
						<view class="discount_text" style="font-weight: 400;" v-else-if="item.type == 2">联通积分</view>
						<view class="discount_text" style="font-weight: 400;" v-else>电信积分</view>
					</u-col>
					<u-col span="4">
						<view class="discount_text" style="font-weight: 400;">{{item.discount}}%</view>
					</u-col>
				</u-row>
			</view>
		</scroll-view>
		<u-picker :show="isShow" :columns="columns" keyName="label" closeOnClickOverlay @close="isShow = false"
			@cancel="isShow = false" @confirm="onPicker"></u-picker>
	</view>
</template>

<script>
	import api from '@/lib/index.js';
	export default {
		data() {
			return {
				bm_name: '',
				cq_name: '产品类型',
				cq_id: '',
				hwindowHeight: 0,
				isShow: false,
				columns: [
					[{
						label: '全部类型',
						id: ''
					}, {
						label: '移动积分',
						id: 1
					}, {
						label: '联通积分',
						id: 2
					}, {
						label: '电信积分',
						id: 3
					}]
				],
				discountList: []
			}
		},
		onLoad() {
			this.getUserProductMsg();
		},
		onShow() {
			let gain = 0;
			// 获取可使用窗口高度 
			gain = uni.getSystemInfoSync().windowHeight;
			this.hwindowHeight = gain - 65;
		},
		methods: {
			getUserProductMsg() {
				api.getUserProductMsg({
					product_type: this.cq_id,
					product_name: this.bm_name,
				}).then(res => {
					this.discountList = res;
				})
			},
			getButton() {
				this.getUserProductMsg();
			},
			onPicker(e) {
				this.isShow = false;
				this.cq_name = e.value[0].label;
				this.cq_id = e.value[0].id;
				this.getUserProductMsg();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.discount_view {
		width: 95%;
		margin: 0 auto;
		font-family: 'PingFang SC';
		font-style: normal;
	}

	.search_input {
		height: 28px;
		border: 1px solid #D9D9D9;
		border-radius: 14px;
	}

	.search_button {
		width: 53px;
		height: 28px;
		background-color: #1baeae;
		color: #fff;
		text-align: center;
		line-height: 28px;
		font-size: 12px;
		font-weight: 500;
		border-radius: 5px;
		margin-left: 10px;
	}

	.discount_titel {
		margin-bottom: 10px;
	}

	.discount_text {
		font-weight: 500;
		font-size: 12px;
		color: #000;
		text-align: center;
	}

	.discount_list {
		margin: 10px 0;
	}
</style>