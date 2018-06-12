<template>
	<div id="index">
		<myMenu></myMenu>
		<main id="panel">
			<div :class="['maskBox',isShowMask?'show':'hide']" @click="showSlideout"></div>
			<header>
				<span class="left" @click="showSlideout"></span>
				账户中心
			</header>
			<div class="msg">
				<!--<router-link :to="{path:'editUserName'}">-->
					<div class="inputBox"><span>用户名：</span>
						<p v-text="userName"></p>
						<!--<i></i>-->
					</div>
				<!--</router-link>-->	
				<!--<router-link to='changePsw'><div class="inputBox"><span>更改密码：</span><p></p><i></i></div></router-link>-->
			</div>
			<div class="btn">
				注销
			</div>
		</main>
	</div>
</template>

<script>
	import { MessageBox,Toast } from 'mint-ui';
	import myMenu from '../menu.vue';
	export default { 
  		name: 'login',
  		data(){
  			return{
  				isShowMask:false,
  				userName:''
  			}
  		},
  		components: {
			myMenu
		},
  		created(){
  			this.myfun.getAxios({path:'/admin/userinfo',getMethod:true},res=>{
				this.userName = res.authInfo.data.username;
			})
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
#index{
        @color:#ff6000;
        /*msg*/
        .msg{
            .inputBox{
            	border-bottom: 1px solid #e1e1e1;
                padding:0 30px;
                height: 90px;
                width: 100%;
                display: flex;
                span{flex: 15;line-height: 90px;}
				p{flex: 25;text-align: right;height: 100%;line-height: 90px;color: #898989;}
				i{display: block;flex:2;background: url(../../assets/image/right_icon.png);background-size:100% 100%;height: 40px;margin:25px 15px;}
            }
            margin-top: 30px;
            background:#fff;
        } 
    }
</style>