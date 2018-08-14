<template>
    <el-dialog
		ref="dialog"
		custom-class="iframe-dialog"
		:visible="isShow"
		:title="title"
		:close-on-click-modal="false"
		:width="width"
		@close="onClose">
        <div class="iframe-box" :style="{ height: height }">
            <iframe :src="src" frameborder="0" @load="onLoad"></iframe>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
		title: {
			type: String,
			required: true
		},
		src: {
			type: String,
			required: true
		},
		width: {
			type: String,
			default: '600px'
		},
		height: {
			type: String,
			default: 400
		},
		onLoad: Function,
		onClose: Function
	},
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        toggle(isShow) {
            this.isShow = isShow;
        }
    }
}
</script>

<style lang="scss">
.iframe-dialog {
	border-radius: 0;

	.el-dialog__header {
		padding: 15px;
		border-bottom: 1px solid #ddd;
	}
	.el-dialog__body {
		padding: 0;
	}
}
.iframe-box iframe {
    width: 100%;
    height: 100%;
}
</style>