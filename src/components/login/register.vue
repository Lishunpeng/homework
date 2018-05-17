<template>
	<div id="register">
	<header>
			<span class="leftBack" @click="$router.back(-1)">返回</span>
			注册
			<!--<span class="right">注册</span>-->
		</header>

		<div class="msg">
			<div class="inputBox"><span>手机号码：</span><input type="text" placeholder="请输入手机号码" v-model="login_username" /></div>
			<div class="inputBox"><span>输入密码：</span><input type="password" placeholder="请输入密码" v-model="login_password" /></div>
			<div class="inputBox"><span>确认密码：</span><input type="password" placeholder="请输入密码" v-model="login_password_replace" /></div>
			<div class="inputBox emailBox"><span>短信认证：</span><input type="text" placeholder="请输入验证码" v-model="login_verifi" />
				<span :class="['btn',isverClick?'btn_click':'']" @click="verifi" v-text="'发送'"></span>
			</div>
		</div>
		<div class="btn" @click="register">
			注册
		</div>
	</div>
</template>

<script>
	import { MessageBox, Toast } from 'mint-ui';
	export default {
		name: 'register',
		data() {
			return {
				mytime: 120,
				isverClick: false, //是否点击
				login_username: "", //用户名
				login_password: "", //密码
				login_password_replace: "", //重复密码密码
				login_verifi: "", //验证码
				isregClick:false,//注册按钮是否点击
			}
		},
		methods: {
			register() {
				if(!this.login_username || !this.login_password || !this.login_verifi || !this.login_password_replace) {
					return MessageBox('提示', '信息不能为空！');
				}
				if(!this.$phone.test(this.login_username)) {
					return MessageBox('提示', '手机格式不正确！');
				}
				if(this.login_password != this.login_password_replace) {
					return MessageBox('提示', '两次密码不相同！');
				}
				this.isregClick = true;
				var postData = {
					'substationPhone': this.login_username,
					'pwd': this.login_password,
					'repeatPwd': this.login_password_replace,
					'code': this.login_verifi
				}
				var that = this;
				var myobj = {path:'/app/registered'};
				this.myfun.postAxios(myobj,postData,res=>{
					return MessageBox('提示', res.msg).then(res=>{
 						this.myfun.backLink(this);
					});
				});
			},
			verifi() {
				if(this.isverClick) {
					return;
				}
				if(!this.login_username) {
					return MessageBox('提示', '手机不能为空！');
				}
				if(!this.$phone.test(this.login_username)) {
					return MessageBox('提示', '手机格式不正确！');
				}
				var myobj = {path:'/app/getVerificationCode/'+this.login_username,isVer:true};
				this.myfun.send_verifi(this,myobj);
				

			}
			
		}

	}
</script>

<style lang="less" scoped="scoped">
	#register {
		@color: #ff6000;
		/*msg*/
		.msg {
			.inputBox {
				padding: 0 10px 0 30px;
				border-bottom: 2px solid #e1e1e1;
				height: 90px;
				width: 100%;
				display: flex;
				span {
					flex: 2.5;
					line-height: 90px;
				}
				input {
					border: none;
					flex: 8;
					padding: 0 10px;
					display: block;
					margin-bottom: 2px;
				}
			}
			.emailBox {
				input {
					flex: 5;
					display: block;
				}
				span {
					flex: 4;
				}
				.btn {
					flex: 3;
					margin: 10px;
					height: 70px;
					line-height: 70px;
				}
			}
			margin-top: 30px;
			background:#fff;
		}
	}
</style>