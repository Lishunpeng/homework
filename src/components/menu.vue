<template>
		<nav id="menu">
			<div class="headerBox">
				<div class="headPortrait">
					<img src="../assets/image/myheader.jpg"/>
				</div>
				<div class="userName">未登录</div>
				<router-link to="/login/login">
					<button class="headBtn btn">登录</button>
				</router-link>
			</div>
			<ul class="personList">
				<li v-for="data in listData">
					<router-link :to="data.toLink">
						<span :class="data.myClass"></span>
						<p v-text="data.title"></p>
					</router-link>
				</li>
			</ul>
		</nav>
</template>

<script>
	export default{
		data(){
			return{
				listData:[
					{myClass:'index',title:'首页',toLink:'/'},
					{myClass:'account',title:'账户',toLink:'/safeInfo/safeCenter'},
					{myClass:'participate',title:'参与',toLink:'/userCenter/myParticipate'},
					{myClass:'myPush',title:'发布',toLink:'/userCenter/pushList'},
					{myClass:'collect',title:'收藏',toLink:'/userCenter/collecting'},
				]
			}
		},
		created(){
//			this.footData =	this.myfun.getFootData(this.myNumber);
		}
	}
</script>

<style scoped="scoped" lang="less">
#menu{height: 100%;position: fixed;z-index: 1;width: 70%;left: 0;top: 0;
	.headerBox{height: 400px;background: #455058;position: relative;width: 100%;overflow: hidden;
		.headPortrait{max-height: 220px;height: auto;width: 160px;margin: 20px auto;position: relative;overflow: hidden;
			img{width: 100%;}
		}
		.userName{color: #fff;text-align: center;}
		.headBtn{transition: all .3s;color: #E1E1E1;width: auto;height: auto;background: #666;margin: 20px auto;outline: none;border: 2px solid #E1E1E1;padding: 20px;line-height: normal;display: block;
			&:active{background: #333;}
		}
	}
	.personList{height: auto;
		li{height: 100px;width: 100%;border-bottom: 2px solid #ccc;overflow: hidden;transition: all .3s;
			span{float: left;display: inline-block;width: 60px;height: 60px;margin: 20px;background:no-repeat center;background-size:80% 80%;border-radius:5px;}
			span.account{background-image:url(../assets/image/person.png);background-color:#87CEEB;}
			span.participate{background-image:url(../assets/image/start.png);background-color:#ff4949;}
			span.myPush{background-image:url(../assets/image/myPush.png);background-color:#9187eb;}
			span.collect{background-image:url(../assets/image/collect.png);background-color:#87ebce;}
			span.index{background-image:url(../assets/image/index.png);background-color:#ebb587;}
			p{display: block;height: 100%;line-height: 100px;float: left;color: #656B79;}
			&:active{background: #e1e1e1;}	
			a{width: 100%;height: 100%;display: block;}	
		}
	}
}
</style>