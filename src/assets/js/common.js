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
				console.log(res);
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
/*obj=>path(地址) getMethod(判断是否头部带?参数拿数据) returnBack(返回上一页) that(当前vue对象this)*/
	getAxios: function(obj, callback) {
		this.showLoad();
		var _tokenStr = obj.getMethod ? '?token=' : '&token=';
		axios.get(this.myfun_ips + obj.path + _tokenStr + localStorage.token).then(res => {
			this.closeLoad();
			if(res.status == 200) {
				this.changeToken(res.data);
				if(res.data.errcode == 1) {
					if(obj.reWrite){
						return callback(res.data);
					}
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
	timeToTimestamp:function(time){
// 		console.log(time);
		if(time){
			var timestamp = new Date(time.replace(/-/g, '/'));			
		}else{
			var timestamp = new Date();	
		}
   		timestamp = Date.parse(timestamp);
   		return timestamp;
   	},
    //时间戳转换成年月日
	timestampToTime:function(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var	Y = date.getFullYear() + '-';
        var	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var	D = date.getDate() + ' ';
       	return Y+M+D;
   	},
   	selectFileImage: function(fileObj, callback) {
		//	var file = fileObj.files['0'];
		var that = this;
		var file = fileObj;
		//图片方向角 added by lzk  
		var Orientation = null;

		if(file) {
			console.log("正在上传,请稍后...");
			var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式  
			if(!rFilter.test(file.type)) {
				//showMyTips("请选择jpeg、png格式的图片", false);  
				return;
			}
			// var URL = URL || webkitURL;  
			//获取照片方向角属性，用户旋转控制  
			EXIF.getData(file, function() {
				// alert(EXIF.pretty(this));  
				EXIF.getAllTags(this);
				//alert(EXIF.getTag(this, 'Orientation'));   
				Orientation = EXIF.getTag(this, 'Orientation');
				//return;  
			});

			var oReader = new FileReader();
			oReader.onload = function(e) {
				//var blob = URL.createObjectURL(file);  
				//_compress(blob, file, basePath);  
				var image = new Image();
				image.src = e.target.result;
				image.onload = function() {
					var expectWidth = this.naturalWidth;
					var expectHeight = this.naturalHeight;

					if(this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
						expectWidth = 800;
						expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
					} else if(this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
						expectHeight = 1200;
						expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
					}
					var canvas = document.createElement("canvas");
					var ctx = canvas.getContext("2d");
					canvas.width = expectWidth;
					canvas.height = expectHeight;
					ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
					var base64 = null;
					//修复ios  
					if(navigator.userAgent.match(/iphone/i)) {
						console.log('iphone');
						//alert(expectWidth + ',' + expectHeight);  
						//如果方向角不为1，都需要进行旋转 added by lzk  
						if(Orientation != "" && Orientation != 1) {
//							alert('旋转处理');
							console.log(that);
							switch(Orientation) {
								case 6: //需要顺时针（向左）90度旋转  

									that.rotateImg(this, 'left', canvas);
									break;
								case 8: //需要逆时针（向右）90度旋转  

									that.rotateImg(this, 'right', canvas);
									break;
								case 3: //需要180度旋转  

									that.rotateImg(this, 'right', canvas); //转两次  
									that.rotateImg(this, 'right', canvas);
									break;
							}
						}

						/*var mpImg = new MegaPixImage(image); 
						mpImg.render(canvas, { 
						    maxWidth: 800, 
						    maxHeight: 1200, 
						    quality: 0.8, 
						    orientation: 8 
						});*/
						base64 = canvas.toDataURL("image/jpeg", 0.8);
					} /*else if(navigator.userAgent.match(/Android/i)) { // 修复android  
						var encoder = new JPEGEncoder();
						base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
					}*/ else {
						//alert(Orientation);  
						if(Orientation != "" && Orientation != 1) {
							//alert('旋转处理');  
							switch(Orientation) {
								case 6: //需要顺时针（向左）90度旋转  

									that.rotateImg(this, 'left', canvas);
									break;
								case 8: //需要逆时针（向右）90度旋转  

									that.rotateImg(this, 'right', canvas);
									break;
								case 3: //需要180度旋转  

									that.rotateImg(this, 'right', canvas); //转两次  
									that.rotateImg(this, 'right', canvas);
									break;
							}
						}

						base64 = canvas.toDataURL("image/jpeg", 0.8);
					}
					//uploadImage(base64);  
					//					$("#myImage").attr("src", base64);
					//					console.log(base64);
					if(typeof callback == 'function') {
						return callback(base64);
					}
				};
			};
			oReader.readAsDataURL(file);
		}
	},
	//对图片旋转处理 added by lzk  
	rotateImg: function(img, direction, canvas) {
		//alert(img);  
		//最小与最大旋转方向，图片旋转4次后回到原方向    
		var min_step = 0;
		var max_step = 3;
		//var img = document.getElementById(pid);    
		if(img == null) return;
		//img的高度和宽度不能在img元素隐藏后获取，否则会出错    
		var height = img.height;
		var width = img.width;
		//var step = img.getAttribute('step');    
		var step = 2;
		if(step == null) {
			step = min_step;
		}
		if(direction == 'right') {
			step++;
			//旋转到原位置，即超过最大值    
			step > max_step && (step = min_step);
		} else {
			step--;
			step < min_step && (step = max_step);
		}
		//img.setAttribute('step', step);    
		/*var canvas = document.getElementById('pic_' + pid);   
		if (canvas == null) {   
		    img.style.display = 'none';   
		    canvas = document.createElement('canvas');   
		    canvas.setAttribute('id', 'pic_' + pid);   
		    img.parentNode.appendChild(canvas);   
		}  */
		//旋转角度以弧度值为参数    
		var degree = step * 90 * Math.PI / 180;
		var ctx = canvas.getContext('2d');
		switch(step) {
			case 0:
				canvas.width = width;
				canvas.height = height;
				ctx.drawImage(img, 0, 0);
				break;
			case 1:
				canvas.width = height;
				canvas.height = width;
				ctx.rotate(degree);
				ctx.drawImage(img, 0, -height);
				break;
			case 2:
				canvas.width = width;
				canvas.height = height;
				ctx.rotate(degree);
				ctx.drawImage(img, -width, -height);
				break;
			case 3:
				canvas.width = height;
				canvas.height = width;
				ctx.rotate(degree);
				ctx.drawImage(img, -width, 0);
				break;
		}
	},
	Base64ToFlie: function(urlData,type) {
		var arr = urlData.split(',');
		var mime = arr[0].match(/:(.*?);/)[1] || type;
		// 去掉url的头，并转化为byte
		var bytes = window.atob(arr[1]);
		// 处理异常,将ascii码小于0的转换为大于0
		var ab = new ArrayBuffer(bytes.length);
		// 生成视图（直接针对内存）：8位无符号整数，长度1个字节
		var ia = new Uint8Array(ab);
		for(var i = 0; i < bytes.length; i++) {
			ia[i] = bytes.charCodeAt(i);
		}
		return new Blob([ab], {
			type: mime
		});
	},
	//创建本地数据库
	saveImgDB(imgData,obj){
		let db = openDatabase('mydb', '1.0', 'image db', 2 * 1024 * 1024);
		let	e_id = 'userImg';
		let	e_log = imgData;
		db.transaction(function (tx) {
		    tx.executeSql('UPDATE LOGS SET log=? WHERE id=?',[e_log,e_id]);
		    obj.imgData = e_log;
		});
	},
	selectImgDB(obj){
		let db = openDatabase('mydb', '1.0', 'image db', 2 * 1024 * 1024);
		db.transaction(function (tx) {
		   tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
		   	obj.imgData = results.rows[0].log;
		   }, null);
		});
	}
	
}