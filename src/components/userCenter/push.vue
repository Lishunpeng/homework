<template>
	<div id="index">
		<header>
			<span class="leftBack" @click="$router.back(-1)">返回</span> 发布问卷
			<span class="rightText" @click="save">保存</span>
		</header>
		<div class="msg">
			<p style="color: #ff0000;">提示：点击添加追加问题题目。</p>
			<div class="Qheader">
				<form>
					<div class="Qimgbox"><span>上传封面图片：</span>
						<div class="imgbox">
							<!--<img src=""/>-->
							<input type="file" name="verifright" accept="image/*"  @change="postImg($event)"/>
						</div>
					</div>
				</form>	
				<div class="Qtitle">
					<div class="tips">题目：</div><div class="inputBox"><input type="text" placeholder="请填写问卷标题" v-model="Qtitle"/></div>
				</div>
				<div class="Qdetail">
					<div class="tips">详情：</div><div class="inputBox"><input type="text" placeholder="请填写问卷标题"  v-model="Qdetail"/></div>
				</div>
				<div class="Qtitle">
					<div class="tips">结束：</div>
					<div class="inputBox">
						<mt-datetime-picker v-model="pickerValue"  ref="picker" :startDate="_startDate" :endDate="_endTime" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleChange">
						</mt-datetime-picker>
						<input type="text" placeholder="请选择成立时间"  v-model="endTime" @click="myshow('#setTime')" id="setTime" readonly="readonly"/>
					</div>
				</div>
				
			</div>
			<div class="QBox">
				<div v-for="(data,index) in addData">
					<div class="Qjudey" v-if="data.type==1">
						<div class="header"><span class="judey"></span>判断题<i @click="myDelete(index)"></i></div>
						<div class="title">
							<input type="text"  value="" placeholder="请输入题目。" v-model="data.title"/>
						</div>
						<!--<ul class="QjudeyContent">
							<li :class="['left',data.answer==1?'active':'']" @click="judey(index,1)">对</li>
							<li :class="['right',data.answer==0?'active':'']" @click="judey(index,0)">错</li>
						</ul>-->
						<!--<div class="complete" @click="complete(index)">完成</div>-->
					</div>
					<div class="Qchoose" v-else-if="data.type==0 || data.type==3">
						<div class="header">
							<span :class="data.type==0?'choose':'chooseMore'"></span>
							{{data.type==0?'单选题':'多选题'}}<i @click="myDelete(index)"></i></div>
						<div class="title">
							<input type="text"  value="" placeholder="请输入题目。" v-model="data.title"/>
						</div>
						<ul class="QchooseContent">
							<div class="add" @click="addChoose(index)"><span></span>添加选项</div>
							<li v-for="(list,listIndex) in data.answer">
								<span v-text="chooseStr[list.value]"></span>
								<input type="text" placeholder="请输入问题题目" v-model="list.title"/>
								<i class="reduce" @click="deleteChoose(index,listIndex)"></i>
							</li>
							<!--<div class="complete" @click="complete(index)">完成</div>-->
						</ul>
					</div>
					<div class="Qchoose" v-else-if="data.type==2">
						<div class="header"><span class="write"></span>填空题<i @click="myDelete(index)"></i></div>
						<div class="title">
							<input type="text"  value="" placeholder="请输入题目。" v-model="data.title"/>
						</div>
						<ul class="QchooseContent">
							<!--<div class="complete" @click="complete(index)">完成</div>-->
						</ul>
					</div>
				</div>
			</div>
			<div class="btn" @click="showSheet">
				<span class="icon"></span> 添加
			</div>
		</div>
		<mt-actionsheet  :actions= "data"  v-model="sheetVisible"></mt-actionsheet>
	</div>
</template>

