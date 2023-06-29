<template>
	<view class="add_view">
		<view class="flexSb" style="margin-top: 30px;">
			<view >账号</view>
			<u--input class="popup_input" type="number" v-model="account_name" fontSize="12"></u--input>
		</view>
		<view class="flexSb" style="margin-top: 10px;">
			<view >昵称</view>
			<u--input class="popup_input" type="text" v-model="nc_name" fontSize="12"></u--input>
		</view>
		<view class="flexSb" style="margin-top: 10px;">
			<view >密码</view>
			<u--input class="popup_input" type="text" v-model="password_name" fontSize="12"></u--input>
		</view>
		<view class="flexl" style="margin-top: 10px;">
			<view>用户角色</view>
			<u-radio-group v-model="membervalue" placement="row">
				<u-radio activeColor="#F4455D" inactiveColor="#575B66" style="transform:scale(0.8);"
					labelColor="#000" iconSize="10px" labelSize="12px" :customStyle="{color: '#000'}"
					v-for="(item, index) in memberlist" :key="index" :label="item.name" :name="item.name"
					@change="memberChange(item)">
				</u-radio>
			</u-radio-group>
		</view>
		<view class="flexSb"
			style="font-size: 14px;border-bottom: 1px solid #e3e3e3;padding: 10px 0;margin-bottom: 10px;">
			<view class="">渠道</view>
			<view class="">代理折扣</view>
			<view class="">状态</view>
			<view class="">我的折扣</view>
		</view>
		<scroll-view scroll-y="true" :style="{height:hwindowHeight+'px'}">
			<view class="flexl scroll_view" v-for="(item,index) in discountList" :key="index">
				<view style="width: 70px;">{{item.product_name}}</view>
				<view class="flexSb" style="width: 60px;margin-left: 17px;">
					<u--input class="popup_input1" inputAlign="center" color="#000" type="number" v-model="item.discount" fontSize="12"></u--input>
						<view class="">%</view>
				</view>
				<view style="margin-left: 50px">
					<u-switch v-model="item.product_status" activeColor="#F4455D" size="12"></u-switch>
				</view>
				<view class="flexSb">
					<view class="zk_text">{{item.my_discount}}</view>
					<view class="">%</view>
				</view>
				
			</view>
		</scroll-view>
		<view class="zk_button" @click="onbutton">确认提交</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import api from '@/lib/index.js';
	export default{
		data(){
			return{
				account_name:'',
				nc_name:'',
				password_name:'',
				// 新增成员单选框数据
				memberlist: [{
						name: '代理商',
						disabled: false,
						id: 1
					},
					{
						name: '操作员',
						disabled: false,
						id: 0
				}],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				membervalue: '代理商',
				member_id: 1,
				hwindowHeight: 0,
				discountList:[],
			}
		},
		onLoad() {
			this.getUserProductDatas();
		},
		onShow() {
			let gain = 0;
			// 获取可使用窗口高度 
			gain = uni.getSystemInfoSync().windowHeight;
			this.hwindowHeight = gain - 264;
		},
		methods:{
			getUserProductDatas() {
				api.getUserProductDatas({
				}).then(res => {
					this.discountList = res;
				})
			},
			memberChange(e){
				this.member_id = e.id
			},
			onbutton(){
				let json = JSON.stringify(this.discountList);
				if(this.account_name == ''){
					this.$refs.uToast.show({
						type: 'default',
						title: '默认主题',
						message: '请输入账号',
					})
				}else if(this.nc_name == ''){
					this.$refs.uToast.show({
						type: 'default',
						title: '默认主题',
						message: '请输入昵称',
					})
				}else if(this.password_name == ''){
					this.$refs.uToast.show({
						type: 'default',
						title: '默认主题',
						message: '请输入密码',
					})
				}else{
					uni.showLoading({
						title:'加载中...'
					})
					api.addTeamUser({
						phone:this.account_name,
						nickname:this.nc_name,
						password:this.password_name,
						user_type:this.member_id,
						jsondatas:json,
					}).then(res => {
						uni.hideLoading();
						this.$refs.uToast.show({
							type: 'default',
							title: '默认主题',
							message: "添加成功",
							complete(){
								uni.navigateBack({
									delta: 1
								});
							}
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add_view{
		width: 90%;
		margin: 0 auto;
		font-family: 'PingFang SC';
		font-style: normal;
		font-size: 12px;
	}
	.popup_input{
		height: 25px;
		margin-left: 20px;
	}
	.popup_input1{
		width: 60px;
		height: 25px;
		background-color: #fff;
		margin-right: 5px;
	}
	.scroll_view {
		font-size: 12px;
		border-bottom: 1px solid #e3e3e3;
		padding: 5px 0 20px 0;
	}
	
	.zk_text {
		width: 50px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		color: #000;
		border-radius: 5px;
		border: 1px solid #E7ECED;
		margin-left: 45px;
		font-size: 12px;
		margin-right: 5px;
	}
	.zk_button{
		width: 70%;
		height: 40px;
		border-radius: 40px;
		background-color: #fe6f5f;
		font-size: 16px;
		color: #fff;
		line-height: 40px;
		text-align: center;
		margin: 10px auto;
	}
</style>