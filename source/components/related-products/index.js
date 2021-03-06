import { RouteHandler } from 'wee-routes';
import Vue from 'vue';
import productRoll from '../product-roll/index.vue';

// Create component constructor
export const RelatedProducts = Vue.extend(productRoll);

let related;

// Register and mount component
export default new RouteHandler({
    init() {
        // This showcases our ability to pass in methods and data to our component.
        // Any data passed into the component constructor will be merged with the
        // components data, allowing us to initialize it with data that we can fetch
        // from an API, or from our router.
        related = new RelatedProducts({
            name: 'RelatedProducts',
            data: () => ({
                title: 'Related Products',
                url: '/ajax/products/related',
            }),
        });

        // Whenever the page is updated, remount the Vue component.
        related.$mount('.js-related-products');
    },
    unload() {
        // Destroy the component on unload
        related.$destroy();
    },
});
