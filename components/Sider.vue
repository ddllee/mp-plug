<template>
	<aside class="sider" :style="asideStyle">
		<div class="logo">
			<slot name="logo">
				<router-link to="/">
					<i class="fa-home"></i>
					<h1>{{sysName}}</h1>
				</router-link>
			</slot>
		</div>
		<slot></slot>
	</aside>
</template>

<script>
export default {
	name: 'sider',
	props: {
		width: {
			type: String,
			default: '230px'
		},
		bgColor: {
			type: String,
			default: '#001529'
		},
		collapse: {
			type: Boolean,
			default: false
		},
		sysName: String
	},
	data() {
		return {

		}
	},
	computed: {
		asideStyle() {
			return {
				width: this.width,
				backgroundColor: this.bgColor
			};
		}
	}
};
</script>

<style lang="scss">
.sider {
	position: relative;
	z-index: 2;
	transition: all .2s;
	box-shadow: 2px 0 5px rgba(0, 21, 41, 0.35);

	a {
		color: inherit;
	}

	.logo {
		height: 60px;
		padding-left: 20px;
		line-height: 60px;
		color: #fff;

		i, h1 {
			display: inline-block;
			vertical-align: middle;
		}
		i {
			font-size: 26px;
		}		
		h1 {
			margin: 0 0 0 10px;
			font-size: 18px;
			font-weight: normal;
		}
	}
}
</style>
