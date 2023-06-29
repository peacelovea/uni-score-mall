<template>
	<view class="product_view">
		<u-tabs :list="tabsList" :scrollable="false" lineWidth="28" lineColor="#FA5B58" :activeStyle="{
            color: '#FA5B58',
            fontWeight: 'bold',
            transform: 'scale(0.9)'
        }" :inactiveStyle="{
            color: '#000',
            transform: 'scale(0.8)'
        }" @click="onTabs"></u-tabs>
		<scroll-view scroll-y="true" :style="{height:hwindowHeight+'px'}">
			<view>
				
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hwindowHeight:0,
				tabsList: [{
					name: '奥特力',
				}, {
					name: '昆月',
				}, {
					name: '畅玩',
				}, {
					name: '实物推广',
				}]
			}
		},
		onLoad() {

		},
		onShow() {
			let gain = 0;
			// 获取可使用窗口高度 
			gain = uni.getSystemInfoSync().windowHeight;
			this.hwindowHeight = gain - 44;
			
			getApp().globalData.reviseTabbarByUserType();
		},
		methods: {
			// 点击tabs
			onTabs(item){
				console.log(item);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product_view {
		width: 95%;
		margin: 0 auto;
	}
</style>