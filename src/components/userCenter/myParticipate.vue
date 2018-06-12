<template>
	<div id="index">
		<myMenu></myMenu>
		<main id="panel">
			<div :class="['maskBox',isShowMask?'show':'hide']" @click="showSlideout"></div>
			<header>
				<span class="left" @click="showSlideout"></span>
				我的参与
			</header>
			<div class="container">
				<ul class='list'>
					<li v-for="data in list">
						<router-link :to="{path:'../Qdetail',query:{id:data.qid._id,title:data.qid.title,detail:data.qid.detail,creatTime:data.qid.createDate}}">
							<div class="imgbox">
								<img src="../../assets/image/listImg.jpg"/>
							</div>
							<div class="text">
								<div class="title lineBroke" v-text="data.qid.title"></div>
								<div class="detail lineBroke" v-text="data.qid.detail"></div>
								<div class="time">创建时间：{{data.qid.createDate}}</div>
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
				isNews:true,
				mySlideout:null,
				isShowMask:false,
				list:[]
			}
		},
		components: {
			myMenu
		},
		created() {
//			this.myfun.showLoad();
//			this.myfun.closeLoad();

			this.myfun.getAxios({path:'/admin/checkAnswer',getMethod:true},res=>{
				for (let i in res.list) {
					res.list[i].qid.createDate = this.myfun.timestampToTime(res.list[i].qid.createDate);
				}
				console.log(res);
				this.list = res.list;
			})
			this.$nextTick(() => {
				this.myfun.sliderOut();
//				console.log(this.myfun.mySlideout);
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