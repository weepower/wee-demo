import { RouteHandler } from 'wee-routes';
import Vue from 'vue';
import productRoll from '../product-roll/index.vue';

// Create component constructor
export const AlsoBought = Vue.extend(productRoll);

let alsoBought;

// Register and mount component
export default new RouteHandler({
	init() {
		alsoBought = new AlsoBought({
			data() {
				return {
					title: 'Customers Also Purchased',
					url: '/ajax/products/also-purchased'
				}
			}
		});

		alsoBought.$mount('.js-also-bought');
	},
	unload() {
		alsoBought.$destroy();
	}
});