<template>
	<div class="page-footer">
		<slot></slot>
	</div>
</template>

<script>
import { addClass, getStyle } from '../libs/dom-utils';

export default {
	name: 'page-footer',
	data() {
		return {
			originParentMarginBottom: 0
		}
	},
	mounted() {
		this.originParentMarginBottom = parseFloat(getStyle(this.$el.parentNode, 'margin-bottom'));
		this.$el.parentNode.style.marginBottom = this.originParentMarginBottom + this.$el.clientHeight + 'px';
	},
	beforeDestroy() {
		this.$el.parentNode.style.marginBottom = this.originParentMarginBottom ? this.originParentMarginBottom + 'px' : '';
	}
};
</script>

<style lang="scss">
.page-footer {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 10;
	padding: 10px 20px;
	box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
	background-color: #fff;
}
</style>
