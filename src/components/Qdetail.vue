<template>
	<div id="Qdetail">
		<header>
			<span class="leftBack" @click="$router.back(-1)">返回</span>
			问卷详情
		</header>
		<div class="container">
			<div class="title" v-text="titleData.title"></div>
			<div class="detail">
				 {{titleData.detail}}
				<p class="time" v-text="titleData.creatTime"></p>
			</div>
			<!--<div class="tips">
				<div>
					<span style="background: #26A2FF;"></span>
					<p>代表你的选项</p>
				</div>
				<div>
					<span style="background: #ccc;"></span>
					<p>代表未作答</p>
				</div>
			</div>-->
			<ul class="content">
				<li v-for="(data,index) in answerList">
					<div class="chooseTitle">
						<span style="color: #FF0000;" v-text="'('+typeString[data.type]+')'"></span>&nbsp;&nbsp;{{index+1}}.{{data.title}}
					</div>
					<div class="answer" v-for="(answer,item) in data.answer"  v-if="data.type==0 || data.type==3">
						<span :class="answer.myAnswer?'myAnswer':''">{{answerString[answer.value]}}</span>{{answer.title}}
					</div>
					<div class="countBox" v-if="data.type==0 || data.type==3">
						<div class="countHead">
							<span class="icon"></span>
							选项统计
						</div>					
						<div class="count" v-for="(answer,item) in data.answer"  >
							<span>选项{{answerString[answer.value]}}：（{{answer.count}}票）</span>
							<div>
								<p :style="{width:answer.areaCount*100+'%'}"></p>
							</div>
							<i>{{answer.areaCount*100}}%</i>
						</div>
					</div>
					
					<div v-if="data.type==1" class="answer judey">
						<!--<span :class="data.myAnswer?'myAnswer':''">√</span>是
						<span :class="!data.myAnswer?'myAnswer':''">×</span>否-->
					</div>
					<div class="countBox" v-if="data.type==1">
						<div class="countHead">
							<span class="icon"></span>
							判断统计
						</div>					
						<div class="count" v-for="answer in data.answer">
							<span>{{answer.title}}√：（{{answer.count}}票）</span>
							<div>
								<p :style="{width:answer.areaCount*100+'%'}"></p>
							</div>
							<i>{{answer.areaCount*100}}%</i>
						</div>
					</div>
					<div v-if="data.type==2" class="answer write">
						<p v-for="item in data.content" v-text="item"></p>
					</div>
					 
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Qdetail',
		data(){
			return{
				titleData:{},
//				answerList:[
//					{title:'您觉得南区住的舒不舒服',type:0,answer:[{title:'舒服'},{title:'不舒服'},{title:'一般般'}]},
//					{title:'您觉得学校老师教书质量如何',type:0,answer:[{title:'好'},{title:'特别好'},{title:'非常好'}]},
//					{title:'您是否同意开发者帅',type:1},
//					{title:'您是如何看待这款APP，请阐述您的意见（50个字左右）',type:2}
//				],
				/*answerList:[
					{title:'您觉得南区住的舒不舒服',type:0,answer:[{title:'舒服',myAnswer:1},{title:'不舒服',myAnswer:0},{title:'一般般',myAnswer:0}]},
					{title:'您觉得学校老师教书质量如何',type:0,answer:[{title:'好',myAnswer:1},{title:'特别好',myAnswer:0},{title:'非常好',myAnswer:0}]},
					{title:'你喜欢吃饭堂什么菜',type:3,answer:[{title:'青菜',myAnswer:1},{title:'煎蛋',myAnswer:0},{title:'红豆炒绿豆',myAnswer:1},{title:'土豆炒马铃薯',myAnswer:1},{title:'番茄炒西红柿',myAnswer:1},{title:'百草枯炒砒霜',myAnswer:1}]},
					{title:'您是否同意开发者帅',type:1,myAnswer:1},
					{title:'您是如何看待这款APP，请阐述您的意见（50个字左右）',type:2,myAnswer:'n你猜我写可；安静的联发科就好啦是的开关就流口水的合格率'}
				],*/
				answerList:[],
				answerString:'ABCDEFGHIJKLNMOPQRSTUVWXYZ',
				typeString:['单选题','判断题','填空题','多选题'],
				getId:'',
			}
		},
		created(){
			this.getId = this.$route.query.id;
			this.titleData.title = this.$route.query.title;
			this.titleData.detail = this.$route.query.detail;
			this.titleData.creatTime = this.$route.query.creatTime;
			this.myfun.getAxios({path:'/admin/questionDetail?id='+this.getId,reWrite:true},res=>{
				console.log(res.opts,'errcode');
				for (let i in res.opts) {
					console.log(111);
					if(res.opts[i].answer.length){
						var allSum = 0;
						for (let j in res.opts[i].answer) {
							allSum+=res.opts[i].answer[j].count;
						}
						for (let k in res.opts[i].answer) {
							
							allSum?res.opts[i].answer[k].areaCount = (res.opts[i].answer[k].count/allSum):res.opts[i].answer[k].areaCount=0;
							res.opts[i].answer[k].areaCount = res.opts[i].answer[k].areaCount.toFixed(3);
							console.log(res.opts[i].answer[k].areaCount,'res.opts[i].answer[k].areaCount');
						}
					}
				}
				console.log(res.opts,'res.opts');
				this.answerList = res.opts;
			})
		},
		methods:{
			
		}
	}
