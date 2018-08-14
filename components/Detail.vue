<template>
	<section class="detail">
		<slot></slot>
	</section>
</template>

<script>
export default {
	name: 'detail',
	props: {
		labelWidth: String,
		labelAlign: {
			type: String,
			default: 'right'
		}
	}
}
</script>
