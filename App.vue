<script>
	export default { 
		globalData: {
			reviseTabbarByUserType: function() {
				let userType = uni.getStorageSync('user_type') ? uni.getStorageSync('user_type') : 1;
				//权限1
				if (userType == 1) {
					uni.setTabBarItem({
						index: 0,
						visible: true,
					})
					uni.setTabBarItem({
						index: 1,
						visible: true,
					})
					uni.setTabBarItem({
						index: 2,
						visible: true,
					})
					uni.setTabBarItem({
						index: 3,
						visible: true,
					})
				} else {
					uni.setTabBarItem({
						index: 0,
						visible: true,
					})
					uni.setTabBarItem({
						index: 1,
						visible: false,
					})
					uni.setTabBarItem({
						index: 2,
						visible: true,
					})
					uni.setTabBarItem({
						index: 3,
						visible: true,
					})
				}
			}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "@/public/public.scss";

	page {
		background-color: #fff;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
	}

	/* checkbox样式 */
	uni-checkbox .uni-checkbox-input {
		width: 25rpx;
		height: 25rpx;
		border-radius: 50%;
	}

	/*checkbox选中后样式  */
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		background: #F86A67;
		border-color: #F86A67;
	}

	/*checkbox选中后图标样式  */
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked::before {
		width: 18rpx;
		height: 18rpx;
		line-height: 18rpx;
		text-align: center;
		font-size: 22rpx;
		color: #fff;
		background: transparent;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
	}
</style>