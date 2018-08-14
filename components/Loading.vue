<template>
	<div
		class="loading"
		:class="{ 'show': value }"
		:style="{ 'background-color': bgColor, top: top + 'px' }">
		<div class="loading-icon" :style="{ top: iconTop }"></div>
	</div>
</template>

<script>
import { on, off, getStyle, toggleOverflow } from '../libs/dom-utils';

export default {
	name: 'loading',
	props: {
		value: {
			type: Boolean,
			default: false
		},
		bgColor: {
			type: String,
			default: 'rgba(255, 255, 255, .5)'
		},
		iconTop: {
			type: String,
			default: '50%'
		}
	},
	data() {
		return {
			originParentPosition: '',
			top: 0
		};
	},
	watch: {
		value(v) {
			this.updateParentPosition();
		}
	},
	mounted() {
		this.updateParentPosition();
		on(window, 'keyup', this.handleKeyup);
	},
	beforeDestroy() {
		off(window, 'keyup', this.handleKeyup);
	},
	methods: {
		updateParentPosition() {
			const p = this.$el.parentNode;
			toggleOverflow(this.value, p);
			if (this.value) {
				this.top = p.scrollTop;

				let pos = getStyle(p, 'position');
				if (!pos || pos === 'static') {
					this.originParentPosition = pos === 'static' ? '' : pos;
					p.style.position = 'relative';
				}
			} else {
				p.style.position = this.originParentPosition;
			}
		},
		handleKeyup(e) {
			if (e.keyCode === 27 && this.value) {
				this.$emit('input', false);
			}
		}
	}
};
</script>

<style lang="scss">
.loading {
	position: absolute;
	left: 0;
	z-index: 2000;
	display: none;
	justify-content: center;
	justify-items: center;
	width: 100%;
	height: 100%;

	&.show {
		display: flex;
	}
}
.loading-icon {
	position: absolute;
	left: 50%;
	display: inline-block;
	width: 40px;
	height: 40px;
	margin: -20px 0 0 -20px;
	border: 2px solid #409EFF;
	border-right-color: transparent;
	border-radius: 50%;
	animation: loadingAnimation 1s linear infinite;
}
@keyframes loadingAnimation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
