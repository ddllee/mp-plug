<template>
	<el-pagination
		class="pager"
		layout="total, sizes, prev, pager, next, jumper"
		:current-page="pageIndexInner"
		:page-sizes="pageSizes"
		:page-size="pageSize"
		:total="total"
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange" />
</template>

<script>
export default {
	name: 'pager',
	props: {
		pageIndex: {
			type: Number,
			default: 1
		},
		pageSize: {
			type: Number,
			default: 15
		},
		total: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			pageSizes: [this.pageSize, this.pageSize * 2, this.pageSize * 4, this.pageSize * 8],
			pageSizeInner: this.pageSize,
			pageIndexInner: this.pageIndex
		};
	},
	methods: {
		handleCurrentChange(pageIndex) {
			this.pageIndexInner = pageIndex;
			this.$emit('paging', this.pageIndexInner, this.pageSizeInner);
		},		
		handleSizeChange(pageSize) {
			this.pageIndexInner = 1;
			this.pageSizeInner = pageSize;
			this.$emit('paging', this.pageIndexInner, this.pageSizeInner);
		}
	}
};
</script>

<style>
.pager {
	margin-top: 20px;
	text-align: right;
}
</style>