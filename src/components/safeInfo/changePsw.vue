<template>
	<div id="changePsw">
		<header>
			<span class="leftBack" @click="$router.back(-1)">返回</span>
			更改密码
			<span class="rightText" @click="save">保存</span>
		</header>
		
		<div class="msg">
			<div class="inputBox"><span>旧&nbsp;&nbsp;密&nbsp;&nbsp;码：</span><input type="text" placeholder="请输入旧密码" v-model="oldPwd"/></div>
			<div class="inputBox"><span>新&nbsp;&nbsp;密&nbsp;&nbsp;码：</span><input type="password" placeholder="请输入新密码"  v-model="newPwd"/></div>
			<div class="inputBox"><span>确认密码：</span><input type="password" placeholder="请输入确认密码密码"  v-model="newPwdAgain"/></div>
		</div>
	</div>
</template>

<script>
	import { MessageBox,Toast } from 'mint-ui';
	export default { 
  		name: 'changePsw',
  		data(){
  			return{
  				oldPwd:'',
  				newPwd:'',
  				newPwdAgain:''
  			}
  		},
 		methods: {
 			save(){
 				if (!this.oldPwd || !this.newPwd || !this.newPwdAgain) {
 					MessageBox('提示','输入信息不能为空！');
 				}
 				var postData = {
 					oldPassword:this.oldPwd,
 					newPassword:this.newPwd,
 					newPassword2:this.newPwdAgain
 				}
 				
 				this.myfun.postAxios({path:'/app/safeCenterSave'},postData,res=>{
 					return MessageBox('提示',res.msg).then(()=>{
 						this.$router.back(-1);
 					})
 				});
 				
 				
 			}
 			
 			
 			
 			
		}
	}
</script>

<style lang="less" scoped="scoped">
#changePsw{
        @color:#ff6000;
        /*msg*/
        .msg{
        	.link a{float: right;margin: 10px;color: #217ec3;}
            .inputBox{
            	border-bottom: 2px solid #e1e1e1;
                padding-left:30px;
                height: 90px;
                width: 100%;
                display: flex;
                span{flex: 2;line-height: 90px;}
                input{border: none;flex: 6;padding: 0 10px;margin-bottom: 2px;}
            }
            margin-top: 30px;
            background:#fff;
        } 
    }
</style>