</script>

<style lang="less">
	#Qdetail{
		.container{
			.tips{width: 100%;height: auto;padding: 20px;
				div{width: 100%;overflow: hidden;height: auto;
					p{float: right;}
					span{width: 40px;height: 30px;background: #FF0000;margin-left: 30px;display: block;float: right;}
				}
			}
			padding: 10px 20px;height:auto;
			.title{font-size: 35px;font-weight: bold;color: #26A2FF;line-height: 50px;height: auto;text-align: center;}
			.detail{font-size: 30px;color: #1b1b1b;line-height: 35px;height: auto;margin-top: 10px;padding-top:10px;border-top:2px dashed #E1E1E1 ;
				.time{text-align: right;color: #999999;}
			}
			.content{height: auto;margin-top: 20px;border-top:10px solid #b6ddfb;padding-top: 20px;
				li{border-bottom:2px solid #e1e1e1;height: auto;margin-top: 20px;
					.chooseTitle{font-size: 32px;color: #1b1b1b;line-height: 30px;height: auto;}
					.answer{span{color: #fff;display: inline-block;width: 50px;height: 50px;background: #e1e1e1;border-radius:50px;text-align: center;line-height: 50px;margin-right: 20px;}margin: 20px 0;height: auto;}					
					.answer span.myAnswer{background: #26A2FF;}
					.answer>p{word-break: break-word;margin: 10px 0;color: #666666;}
					.judey span+span{margin-left: 100px;}
					.write textarea{height: auto;min-height: 120px;width: 100%;border: 3px solid #e1e1e1;padding: 20px;line-height: 50px;}
					.countBox{height: auto;position:relative;padding-bottom: 15px;}
					.count{height: 50px;width: 100%;display: flex;margin-top: 15px;
						span{color: #666666;font-size: 27px;line-height: 50px;display: block;flex:4;}
						>div{flex: 6;background: #E1E1E1;height: 30px;margin-top: 10px;border-radius:30px;
							p{height: 100%;width: 10%;border-radius:30px;background: #26A2FF;}
						}
						i{flex: 1;display: block;line-height: 50px;font-size: 27px;color: #217EC3;text-align: center;}
					}
					.countHead{border-bottom: 2px solid #217EC3;color: #217EC3;font-size: 30px;font-weight: bold;padding-left: 50px;height: 50px;line-height: 50px;
						span{background: url(../assets/image/countIcon.png);width: 40px;height: 40px;position:absolute;background-size:100% 100%;left: 0px;top: 3px;}
					}
				}
			}
		}
	}
</style>