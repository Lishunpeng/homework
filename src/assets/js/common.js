import Vue from 'vue'
import axios from 'axios'
import {MessageBox,Toast,Indicator} from 'mint-ui';
Vue.prototype.myfun = {
//	myfun_ips: 'http://192.168.2.22:80',
	myfun_ips: 'http://119.29.59.87:80',
	$number:/^[0-9]\d*$/,//自然整数
	changeToken: function(data) {
		data.token ? localStorage.token = data.token : "";
		console.log(localStorage.token);
	},
	/*obj=>path(地址) isUnchangeString(不修改字段提交) reWriteFn*/
	postAxios: function(obj, data, callback) {
//		$('.loadingBox').show();
		this.showLoad();
		/*if(obj.isUnchangeString) {
			var strdata = data;
		} else {
			var strdata = "";
			for(var i in data) {
				strdata += i + '=' + data[i] + '&';
			}
		}*/
		console.log(data);
//		strdata = strdata.substr(0, strdata.length - 1);
		axios.post(this.myfun_ips + obj.path + '?token=' + localStorage.token, data).then(res => {
			this.closeLoad();
			if(res.status == 200) {
				this.changeToken(res.data);
				if(obj.reWriteFn){
					return callback(res);
				}
				if(res.data.state == 1) {
					res.data.msg = res.data.msg ? res.data.msg : '错误';
					Toast(res.data.msg);
				}else if(res.data.errcode == -1||res.data.errcode == -2){
					return	this.toLogin();
				}
				else if(res.data.errcode == 0) {
					return callback(res.data);
				}
			}
		}).catch(res => {
			var myErr = res.toString();
			if(myErr.indexOf('Network Error') >= 0) {
				MessageBox('提示', '服务器异常或者检查您的网络是否异常！');
			}
			this.closeLoad();
			console.log(res);
		});
	},
	post_imgAxios: function(obj, data, callback) {
		console.log(data);
		this.showLoad();
		axios.post(this.myfun_ips + obj.path + '?token=' + localStorage.token, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(res => {
			this.closeLoad();
			if(res.status == 200) {
				this.changeToken(res.data);
				if(res.data.state == 1) {
					res.data.msg = res.data.msg ? res.data.msg : '错误';
					Toast(res.data.msg);
				}else if(res.data.errcode == -1||res.data.errcode == -2){
					return	this.toLogin();
				}else if(res.data.state == 0) {
					return callback(res.data);
				}
			}
		}).catch(res => {
			var myErr = res.toString();
			if(myErr.indexOf('Network Error') >= 0) {
				MessageBox('提示', '服务器异常或者检查您的网络是否异常！');
			}
			this.closeLoad();
			console.log(res);
		});
	},
/*obj=>path(地址) getMethod(判断是否头部带?参数拿数据) returnBack(返回上一页) that(当前vue对象this)*/
	getAxios: function(obj, callback) {
		this.showLoad();
		var _tokenStr = obj.getMethod ? '?token=' : '&token=';
		axios.get(this.myfun_ips + obj.path + _tokenStr + localStorage.token).then(res => {
			this.closeLoad();
			if(res.status == 200) {
				this.changeToken(res.data);
				if(res.data.errcode == 1) {
					res.data.msg = res.data.msg ? res.data.msg : '错误';
					Toast(res.data.msg);
//					if(obj.returnBack){
//						return	this._mySelf.$router.back(-1);
//					}
				}else if(res.data.errcode == -1||res.data.errcode == -2){
					return	this.toLogin();
				}
				else if(res.data.errcode == 0) {
					return callback(res.data);
				}
			}
		}).catch(res => {
			var myErr = res.toString();
			if(myErr.indexOf('Network Error') >= 0) {
				MessageBox('提示', '服务器异常或者检查您的网络是否异常！');
			}
			this.closeLoad();
		});
	},
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
		Indicator.open({text: 'Loading...',spinnerType: 'snake'});
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
	objToString:function(obj){
		var strdata = '';
		for(var i in obj) {
			strdata += i + '=' + obj[i] + '&';
		}
		strdata = strdata.substr(0, strdata.length - 1);
		return strdata;
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
    },
    //自动登录
    toLogin:function(){
		this._mySelf.$router.push({path: '/login/login'});
		Toast({
			message: '你还未登录,请先登录!',
			position: 'bottom',
			duration: 1000
		});
	},
    //时间戳转换成年月日
	timestampToTime:function(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var	Y = date.getFullYear() + '-';
        var	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var	D = date.getDate() + ' ';
       	return Y+M+D;
   	},
}