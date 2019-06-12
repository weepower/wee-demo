import { RouteHandler } from 'wee-routes';
import $ from 'wee-dom';
import Vue from 'vue';
import productOptions from './index.vue';

// Create and export an instance of the store module.
export const Options = Vue.extend(productOptions);

// Any one off class references we can store in a different variable.
const classes = {
    target: '.js-product-options',
};
let options;

// Register and mount component
export default new RouteHandler({
    init() {
        // Create and mount the component to a targeted selection
        options = new Options().$mount(classes.target);
    },
    update() {
        // Whenever the page is updated, remount the Vue component.
        $(classes.target).append(options.$el);
    },
    unload() {
        // Destroy the component on unload
        options.$destroy();
    },
});
