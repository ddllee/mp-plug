<template>
	<section class="push-modal" :class="{'show': value}">
		<div class="push-modal-mask" @click="backdropClicked"></div>
		<div 
			class="push-modal-content"
			:style="{ width: width }">
			<div class="push-modal-header">
				<h3 class="push-modal-title">					
                    <slot name="title">{{title}}</slot>
				</h3>
				<span class="push-modal-dismiss-btn" v-if="dismissBtn" @click="toggle(false)">×</span>
			</div>
			<div class="push-modal-body">
				<slot></slot>
			</div>
			<div class="push-modal-footer" v-if="!!$slots.footer">
				<slot name="footer"></slot>
			</div>
			<loading :value="busy"></loading>
		</div>
	</section>
</template>

<script>
import { on, off, removeDom, addClass, removeClass, toggleOverflow } from '../libs/dom-utils';
import { isFunction } from '../libs/utils';

export default {
	name: 'push-modal',
	props: {
		value: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: '600px'
		},
		title: String,
		dismissBtn: {
			type: Boolean,
			default: true
		},
		transitionDuration: {
			type: Number,
			default: 150
		},
		keyboard: {
			type: Boolean,
			default: true
		},
		backdrop: {
			type: Boolean,
			default: false
		},
		beforeClose: Function,
		appendToBody: {
			type: Boolean,
			default: false
		},
		busy: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			timeoutId: 0
		};
	},
	mounted() {
		on(window, 'keyup', this.onKeyPress);
		if (this.value) {
			this.$toggle(true);
		}
	},
	beforeDestroy() {
		clearTimeout(this.timeoutId);
		removeDom(this.$el);
		off(window, 'keyup', this.onKeyPress);
		toggleOverflow(false);
	},
	methods: {
		$toggle(show) {
			const modal = this.$el;

			clearTimeout(this.timeoutId);
			if (show) {    
				if (this.appendToBody) {
					document.body.appendChild(modal);
				}
				modal.style.display = 'block';
				modal.scrollTop = 0;
				addClass(modal, 'show');
				toggleOverflow(true);
				
				// 等待动画结束触发show时间
				this.timeoutId = setTimeout(() => {
					this.$emit('show');
					this.timeoutId = 0;

					let ele = this.$el.querySelector('[data-action="autofocus"]');
					if (ele) {
						ele.focus();
					}
				}, this.transitionDuration);
			} else {
				removeClass(modal, 'show');
				this.timeoutId = setTimeout(() => {
					modal.style.display = 'none';
					toggleOverflow(false);
					if (this.appendToBody) {
						removeDom(modal);
					}
					this.$emit('hide');
					this.timeoutId = 0;
				}, this.transitionDuration);
			}
		},
		// 切换显示状态
		toggle(show, msg) {
			// 如果beforeClose返回falsely则不关闭
			if (!show && isFunction(this.beforeClose) && !this.beforeClose(msg)) {
				return;
			}
			this.msg = msg;
			this.$emit('input', show);
		},
		// 按esc退出
		onKeyPress(event) {
			if (this.keyboard && this.value && event.keyCode === 27) {
				this.toggle(false);
			}
		},
		// 点击遮罩
		backdropClicked() {
			if (this.backdrop) {
				this.toggle(false);
			}
		}
	},
	watch: {
		value(show) {
			this.$toggle(show);
		}
	}
};
</script>

<style lang="scss">
.push-modal {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 1000;
	display: none;

	&.show {
		.push-modal-content {
			transform: translateX(0);
		}
	}
}
.push-modal-mask {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
.push-modal-content {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	min-width: 300px;
	background-color: #fff;
	box-shadow: 5px 0 10px 0 rgba(0,0,0,0.1);
	transform: translateX(-100%);
	transition: transform .3s ease-in-out;
}
.push-modal-header {
	display: flex;
	align-items: center;
	padding: 20px;
	border-bottom: 1px solid #eaeaea;
}
.push-modal-title {
	flex: 1;
	margin: 0;
	font-size: 16px;
	font-weight: normal;
	line-height: 1;
}
.push-modal-dismiss-btn {
	font-size: 12px;
	transform: scale(2);
	cursor: pointer;
	color: #999;

	&:hover {
		color: #000;
	}
}
.push-modal-body {
	flex: 1;
	padding: 20px;
	overflow-y: auto;
}
.push-modal-footer {
	padding: 15px 20px;
	border-top: 1px solid #eaeaea;
	text-align: center;

	.el-button + .el-button {
		margin-left: 30px;
	}
}
</style>