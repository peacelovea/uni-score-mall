<template>
	<view class="register_view">
		<u-row customStyle="margin-bottom: 10px">
			<u-col span="3">
				<view style="font-weight: 500;text-align: right;">账号</view>
			</u-col>
			<u-col span="9">
				<u--input class="search_input" type="text" v-model="phone" placeholder="请输入3-16位账号"
					placeholderStyle="color:#666;" fontSize="12">
				</u--input>
			</u-col>
		</u-row>
		<u-row customStyle="margin-bottom: 10px">
			<u-col span="3">
				<view style="font-weight: 500;text-align: right;">密码</view>
			</u-col>
			<u-col span="9">
				<u--input class="search_input" type="text" v-model="password" :password='true' placeholder="请输入6-16位密码"
					placeholderStyle="color:#666;" fontSize="12">
				</u--input>
			</u-col>
		</u-row>
		<u-row customStyle="margin-bottom: 10px">
			<u-col span="3">
				<view style="font-weight: 500;text-align: right;">确认密码</view>
			</u-col>
			<u-col span="9">
				<u--input class="search_input" type="text" v-model="qr_password" :password='true' placeholder="请输入确认密码"
					placeholderStyle="color:#666;" fontSize="12">
				</u--input>
			</u-col>
		</u-row>
		<u-row customStyle="margin-bottom: 10px">
			<u-col span="3">
				<view style="font-weight: 500;text-align: right;">邀请码</view>
			</u-col>
			<u-col span="9">
				<u--input class="search_input" type="text" v-model="Invitation" placeholder="请输入邀请码"
					placeholderStyle="color:#666;" fontSize="12">
				</u--input>
			</u-col>
		</u-row>
		<u-row customStyle="margin-bottom: 10px">
			<u-col span="3">
				<view style="font-weight: 500;text-align: right;">省份</view>
			</u-col>
			<u-col span="9">
				<picker style="width: 100%;" mode="multiSelector" @change="bindMultiPickerChange"
					@columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
					<!-- <view class="inpit-box flexSb"> -->
					<!-- <view class="chose-theme" :class="$hooks.isEmpty(outlets.cityName)?'color-nor':'color-select'">{{$hooks.isEmpty(outlets.cityName)?'请选择':outlets.cityName}}</view> -->
					<view class="sf_view">{{cityName == ''?'请选择':cityName}}</view>
					<!-- </view> -->
				</picker>

			</u-col>
		</u-row>
		<view class="log_button" @click="onButton">注册</view>
		<view style="color: #6f9afc;text-align: center;font-size: 16px;margin-top: 20px;" @click="onRegister">已有账号？立即登录
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import addressArr from '../../common/address.js'
	export default {
		data() {
			return {
				phone: '',
				password: '',
				qr_password: '',
				Invitation: '',
				cityName: '',
				// 城市
				multiIndex: [],
				multiArray: [
					['北京市', '安徽省', "福建省", "甘肃省", "广东省", "广西省", "贵州省", "海南省", "河北省", "河南省", "黑龙江省", "湖北省", "湖南省", "吉林省",
						"江苏省", "江西省", "辽宁省", "内蒙古自治区", "宁夏回族自治区", "青海省", "山东省", "山西省", "陕西省", "上海市", "四川省", "天津市",
						"西藏自治区", "新疆维吾尔自治区", "云南省", "浙江省", "重庆市", "香港特别行政区", "澳门特别行政区", "台湾省"
					],
					["北京市"]
				],
				objectMultiArray: addressArr.regionArr,
			}
		},
		onLoad() {

		},
		methods: {
			onButton() {

			},
			onRegister() {
				uni.navigateTo({
					url: '/pages/log/log',
				})
			},
			// 城市
			bindMultiPickerChange(e) {
				let province = this.multiArray[0][e.detail.value[0]]
				let city = this.multiArray[1][e.detail.value[1]]
				this.cityName = province + ' - ' + city
				this.multiIndex[0] = e.detail.value[0]
				this.multiIndex[1] = e.detail.value[1]
			},
			bindMultiPickerColumnChange(e) {
				switch (e.detail.column) {
					case 0:
						let list = []
						for (var i = 0; i < this.objectMultiArray.length; i++) {
							if (this.objectMultiArray[i].parid == this.objectMultiArray[e.detail.value].regid) {
								list.push(this.objectMultiArray[i].regname)
							}
						}
						this.multiArray[1] = list
						this.multiIndex[0] = e.detail.value
						this.multiIndex[1] = 0
						// 强制数据渲染
						this.$forceUpdate();
						break;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.register_view {
		margin: 30px 20px;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		font-size: 12px;
	}

	.search_input {
		height: 25px;
		margin-left: 10px;
	}

	.sf_view {
		height: 25px;
		line-height: 25px;
		padding-left: 10px;
		color: #666;
		border: 0.5px solid #dadbde;
		border-radius: 3px;
		margin-left: 10px;
	}

	.log_button {
		height: 38px;
		margin: 20px 0;
		color: #fff;
		background-color: #1E9FFF;
		text-align: center;
		line-height: 38px;
		border-radius: 8px;
	}
</style>