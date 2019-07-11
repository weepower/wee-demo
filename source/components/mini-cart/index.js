import { RouteHandler } from 'wee-routes';
import Vue from 'vue';
import cartOptions from './index.vue';

// Create component constructor
export const Cart = Vue.extend(cartOptions);

let cart;

// Register and mount component
export default new RouteHandler({
    init() {
        // Instantiate the Vue component
        cart = new Cart();

        // Mount the component to a targeted selection
        cart.$mount('.js-mini-cart');
    },
    unload() {
        cart.$destroy();
    },
});
