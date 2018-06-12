<template>
	<div id="app">
		<!--<div class="navBox"></div>-->
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data(){
			return{
			}
		},
		watch:{
			$route(to, from) { 
				this.myfun.mySlideout = null;
//				this.myfun.mySlideout.open();
            }  
		},
		created() {
			this.myfun.getThis(this);
			if(!localStorage.token){
				this.myfun.toLogin();
			}
		}
	}
</script>
<style lang="less" scoped="scoped">
	.navBox{height: 90px;background: #26A2FF;width: 100%;z-index: -1;}
</style>