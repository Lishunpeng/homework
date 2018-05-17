import Vue from 'vue'
import axios from 'axios'
import {MessageBox,Toast,Indicator} from 'mint-ui';
Vue.prototype.myfun = {
//	myfun_ips: 'http://192.168.2.22:80',
	myfun_ips: 'http://localhost:2002',
	mySlideout:null,
	getThis:function(obj){
		this._mySelf = obj;
	},
	//公用底部
	getFootData:function(val){
		var data=[
			{name:'最新问卷',myClass:'index',linkTo:'/',isClick:false},
			{name:'结束问卷',myClass:'endQuestionNaire',linkTo:'/endQuestionNaire',isClick:false},
			{name:'个人中心',myClass:'personCenter',linkTo:'/personCenter',isClick:false}
		]
		data[val].isClick=true;
		return data;
	},
	//显示加载中
	showLoad:function(){
		Indicator.open({text: 'Loading...',spinnerType: 'fading-circle'});
	},
	//关闭加载中
	closeLoad:function(){
		Indicator.close();
	},
	sliderOut:function(){
		var $width = $('body').width()*0.7;
		this.mySlideout = new Slideout({
		    'panel': document.getElementById('panel'),
		    'menu': document.getElementById('menu'),
		    'padding': $width,
		    'tolerance': 70,
		    'touch':false
		});
	},
	showSlideout:function(obj){
		obj.isShowMask = !obj.isShowMask;
		this.mySlideout.toggle();
	},
	//获取当前时间
    getMyDate:function(obj){
    	var _date = new Date(obj);  
	    var y = _date.getFullYear();    
	    var m = _date.getMonth() + 1;  
	    m<10?m='0'+m:'';
	    var d = _date.getDate();
	    d<10?d='0'+d:'';
	    var str = y+'-'+m+'-'+d;
	    return str;
    }
}