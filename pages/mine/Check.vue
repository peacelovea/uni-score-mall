<template>
	<view class="check_view">
		<view class="flexSb">
			<view class="flexl" @click="isshowcalendar = true">
				<view class="check_text" style="text-align: center;">{{ks_time}}</view>
				<view style="line-height: 25px;margin: 0 10px;"> - </view>
				<view class="check_text" style="text-align: center;">{{js_time}}</view>
			</view>
			<view class="check_text flexSb" style="padding: 0 10px;" @click="isShowTd = true">
				<view>{{td_name}}</view>
				<u-icon name="arrow-down-fill" color="#8A8A8A" size="10"></u-icon>
			</view>
		</view>
		<view class="flexl" style="margin-top: 15px;">
			<view class="check_text flexSb" style="padding: 0 10px;" @click="isShowJg = true">
				<view>{{jg_name}}</view>
				<u-icon name="arrow-down-fill" color="#8A8A8A" size="10"></u-icon>
			</view>
			<view class="check_button" @click="onButton">查询</view>
		</view>
		<view style="margin: 15px 0;">
			<u-row style="text-align: center;">
				<u-col span="2.4">
					<view class="col_view">渠道</view>
				</u-col>
				<u-col span="2.4">
					<view class="col_view">账号</view>
				</u-col>
				<u-col span="2.4">
					<view class="col_view">金额</view>
				</u-col>
				<u-col span="2.4">
					<view class="col_view">状态</view>
				</u-col>
				<u-col span="2.4">
					<view class="col_view">余额</view>
				</u-col>
			</u-row>
		</view>
		<scroll-view scroll-y="true" :style="{height:hwindowHeight+'px'}">
			<view class="scroll_view" v-for="(item,index) in checkList" :key="index">
				<u-row >
					<u-col span="2.4">
						<view class="col_view">{{item.qd}}</view>
					</u-col>
					<u-col span="2.4">
						<view class="col_view">{{item.zh}}</view>
					</u-col>
					<u-col span="2.4">
						<view class="col_view">{{item.money}}</view>
					</u-col>
					<u-col span="2.4">
						<view class="col_view">{{item.zt}}</view>
					</u-col>
					<u-col span="2.4">
						<view class="col_view">{{item.ye}}</view>
					</u-col>
				</u-row>
				<view class="check_time_text">{{item.time}}</view>
			</view>
		</scroll-view>
		<!-- 支付通道 -->
		<u-picker :show="isShowTd" :columns="columnsTd" closeOnClickOverlay @close="isShowTd = false"
			@cancel="isShowTd = false" @confirm="onPickerTd"></u-picker>
		<!-- 处理结果 -->
		<u-picker :show="isShowJg" :columns="columnsJg" closeOnClickOverlay @close="isShowJg = false"
			@cancel="isShowJg = false" @confirm="onPickerJg"></u-picker>
		<!-- 日历 -->
		<u-calendar :show="isshowcalendar" startText="开始" endText="结束" :defaultDate="date" color="#f56c6c" mode="range"
			@confirm="onCalendar" @close="isshowcalendar = false" monthNum="10" :min-date="minDateStr"
			:max-date="maxDateStr" ref="calendar"></u-calendar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ks_time: '',
				js_time: '',
				td_name: '全部',
				jg_name:'全部',
				hwindowHeight: 0,
				isshowcalendar:false,
				minDateStr:'',
				maxDateStr:'',
				date:'',
				isShowTd:false,
				isShowJg:false,
				columnsTd: [
					['全部', '支付宝', '银行卡']
				],
				columnsJg: [
					['全部', '处理成功', '处理失败','正在处理']
				],
				checkList:[{
					qd:'支付宝',
					zh:'138****9999',
					money:'756',
					zt:'正在处理',
					ye:'345.56',
					time:'4月30日 12:32',
				},{
					qd:'支付宝',
					zh:'138****9999',
					money:'756',
					zt:'正在处理',
					ye:'345.56',
					time:'4月30日 12:32',
				},{
					qd:'支付宝',
					zh:'138****9999',
					money:'756',
					zt:'正在处理',
					ye:'345.56',
					time:'4月30日 12:32',
				},{
					qd:'支付宝',
					zh:'138****9999',
					money:'756',
					zt:'正在处理',
					ye:'345.56',
					time:'4月30日 12:32',
				}]
			}
		},
		onLoad() {
			this.minDateStr = new Date().setMonth(new Date().getMonth() - 4)
			this.maxDateStr = new Date().setMonth(new Date().getMonth())
			this.date = [new Date().setDate(new Date().getDate() - 1), new Date()]

			let date = new Date(); //Fri Oct 29 2021 16:37:56 GMT+0800 (CST)
			let y = date.getFullYear(); //获取完整的年份(4位)
			let m = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
			let d = date.getDate(); //获取当前日(1-31)
			let m_name = m > 10 ? m : '0' + m;
			let d_name = d > 10 ? d : '0' + d;
			let Time = this.GetTime();
			this.ks_time = Time[6];
			this.js_time = y + '-' + m_name + '-' + d_name
		},
		onShow() {
			let gain = 0;
			// 获取可使用窗口高度 
			gain = uni.getSystemInfoSync().windowHeight;
			this.hwindowHeight = gain - 112;
		},
		methods: {
			onCalendar(e){
				this.ks_time = e[0];
				this.js_time = e[e.length - 1]
				this.isshowcalendar = false
			},
			onPickerTd(e){
				this.td_name = e.value[0];
				this.isShowTd = false;
			},
			onPickerJg(e){
				this.jg_name = e.value[0];
				this.isShowJg = false;
			},
			onButton(){
				
			},
			GetTime() {
				var date = new Date();
				var base = Date.parse(date);
				//获取当前日
				var oneDay = 24 * 3600 * 1000;
				// 今日时间赋值给变量
				var daytimeArr = []
				for (var i = 0; i < 7; i++) {
					//前七天的时间
					var now = new Date(base -= oneDay);
					var myear = now.getFullYear();
					var month = now.getMonth() + 1;
					var mday = now.getDate()
					daytimeArr.push([myear, month > 10 ? month : '0' + month, mday > 10 ? mday : '0' + mday].join('-'))
				}
				return daytimeArr
			}
		}
	}
</script>

<style lang="scss" scoped>
	.check_view {
		width: 90%;
		margin: 0 auto;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		font-size: 12px;
	}

	.check_text {
		width: 90px;
		height: 25px;
		line-height: 25px;
		border: 1px solid #D9D9D9;
	}
	.scroll_view{
		padding: 10px 0;
		border-bottom: 1px solid #CCD5D6;
	}
	.col_view{
		font-weight: 500;
		text-align: center;
	}
	.check_time_text{
		color: #8A8A8A;
		font-weight: 500;
		margin-left: 5%;
		margin-top: 10px;
	}
	.check_button{
		width: 70px;
		height: 25px;
		background-color: #f4455d;
		border-radius: 3px;
		text-align: center;
		line-height: 25px;
		color: #fff;
		margin-left: 40px;
	}
</style>