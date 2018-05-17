<template>
	<div id="editUserName">
		<header>
			<span class="leftBack"  @click="$router.back(-1)">返回</span>
			编辑用户名
			<span class="rightText" @click="save">保存</span>
		</header>
		
		<div class="msg">
			<div class="inputBox"><span>编辑用户名：</span><input type="text" placeholder="请输入编辑用户名" v-model="editUserName"/></div>
			<div class="inputBox randomVerifi"><span>验证码：</span><input type="text" placeholder="请输入验证码" v-model="registerCode"/>
				<div class="imgbox">
					<!--<img :src="$ips+'/app/verificationCode?token='+getToken"  @click="changeRandomImg('#userImg')" id="userImg" title="图片加载中.." alt="图片加载中.."/>-->
					<!--<img :src="$ips+'/app/verificationCode?token='+getToken"  @click="changeRandomImg('#userImg')" id="userImg" title="图片加载中.." alt="图片加载中.."/>-->
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import { MessageBox, Toast } from 'mint-ui';
	export default { 
  		name: 'editUserName',
  		data(){
  			return{
  				editUserName:'测试用户名',//编辑用户名
  				registerCode:'',
  				getToken:''
  			}
  		},
  		created(){
//			this.getToken = localStorage.token;
//			this.editUserName = this.$route.query.attr;
  		},
 		methods: {
 			//保存
 			save:function(){
 				if(!this.editUserName || !this.registerCode){
 					return	MessageBox('提示','输入不能为空！');
 				}
 				var postData = {
 					substation_name:this.editUserName,
 					verificationCode:this.registerCode
 				}
 				this.myfun.postAxios({path:'/app/safeCenterSave'},postData,res=>{
 					return MessageBox('提示',res.msg).then(()=>{
 						this.$router.back(-1);
 					});
 				});
 				
 				
 			},
 			changeRandomImg:function(id){
   				$(id).attr('src',this.$ips+'/app/verificationCode?'+Math.random()+'?token='+ localStorage.token);
 			}
		}
}
</script>

<style lang="less" scoped="scoped">
#editUserName{
        @color:#ff6000;
       	.msg{
            .inputBox{
                padding:0 10px 0 30px;
                border-bottom: 2px solid #e1e1e1;
                height: 90px;
                width: 100%;
                display: flex;
                span{flex:4;line-height: 90px;}
                input{border: none;flex: 8;padding: 0 10px;margin-bottom: 2px;}
            }
            .randomVerifi{padding-right: 0;
            	input{flex: 4;}
            	.imgbox{flex: 4;img{width: 100%;height: 100%;}}
            }
            p{font-size: 20px;color: #898989;padding: 20px 30px;}
            margin-top: 30px;
            background:#fff;
        }  
    }
</style>