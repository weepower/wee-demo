import { RouteHandler } from 'wee-routes';
import $ from 'wee-dom';
import Vue from 'vue';
import productOptions from './index.vue';

// Create component constructor
export const Options = Vue.extend(productOptions);
const classes = {
	target: '.js-product-options'
};
let options;

// Register and mount component
export default new RouteHandler({
	init() {
		options = new Options().$mount(classes.target);
	},
	update() {
		$(classes.target).append(options.$el);
	},
	unload() {
		options.$destroy();
	}
});