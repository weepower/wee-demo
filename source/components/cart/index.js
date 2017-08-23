import { RouteHandler } from 'wee-routes';
import $store from 'wee-store';
import Vue from 'vue';
import cartOptions from './index.vue';

// Create and export an instance of the store module.  As you can see,
// we're setting the browserStorage parameter to 'session'.  This will keep
// the data in the module synced with session storage.
export const cartStore = $store.create('cart', {
	browserStorage: 'session'
});

// Create component constructor
export const Cart = Vue.extend(cartOptions);

let cart;

// Register and mount component
export default new RouteHandler({
	init() {
		// Instantiate the Vue component
		cart = new Cart();

		// Mount the component to a targeted selection
		cart.$mount('.js-cart');
	},
	unload() {
		cart.$destroy();
	}
});