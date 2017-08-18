import { RouteHandler } from 'wee-routes';
import Vue from 'vue';
import productRoll from '../product-roll/index.vue';

// Create component constructor
export const AlsoPurchased = Vue.extend(productRoll);

let alsoPurchased;

// Register and mount component
export default new RouteHandler({
	init() {
		alsoPurchased = new AlsoPurchased({
			name: 'also-purchased',
			data() {
				return {
					title: 'Customers Also Purchased',
					url: '/ajax/products/also-purchased'
				}
			}
		});

		alsoPurchased.$mount('.js-also-purchased');
	},
	unload() {
		alsoPurchased.$destroy();
	}
});