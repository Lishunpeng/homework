<template>
	<div id="index">
		<myMenu></myMenu>
		<main id="panel">
			<div :class="['maskBox',isShowMask?'show':'hide']" @click="showSlideout"></div>
			<header>
				<span class="left" @click="showSlideout"></span>
				<div class="center">
					<div :class="['new',isNews?'active':'']" @click="changePage(true)">最新问卷</div>
					<div :class="['end',!isNews?'active':'']" @click="changePage(false)">过期问卷</div>
				</div>
				<!--<router-link to="/safeInfo/safeCenter">			
					<span class="right"></span>
				</router-link>	-->
			</header>
			<div class="container">
				<div class="banner">
					<img src="../assets/image/banner.png"/>
				</div>
				<ul :class="['list',isNews?'active':'']">
					<li v-for="data in noendList">
						<router-link :to="{path:'/Qwrite',query:{id:data._id,title:data.title,detail:data.detail,creatTime:data.createDate}}">
							<div class="imgbox">
								<img src="../assets/image/listImg.jpg"/>
							</div>
							<div class="text">
								<div class="title lineBroke" v-text="data.title"></div>
								<div class="detail lineBroke" v-text="data.detail"></div>
								<div class="time">创建时间：{{data.createDate}}</div>
							</div>
						</router-link>
					</li>
				</ul>
				<!--<ul :class="['list',isNews?'active':'']">
					<li>
						<router-link to="Qwrite">
							<div class="imgbox">
								<img src="../assets/image/listImg.jpg"/>
							</div>
							<div class="text">
								<div class="title lineBroke">1关于您对嘉应学院的看法关于您对嘉应学院的看法关于您对嘉应学院的看法关于您对嘉应学院的看法</div>
								<div class="detail lineBroke">1关于您对嘉应学院的看法关于您对嘉应学院的看法关于您对嘉应学院的看法关于您对嘉应学院的看法</div>
								<div class="time">创建时间：2017-01-01</div>
							</div>
						</router-link>
					</li>
				</ul>-->
				<ul :class="['list',!isNews?'active':'']">
					<li v-for="data in endList">
						<router-link :to="{path:'/Qdetail',query:{id:data._id,title:data.title,detail:data.detail,creatTime:data.createDate}}">
							<div class="imgbox">
								<img src="../assets/image/listImg.jpg"/>
							</div>
							<div class="text">
								<div class="title lineBroke" v-text="data.title" style="color: #666666;"></div>
								<div class="detail lineBroke" v-text="data.detail"></div>
								<div class="time">创建时间：{{data.createDate}}</div>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		</main>
	</div>
</template>

<script>
	import { Swipe, SwipeItem,Indicator } from 'mint-ui';
	import myMenu from './menu.vue';

	export default {
		name: 'index',
		data() {
			return {
				isNews:true,
				isShowMask:false,
				endList:[],
				noendList:[]
			}
		},
		components: {
			myMenu
		},
		created() {
//			this.myfun.showLoad();
//			this.myfun.closeLoad();
			var getNowTime = this.myfun.timeToTimestamp();
			this.myfun.getAxios({path:'/admin/questionList',getMethod:true},res=>{
				for (let i in res.list) {
					
					res.list[i].createDate = this.myfun.timestampToTime(res.list[i].createDate);
					parseInt(getNowTime)<=parseInt(res.list[i].endDate)?this.noendList.push(res.list[i]):this.endList.push(res.list[i]);
				}
				console.log(this.noendList,'this.noendList');
				console.log(this.endList,'this.endList');
			});
			this.$nextTick(() => {
				this.myfun.sliderOut();
				this.myfun.getAxios({path:'/admin/list',getMethod:true},res=>{
					console.log(res);
				});
			});
		},
		methods: {
			changePage(bool){
				this.isNews = bool;
			},
			showSlideout(){
				this.myfun.showSlideout(this);
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	#index {
		#panel .center{background: #fff;
			div{height: 100%;width: 50%;float: left;font-size: 25px;color: #fff;font-weight: bold;line-height: 45px;background: #26A2FF;color: #fff;}
			div.new{border-radius:50px 0 0 50px;}
			div.end{border-radius:0 50px 50px 0;}
			div.active{background: #fff;color: #26A2FF;}
		}
		.container{
			background: #fff;
			.banner{height: auto;width: 100%;img{width: 100%;}}
			.list{height: auto;padding: 0 30px;display: none;
				li{height: auto;width: 100%;border-bottom:2px solid #e1e1e1;padding: 10px 0;transition: all 0.3s linear;overflow: hidden;
					.imgbox{height: auto;ackground: #0000FF;width: 20%;float: left;img{width: 100%;}}
					.text{height: auto;width: 77%;float: left;margin-left: 3%;
						.title{color: #26A2FF;font-weight: bold;font-size: 33px;}
						.detail{font-size: 25px;margin-top: 20px;}
						.time{color: #888888;font-size: 25px;margin-top: 10px;text-align: right;padding-right: 20px;}
					}
					
					&:active{background: #e1e1e1;}
				}
			}
			.active{display: block;}
		}
	}
</style>