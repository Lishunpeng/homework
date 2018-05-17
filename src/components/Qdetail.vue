<template>
	<div id="Qdetail">
		<header>
			<span class="leftBack" @click="$router.back(-1)">返回</span>
			问卷详情
		</header>
		<div class="container">
			<div class="title">这是题目这是题目这是题目这是题目这是题目这是题目这是题目这是题目这是题目这是题目</div>
			<ul class="content">
				<li>
					<div class="chooseTitle">
						1.这是内容题目这是内容题目这是内容题目
					</div>
					<div class="answer">
						<span>*</span>这是答案这是答案这是答案这是答案这是答案
					</div>
				</li>
				<li>
					<div class="chooseTitle">
						1.这是内容题目这是内容题目这是内容题目
					</div>
					<div class="answer">
						<span>*</span>这是答案这是答案这是答案这是答案这是答案
					</div>
				</li>
				<li>
					<div class="chooseTitle">
						1.这是内容题目这是内容题目这是内容题目
					</div>
					<div class="answer">
						<span>*</span>这是答案这是答案这是答案这是答案这是答案
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
</script>

<style lang="less">
	#Qdetail{
		.container{
			padding: 10px 20px;height:auto;
			.title{font-size: 35px;font-weight: bold;color: #26A2FF;line-height: 50px;height: auto;}
			.content{height: auto;margin-top: 20px;border-top:10px solid #b6ddfb;padding-top: 20px;
				li{border-bottom:2px solid #e1e1e1;height: auto;margin-top: 20px;
					.chooseTitle{font-size: 32px;color: #1b1b1b;line-height: 30px;height: auto;}
					.answer{span{color: #26A2FF;}margin: 20px 0;height: auto;}					
				}
			}
		}
	}
</style>