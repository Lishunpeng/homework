<template>
	<div id="index">
		<myMenu></myMenu>
		<main id="panel">
			<div :class="['maskBox',isShowMask?'show':'hide']" @click="showSlideout"></div>
			<header>
				<span class="left" @click="showSlideout"></span>
				我的收藏
			</header>
			<div class="container">
				<ul class='list'>
					<li>
						<router-link to="../Qdetail">
							<div class="imgbox">
								<img src="../../assets/image/listImg.jpg"/>
							</div>
							<div class="text">
								<div class="title lineBroke">2关于您对嘉应学院的看法关于您对嘉应学院的看法关于您对嘉应学院的看法关于您对嘉应学院的看法</div>
								<div class="detail lineBroke">2关于您对嘉应学院的看法关于您对嘉应学院的看法关于您对嘉应学院的看法关于您对嘉应学院的看法</div>
								<div class="time">创建时间：2017-01-01</div>
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
	import myMenu from '../menu.vue';
	export default {
		name: 'index',
		data() {
			return {
				mySlideout:null,
				isShowMask:false
			}
		},
		components: {
			myMenu
		},
		created() {
			this.$nextTick(() => {
				this.myfun.sliderOut();
			});
		},
		methods: {
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
			.list{height: auto;padding: 0 30px;
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