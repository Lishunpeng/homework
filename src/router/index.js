import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import menu from '@/components/menu'
import safeCenter from '@/components/safeInfo/safeCenter'
import editUserName from '@/components/safeInfo/editUserName'
import changePsw from '@/components/safeInfo/changePsw'
import forgetPsw from '@/components/login/forgetPsw'
import login from '@/components/login/login'
import register from '@/components/login/register'
import myParticipate from '@/components/userCenter/myParticipate'
import collecting from '@/components/userCenter/collecting'
import Qdetail from '@/components/Qdetail'
import push from '@/components/userCenter/push'
import pushList from '@/components/userCenter/pushList'
import Qwrite from '@/components/Qwrite'
Vue.use(Router)

export default new Router({
	routes: [
		//首页
		{
			path: '/',
			name: 'index',
			component: index,
		},
		//安全中心
		{
			path: '/safeInfo/safeCenter',
			name: 'safeCenter',
			component: safeCenter
		},
		//修改密码
		{
			name: 'changePsw',
			path: '/safeInfo/changePsw',
			component: changePsw
		},
		//修改用户名
		{
			name: 'editUserName',
			path: '/safeInfo/editUserName',
			component: editUserName
		},
		//忘记密码
		{
			path: '/login/forgetPsw',
			name: 'forgetPsw',
			component: forgetPsw,
		},
		//注册
		{
			path: '/login/register',
			name: 'register',
			component: register,
		},
		//登录
		{
			path: '/login/login',
			name: 'login',
			component: login,
		},
//		我的参与
		{
			path: '/userCenter/myParticipate',
			name: 'myParticipate',
			component: myParticipate,
		},
		//我的收藏
		{
			path: '/userCenter/collecting',
			name: 'collecting',
			component: collecting,
		},
		//问卷详情
		{
			path: '/Qdetail',
			name: 'Qdetail',
			component: Qdetail,
		},
		//问卷发布
		{
			path: '/userCenter/push',
			name: 'push',
			component: push,
		},
		//问卷发布列表
		{
			path: '/userCenter/pushList',
			name: 'pushList',
			component: pushList,
		},
		//问卷发布列表
		{
			path: '/Qwrite',
			name: 'Qwrite',
			component: Qwrite,
		},
		
	]
})