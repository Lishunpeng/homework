<template>
	<div id="register">
		<header>
			<span class="leftBack" @click="$router.back(-1)">返回</span>
			注册
			<!--<span class="right">注册</span>-->
		</header>

		<div class="msg">
			<div class="inputBox"><span>用户名：</span><input type="text" placeholder="请输入用户名" v-model="login_username" /></div>
			<div class="inputBox"><span>输入密码：</span><input type="password" placeholder="请输入密码" v-model="login_password" /></div>
			<div class="inputBox"><span>确认密码：</span><input type="password" placeholder="请输入密码" v-model="login_password_replace" /></div>
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
				login_username: "", //用户名
				login_password: "", //密码
				login_password_replace: "", //重复密码密码
			}
		},
		methods: {
			register() {
				if(!this.login_username || !this.login_password || !this.login_password_replace) {
					return MessageBox('提示', '信息不能为空！');
				}
				if(this.login_password != this.login_password_replace) {
					return MessageBox('提示', '两次密码不相同！');
				}
				var myobj = {path:'/admin/register?username='+this.login_username+'&password='+this.login_password};
				this.myfun.getAxios(myobj,res=>{
					return MessageBox('提示', res.msg).then(()=>{
						this.$router.back(-1);
					});
				});
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