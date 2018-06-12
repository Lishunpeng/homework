<template>
	<div id="Qdetail">
		<header>
			<span class="leftBack" @click="$router.back(-1)">返回</span>
			问卷详情
			<span class="rightText" @click="save">保存</span>
		</header>
		<div class="container">
			<div class="title" v-text="titleData.title"></div>
			<div class="detail">
				 {{titleData.detail}}
				<p class="time" v-text="titleData.creatTime"></p>
			</div>
			<div class="tips">
				<div>
					<span style="background: #26A2FF;"></span>
					<p>代表你的选项</p>
				</div>
				<div>
					<span style="background: #ccc;"></span>
					<p>代表未作答</p>
				</div>
			</div>
			<ul class="content">
				<li v-for="(data,index) in answerList">
					<div class="chooseTitle">
						<span style="color: #FF0000;" v-text="'('+typeString[data.type]+')'"></span>&nbsp;&nbsp;{{index+1}}.{{data.title}}
					</div>
					<div class="answer" v-for="(answer,item) in data.answer"  v-if="data.type==0 || data.type==3" @click="data.type==0?chooseMoreAnswer(index,item):chooseAnswer(index,item)">
						<span :class="answer.myAnswer?'myAnswer':''">{{answerString[item]}}</span>{{answer.title}}
					</div>
					<div v-if="data.type==1" class="answer judey">
						<span :class="data.myAnswer==1&&data.myAnswer!=-1?'myAnswer':''" @click="chooseJudey(index,1)">√</span>是
						<span :class="data.myAnswer==0&&data.myAnswer!=-1?'myAnswer':''" @click="chooseJudey(index,0)">×</span>否
					</div>
					<div v-if="data.type==2" class="answer write">
						<textarea name="" rows="" cols="" v-model="data.myAnswer"></textarea>
					</div>
					
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {MessageBox,Toast} from 'mint-ui';
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
//				answerList:[
//					{title:'您觉得南区住的舒不舒服',type:0,answer:[{title:'舒服',myAnswer:0},{title:'不舒服',myAnswer:0},{title:'一般般',myAnswer:0}]},
//					{title:'您觉得学校老师教书质量如何',type:0,answer:[{title:'好',myAnswer:0},{title:'特别好',myAnswer:0},{title:'非常好',myAnswer:0}]},
//					{title:'你喜欢吃饭堂什么菜',type:3,answer:[{title:'青菜',myAnswer:0},{title:'煎蛋',myAnswer:0},{title:'红豆炒绿豆',myAnswer:0},{title:'土豆炒马铃薯',myAnswer:0},{title:'番茄炒西红柿',myAnswer:0},{title:'百草枯炒砒霜',myAnswer:0}]},
//					{title:'您是否同意开发者帅',type:1,myAnswer:-1},
//					{title:'您是如何看待这款APP，请阐述您的意见（50个字左右）',type:2,myAnswer:''}
//				],
				answerList:[],
				answerString:'ABCDEFGHIJKLNMOPQRSTUVWXYZ',
				typeString:['选择题','判断题','填空题','多选题'],
				getId:''
			}
		},
		created(){
			this.getId = this.$route.query.id;
			this.titleData.title = this.$route.query.title;
			this.titleData.detail = this.$route.query.detail;
			this.titleData.creatTime = this.$route.query.creatTime;
			this.myfun.getAxios({path:'/admin/questionDetail?id='+this.getId},res=>{
				console.log(res);
				for (let i in res.opts) {
					for (let j in res.opts[i].answer) {
						res.opts[i].answer[j].myAnswer = 0;
					}
					if(res.opts[i].type==1){
						res.opts[i].myAnswer = -1;
					}
				}
				
				this.answerList = res.opts;
			})
		},
		methods:{
			//多选题题选中选项
			chooseAnswer(index,val){
				this.answerList[index].answer[val].myAnswer = !this.answerList[index].answer[val].myAnswer;
			},
			//单选题
			chooseMoreAnswer(index,val){
				for (let i in this.answerList[index].answer) {
					this.answerList[index].answer[i].myAnswer = 0;
				}
				this.answerList[index].answer[val].myAnswer = 1
			},
			chooseJudey(index,val){
				console.log(index)
				this.answerList[index].myAnswer = val;
			},
			//保存
			save(){
				let postData = [];
				for (let i in this.answerList) {
					let obj = {};
					if(this.answerList[i].type==0){
						if(!this.answerList[i].answer.length){
							return Toast('信息未填写完全！');
						}
						for (let j in this.answerList[i].answer) {
							if(this.answerList[i].answer[j].myAnswer){
								obj = {type:this.answerList[i].type,id:this.answerList[i]['_id'],value: this.answerList[i].answer[j].value};				
							}
						}
					}
					else if(this.answerList[i].type==1){
						if(this.answerList[i].myAnswer==-1){
							return Toast('信息未填写完全！');
						}
						obj = {type:this.answerList[i].type,id:this.answerList[i]['_id'],value: this.answerList[i].myAnswer};
					}
					else if(this.answerList[i].type==2){
						if(!this.answerList[i].myAnswer){
							return Toast('信息未填写完全！');
						}
						obj = {type:this.answerList[i].type,id:this.answerList[i]['_id'],content: localStorage.userName+':'+this.answerList[i].myAnswer}
					}
					else if(this.answerList[i].type==3){
						let myArray = [];
						for (let j in this.answerList[i].answer) {
							this.answerList[i].answer[j].myAnswer?myArray.push(this.answerList[i].answer[j].value):'';						
						}
						if(!myArray.length){
							return Toast('信息未填写完全！');
						}
						obj = {type:this.answerList[i].type,id:this.answerList[i]['_id'],value:myArray};
					}
					postData.push(obj);
				}
				
				let postObj = {
					qid:this.getId,
					opts:postData
				}
				console.log(postObj);
				this.myfun.postAxios({path:'/admin/choose'},postObj,res=>{
					console.log(res);
					MessageBox('提示',res.msg).then(()=>{
						this.$router.back(-1);
					});
				})
			}
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
			.title{font-size: 35px;font-weight: bold;color: #26A2FF;line-height: 50px;height: auto;}
			.detail{font-size: 30px;color: #1b1b1b;line-height: 35px;height: auto;margin-top: 10px;padding-top:10px;border-top:2px dashed #E1E1E1 ;
				.time{text-align: right;color: #999999;}
			}
			.content{height: auto;margin-top: 20px;border-top:10px solid #b6ddfb;padding-top: 20px;
				li{border-bottom:2px solid #e1e1e1;height: auto;margin-top: 20px;
					.chooseTitle{font-size: 32px;color: #1b1b1b;line-height: 30px;height: auto;}
					.answer{margin: 20px 0;height: auto;transition: all 0.3s;
						span{color: #fff;display: inline-block;width: 50px;height: 50px;background: #e1e1e1;border-radius:50px;text-align: center;line-height: 50px;margin-right: 20px;}
						&:active{background: #E1E1E1;}
					}					
					.answer span.myAnswer{background: #26A2FF;}
					.judey span+span{margin-left: 100px;}
					.write textarea{height: auto;min-height: 120px;width: 100%;border: 3px solid #e1e1e1;padding: 20px;line-height: 50px;}
				}
			}
		}
	}
</style>