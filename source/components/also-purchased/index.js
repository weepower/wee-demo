import { RouteHandler } from 'wee-routes';
import Vue from 'vue';
import productRoll from '../product-roll/index.vue';

// Create component constructor
export const AlsoPurchased = Vue.extend(productRoll);

let alsoPurchased;

// Register and mount component
export default new RouteHandler({
	init() {
		// This showcases our ability to pass in methods and data to our component.
		// Any data passed into the component constructor will be merged with the
		// components data, allowing us to initialize it with data that we can fetch
		// from an API, or from our router.
		alsoPurchased = new AlsoPurchased({
			name: 'also-purchased',
			data() {
				return {
					title: 'Customers Also Purchased',
					url: '/ajax/products/also-purchased'
				}
			}
		});

		// Mount the component to a targeted selection
		alsoPurchased.$mount('.js-also-purchased');
	},
	unload() {
		alsoPurchased.$destroy();
	}
});