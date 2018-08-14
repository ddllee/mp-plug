import Vue from 'vue';
import IframeDialog from './iframe-dialog';
import { removeDom } from '../../libs/dom-utils';

const queue = [];

export default function iframeDialog(options) {
	let oldOnClose = options.onClose;
	options.onClose = function (...args) {
		removeDom(instance.$el);
		instance.$destroy();
		oldOnClose && oldOnClose.apply(this, args);
	};
	const instance = new Vue({
		extends: IframeDialog,
		propsData: options
	});
	instance.$mount();
	document.body.appendChild(instance.$el);
	instance.toggle(true);
	queue.push(instance);
	return instance;
}

iframeDialog.close = function (instance) {
	if (!instance) {
		instance = queue.pop();
	}
	instance && instance.toggle(false);
};