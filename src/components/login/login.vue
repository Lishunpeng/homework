<template>
	<div id="login">
		<header>
			<!--<span class="leftBack" @click="$router.back(-1)">返回</span>-->
			登录
			<span class="rightText"><router-link to="/login/register">注册</router-link></span>
		</header>
		
		<div class="msg">
			<div class="inputBox"><span>用户名：</span><input type="text" placeholder="请输入用户名" v-model="loginUsername"/></div>
			<div class="inputBox"><span>密&nbsp;&nbsp;&nbsp;&nbsp;码：</span><input type="password" placeholder="请输入密码"  v-model="loginPassword"/></div>
			<!--<span class="link"><router-link to="/login/forgetPsw">忘记密码?</router-link></span>-->
		</div>
		
		<div class="btn" @click="login">
			登录
		</div>
		<div class="link"><router-link to="/">返回首页</router-link></div>
	</div>
</template>

<script>
	import { MessageBox,Toast } from 'mint-ui';
	export default { 
  		name: 'login',
  		data(){
  			return{
  				loginUsername:"",//用户名
  				loginPassword:""//密码
  			}
  		},
  		created(){
  		},
 		methods: {
 			login(){
 				if(!this.loginUsername){
 					return	MessageBox('提示','账号不能为空！');
 				}
 				if(!this.loginPassword){
 					return	MessageBox('提示','密码不能为空！');
 				}
 				var postData = {
 					'name':this.loginUsername,
 					'pwd':this.loginPassword
 				}
 				var myobj = {path:'/admin/login?username='+this.loginUsername+'&password='+this.loginPassword};
   				this.myfun.getAxios(myobj,res=>{
   					this.$router.push({path:'/'});
   					return	Toast({message: res.msg,position: 'bottom',duration: 1000});
   				});
 			}
		}
	}
</script>

<style lang="less" scoped="scoped">
#login{
        @color:#ff6000;
        /*msg*/
       	.link{text-align: center;width: 100%;height: auto;overflow: hidden;}
        .link a{margin: 10px;color: #217ec3;}
        .msg{
        	.link a{float: right;}
            .inputBox{
            	border-bottom: 1px solid #e1e1e1;
                padding-left:30px;
                height: 90px;
                width: 100%;
                display: flex;
                span{flex: 2;line-height: 90px;}
                input{border: none;flex: 9;padding: 0 10px;margin-bottom: 2px;}
            }
            
            margin-top: 30px;
            background:#fff;
        } 
        .btn{margin-bottom: 20px;}
    }
</style>