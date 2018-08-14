<template>
	<header class="header">
		<router-link class="logo" to="/">
			<img src="../assets/img/logo.png" alt="Logo" />
		</router-link>
		<nav class="navbar">
			<el-menu 
				mode="horizontal"
				:default-active="activeIndex"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"
				router>
				<el-menu-item index="/">首页</el-menu-item>
				<el-menu-item index="/work-item/pend">评审任务</el-menu-item>
				<el-submenu index="/system">
					<template slot="title">系统设置</template>
					<el-menu-item index="/system/review-type">评审分类关联设置</el-menu-item>
				</el-submenu>
				<el-menu-item index="/value-set">值集设置</el-menu-item>
				<el-menu-item index="">
					<a href="http://eip.mpdev.com/RightManage" target="_blank">权限设置</a>
				</el-menu-item>
			</el-menu>
		</nav>
		<div class="user-info">
			<span>欢迎您，何霖</span>
			<router-link class="logout" to="logout">退出</router-link>
		</div>
	</header>
</template>

<script>
export default {
	name: 'page-header',
	data() {
		return {
			activeIndex: '',
		};
	},
	created() {
		this.activeIndex = this.$route.fullPath;
	},
	watch: {
		'$route'(value) {
			this.activeIndex = value.fullPath;
		}
	}
};
</script>

<style>
.header {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	z-index: 100;
	display: flex;
	align-items: center;
	height: 60px;
	padding: 0 20px;
	background-color: #545c64;
	color: #fff;
	line-height: 60px;
	font-size: 14px;
}
@media only screen and (max-width: 992px) {
	.header {
		position: static;
		height: auto;
		margin-bottom: 20px;
		flex-direction: column;
		align-items: flex-start;
	}
}
.logo {
	display: block;
	width: 200px;
	height: 60px;
	padding: 12px 0;
	line-height: 1;
}
.logo img {
	height: 100%;
	vertical-align: middle;
}
.navbar {
	flex: 1;
}
.navbar a {
	display: block;
	height: 100%;
	text-decoration: none;
}
.user-info {
	width: 200px;
	height: 100%;
	text-align: right;
}
.logout {
	display: inline-block;
	padding: 0 20px;
	color: #fff;
}
.logout:hover {
	color: #fff;
	background-color: rgb(67, 74, 80);
}
</style>