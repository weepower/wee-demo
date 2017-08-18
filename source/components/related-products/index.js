import { RouteHandler } from 'wee-routes';
import Vue from 'vue';
import productRoll from '../product-roll/index.vue';

// Create component constructor
export const RelatedProducts = Vue.extend(productRoll);

let related;

// Register and mount component
export default new RouteHandler({
	init() {
		// Instantiate the component while setting some default
		// properties that will be merged with the component properties
		related = new RelatedProducts({
			name: 'related-products',
			data() {
				return {
					title: 'Related Products',
					url: '/ajax/products/related'
				}
			}
		});

		related.$mount('.js-related-products');
	},
	unload() {
		related.$destroy();
	}
});