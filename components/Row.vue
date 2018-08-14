<template>
	<el-row
		:gutter="this.gutter"
		:justify="this.justify"
		:align="this.align"
		:tag="this.tag">
		<slot></slot>
	</el-row>
</template>

<script>
export default {
	name: 'row',
	props: {
		gutter: {
			type: Number,
			default: 10	
		},
		justify: String,
		align: String,
		tag: String
	}
};
</script>