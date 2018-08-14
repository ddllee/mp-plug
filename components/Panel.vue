<template>
	<section class="panel">
		<div class="panel-header" v-if="title || !!$slots.title || !!$slots.action">
			<div class="panel-title">
				<slot name="title">{{title}}</slot>
			</div>
			<div class="panel-action">
				<slot name="action"></slot>
			</div>
		</div>
		<div class="panel-body">
			<slot></slot>
		</div>
	</section>
</template>

<script>
export default {
	name: 'panel',
	props: {
		title: String
	}
};
</script>

<style>
.panel {
	margin-bottom: 20px;
	border: 1px solid #ddd;
	/* border-radius: 4px; */
	background-color: #fff;
}
.panel-header {
	display: flex;
	align-items: center;
	padding: 10px 20px;
	border-bottom: 1px solid #ddd;
	background-color: #ecf5ff;
}
.panel-title {
	flex: 1;
	margin: 0;
}
.panel-body {
	padding: 10px 20px;
}
</style>