<template>
	<section class="block">
		<div class="block-header" v-if="title || !!$slots.title || tabs.length || !!$slots.action">
			<h2 class="block-title" v-if="title || !!$slots.title">
				<slot name="title">{{title}}</slot>
			</h2>
			<div class="block-tabs" v-else-if="tabs.length">
				<span class="block-tab-active-bar" :style="activeBarStyle"></span>
				<span
					class="block-tab-item"
					v-for="tab in tabs"
					:key="tab"
					:class="{'active': tab === activeTabInner}"
					ref="tabItems"
					@click.prevent.stop="handleTabClick(tab)">{{tab}}</span>
			</div>
			<div class="block-action" v-if="!!$slots.action">
				<slot name="action"></slot>
			</div>
		</div>
		<div class="block-body">
			<slot></slot>
		</div>
	</section>
</template>

<script>
export default {
	name: 'block',
	props: {
		title: String,
		tabs: {
			type: Array,
			default() {
				return [];
			}
		},
		activeTab: String
	},
	data() {
		return {
			activeTabInner: this.activeTab,
			activeBarStyle: {
				width: '',
				transform: ''
			}
		};
	},
	mounted() {
		this.setTabActiveBar();
	},
	watch: {
		activeTab(v) {
			this.activeTabInner = v;
			this.setTabActiveBar();
		}
	},
	methods: {
		handleTabClick(tab) {
			this.activeTabInner = tab;
			this.setTabActiveBar();
			this.$emit('tab-click', tab);
			this.$emit('update:activeTab', tab);
		},
		setTabActiveBar() {
			if (!this.$refs.tabItems) return;
			let width, leftPos = 0;
			this.$refs.tabItems.forEach((item) => {
				if (item.textContent === this.activeTabInner) {
					width = item.clientWidth;
				}
				if (width) return;
				leftPos += item.clientWidth;
			});
			this.activeBarStyle.width = width + 'px';
			this.activeBarStyle.transform = `translateX(${leftPos}px)`;
		}
	}
};
</script>

<style lang="scss">
.block {
	display: flex;
	margin-bottom: 20px;
	box-shadow: 0 0 5px 1px rgba(0,0,0,0.1);
	background-color: #fff;
}
.block-header {
	display: flex;
	align-items: center;
	padding: 0 20px;
	border-bottom: 1px solid #eaeaea;
}
.block-title {
	flex: 1;
	margin: 0;
	padding: 15px 0;
	line-height: 32px;
	font-size: 15px;
	font-weight: normal;
}
.block-tabs {
	flex: 1;
	display: flex;
	position: relative;
}
.block-tab-item {
	display: block;
	padding: 15px 20px;
	line-height: 32px;
	cursor: pointer;

	&:hover {
		color: #40a9ff;
	}

	&.active::after {
		color: #1890ff;
		display: block;
	}
}
.block-tab-active-bar {
	position: absolute;
	left: 0;
	bottom: 0;
	border-top: 2px solid #40a9ff;
	transition: all .2s;
}
.block-action {
	padding: 15px 0;
}
.block-body {
	flex-shrink: 1;
	padding: 20px;
}
</style>