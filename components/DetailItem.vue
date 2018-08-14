<template>
	<dl class="detail-item">
		<dt :style="labelStyle">{{label}}</dt>
		<dd>
			<slot></slot>
		</dd>
	</dl>
</template>

<script>
export default {
	name: 'detail-item',
	props: {
		label: String,
		labelWidth: String,
		labelAlign: String
	},
	computed: {
		detail() {
			let p = this.$parent;
			if (process.env.NODE_ENV === 'development' && p.$options.name !== 'detail') {
				console.error('detail-item must be child of detail component!');
			}
			return p;
		},
		labelStyle() {
			return {
				width: this.labelWidth || this.detail.labelWidth,
				textAlign: this.labelAlign || this.detail.labelAlign	
			};
		}
	}
};
</script>

<style lang="scss">
.detail-item {
	display: flex;
	align-items: stretch;
	margin: 0;
	border: solid #ddd;
	border-width: 0 1px 1px;

	&:first-child {
		border-top-width: 1px;
	}

	> dt {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 8px;
		border-right: 1px solid #ddd;
		background-color: #ecf5ff;
	}

	> dd {
		flex: 1;
		margin: 0;
		padding: 8px;
		white-space: pre-wrap;
	}
}
</style>
