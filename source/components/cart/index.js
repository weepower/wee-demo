import { RouteHandler } from 'wee-routes';
import $store from 'wee-store';
import Vue from 'vue';
import cartOptions from './index.vue';

export const cartStore = $store.create('local');

// Create component constructor
export const Cart = Vue.extend(cartOptions);

let cart;

// Register and mount component
export default new RouteHandler({
	init() {
		cart = new Cart();

		cart.$mount('.js-cart');
	},
	unload() {
		cart.$destroy();
	}
});