<script>
	import { MessageBox, Toast, Actionsheet } from 'mint-ui';
	import myMenu from '../menu.vue';
	export default {
		name: 'index',
		data() {
			return {
				isShowMask:false,
				data: [{
					name: '添加单选题目',
					method:()=>{this.choose(0)}
				},
				{
					name: '添加判断题目',
					method:()=>{this.choose(1)}
				},
				{
					name: '添加填写题目',
					method: ()=>{this.choose(2)}
				},
				{
					name: '添加多选题目',
					method: ()=>{this.choose(3)}
				}
				],
				sheetVisible: false,
				addData:[],//题目选项
				chooseStr:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
				timeData:'',
  				_startDate:'',
  				_endTime:'',
  				pickerValue:null,
  				endTime:'',
  				Qtitle:'',//问卷标题
  				Qdetail:'',//问卷详情
			}
		},
		components: {
			myMenu
		},
		created() {
			this.pickerValue = new Date();
			this._endTime = new Date('2100-01-01');
			this._startDate = new Date();
		},
		methods: {
			showSheet(){
				this.sheetVisible = true;
			},
			choose(val){
				switch (val){
					case 0:this.addData.push({type:0,answer:[],title:''});
						break;
					case 1:this.addData.push({type:1,title:''});
						break;
					case 2:this.addData.push({type:2,title:''});
						break;	
					case 3:this.addData.push({type:3,answer:[],title:''});	
						break;	
					default:
						break;
				}
			},
			judey(index,val){
				this.addData[index].answer = val;
			},
			//添加选项
			addChoose(val){
				var dataLength = this.addData[val].answer.length;
				if(dataLength+1>this.chooseStr.length){
					return MessageBox('提示','选项不能超过26个！');
				}
				this.addData[val].answer.push({value:dataLength,title:''});
			},
			//删除题目
			myDelete(val){
				MessageBox.confirm('确定删除吗？', '提示').then(()=>{
					Toast('删除成功！');
					this.addData.splice(val,1);
				}).catch(()=>{
					Toast('你取消了删除！');
				});
			},
			//删除选择题选项
			deleteChoose(index,listIndex){
				MessageBox.confirm('确定删除吗？', '提示').then(()=>{
					Toast('删除成功！');
					this.addData[index].answer.splice(listIndex,1);
					for(let i in this.addData[index].answer){
						this.addData[index].answer[i].value = this.chooseStr[i];
					}
				}).catch(()=>{
					Toast('你取消了删除！');
				});
			},
			//保存
			save(){
				if(!this.Qtitle || !this.Qdetail || !this.endTime){
					return MessageBox('提示','问卷信息不能为空！');
				}else if(!this.addData.length){
					return MessageBox('提示','至少添加一条题目 ！');
				}
				for(let i in this.addData){
					if(!this.addData[i].title){
						return MessageBox('提示','题目标题不能为空！');
					}
					else if(this.addData[i].type==0 || this.addData[i].type==3){
						if(this.addData[i].answer.length==0){
							return MessageBox('提示','选择题至少要有一个选项！');
						}
						for (let j in this.addData[i].answer) {
							if(!this.addData[i].answer[j].title){
								return MessageBox('提示','选择题选项题目不能为空！');
							}
						}
					}
				}
				var postlist = {title:this.Qtitle,detail:this.Qdetail,endDate:this.endTime,opts:this.addData};
				console.log(JSON.stringify(postlist,null,'--'));
				this.myfun.postAxios({path:'/admin/addlist'},postlist,res=>{
					MessageBox('提示',res.msg).then(()=>{
						this.$router.back(-1);
					});
				})
			},
			//时间选择器
			handleChange(){
 				this.endTime = this.myfun.getMyDate(this.pickerValue);
 			},
 			//显示地址
			myshow(id){
				this.$refs.picker.open();
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
	#index {
		@color: #ff6000;height: auto;overflow: auto;
		/*msg*/
		.Qimgbox{margin-top: 20px;border-bottom: 2px solid #E1E1E1;height: auto;overflow:hidden;padding-bottom: 20px;
			>span{display: block;float: left;width: 250px;height: 150px;line-height: 150px;}
			.imgbox{position: relative;width: 150px;height: 150px;border: 2px solid #26A2FF;float: left;background: url(../../assets/image/addImg.png) no-repeat center; background-size: 70% 70%;
				input{position: absolute;left: 0;top: 0;height: 100%;width: 100%;opacity: 0;}
			}
		}
		.Qheader{height: auto;width: 100%;
			>div{height: 90px;width: 100%;display: flex;border-bottom: 2px solid #E1E1E1;
				.tips{flex: 2;text-align: center;line-height: 90px;}
				.inputBox{flex: 8;input{width: 100%;height: 100%;border: none;padding: 10px;}}
			}
		}
		.msg {
			padding: 30px;
			/*.complete{&:active{background: #217EC3;}margin: 20px auto;transition: background-color 0.3s;width: 250px;height: 80px;background: #26A2FF;color: #fff;border-radius:10px;font-size: 32px;line-height: 80px;text-align: center;}*/
			.QBox{height: auto;
				#public(){height: auto;margin-top: 20px;}
				.Qjudey,.Qchoose{#public;
					.header{border-bottom: 5px solid #26A2FF;color: #26A2FF;height: 80px;
						#icon(){width: 60px;height: 60px;border-radius:50%;display: inline-block;position: relative;top: 10px;background:no-repeat #26A2FF center;background-size:60% 60%;}
						span{#icon;margin-right: 20px;}
						span.judey{background-image:url(../../assets/image/judey.png);}
						span.choose{background-image:url(../../assets/image/chooseIcon.png);}
						span.chooseMore{background-image:url(../../assets/image/chooseMoreIcon.png);}
						span.write{background-image:url(../../assets/image/writeIcon.png);}
						i{#icon;background-image:url(../../assets/image/delete.png);float: right;background-color:transparent;
							&:active{background-color: #E1E1E1;}
						}
					}
					.title{height: auto;font-size: 40px;color: #656B79;line-height: 50px;padding: 20px 0;border-bottom: 2px solid #E1E1E1;
						input{width: 100%;height: 100%;border: none;}
					}
					#QContent(){height: 100px;width: auto;margin-top: 20px;border-bottom: 5px solid #e1e1e1;padding-bottom: 20px;}
					/*.QjudeyContent{#QContent;
						li{color: #26A2FF;float: left;width: 130px;height: 100%;border-radius:80px;border:2px solid #26A2FF;text-align: center;line-height: 70px;font-size: 35px;}
						li.left{border-radius: 80px 0 0 80px;border-right:0px;}
						li.right{border-radius: 0 80px 80px 0;}
						li.active{background: #26A2FF;color: #fff;}
					}*/
					.QchooseContent{#QContent;height:auto;
						.add{transition: background-color 0.3s;width: 250px;height: 80px;background: #26A2FF;color: #fff;border-radius:10px;font-size: 32px;line-height: 80px;text-align: center;
							span {background: url(../../assets/image/addChoose.png) no-repeat;background-size: 100% 100%;display: inline-block;width: 40px;height: 40px;position: relative;top: 10px;margin-right: 10px;}
							&:active{background: #217EC3;}
						}
						li{height: 80px;width: 100%;border-bottom: 2px solid #E1E1E1;position: relative;
							#icon(){display: block;position: absolute;top: 10px;}
							span{#icon;left: 0px;width: 60px;height: 60px;background: #26A2FF;color: #fff;font-size: 32px;font-weight: bold;text-align: center;line-height: 60px;border-radius:50%;}
							input{border: none;height: 100%;display: inline-block;width: 100%;padding-left: 80px;}
							i{#icon;background:  no-repeat center;background-size:100% 100%;width: 40px;height: 40px;left: auto;&:active{background-color: #e1e1e1;}}
							i.reduce{background-image: url(../../assets/image/reduce.png);right: 20px;top: 20px;}
							/*i.unRight{background-image: url(../../assets/image/unQ.png);right: 80px;top: 20px;}*/
							/*i.isRight{background-image: url(../../assets/image/isQ.png);right: 80px;top: 20px;}*/
						}
					}
				}
			}
			.btn {
				transition: background-color 0.3s;
				width: 100%;
				margin-top: 50px;
				background: #fff;
				border: 3px solid #26A2FF;
				color: #26A2FF;
				&:active {
					background: #cce9ff;
				}
				span {
					background: url(../../assets/image/addIcon.png) no-repeat;
					background-size: 100% 100%;
					display: inline-block;
					width: 40px;
					height: 40px;
					position: relative;
					top: 6px;
				}
			}
		}
	}
</style>