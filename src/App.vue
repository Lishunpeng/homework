<template>
	<div id="app">
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
		}
	}
</script>
<style lang="less" scoped="scoped">

</style>