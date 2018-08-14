<template>
	<el-col
		:xs="24"
		:sm="sm"
		:md="md">
		<slot></slot>
	</el-col>
</template>

<script>
export default {
	name: 'column',
	props: {
		span: {
			type: Number,
			default: 6
		}
	},
	computed: {
		sm() {
			return Math.min(this.span * 2, 24);
		},
		md() {
			return Math.min(this.span, 24);
		}
	}
};
</script>