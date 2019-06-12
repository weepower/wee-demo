import { RouteHandler } from 'wee-routes';
import $ from 'wee-dom';
import Vue from 'vue';
import FiltersOptions from './index.vue';

// Create and export an instance of the store module.
export const Filters = Vue.extend(FiltersOptions);

// Create an object to hold all the classes we'll be referencing
const classes = {
    target: '.js-filters',
};
let filters;

// Register and mount component
export default new RouteHandler({
    init() {
        // Create and mount the component to a targeted selection
        filters = new Filters().$mount(classes.target);
    },
    update(to) {
        // Whenever the page is updated, remount the Vue component.
        $(classes.target).append(filters.$el);

        // Here, we are able to call a method on the Vue component.
        filters.refreshSelections(to.query);
    },
    unload() {
        // Destroy the component on unload
        filters.$destroy();
    },
});
