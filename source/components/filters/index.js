import { RouteHandler } from 'wee-routes';
import $ from 'wee-dom';
import Vue from 'vue';
import filtersOptions from './index.vue';

// Create component constructor
export const Filters = Vue.extend(filtersOptions);
const classes = {
	target: '.js-filters'
};
let filters;

// Register and mount component
export default new RouteHandler({
	init() {
		filters = new Filters().$mount(classes.target);
	},
	update(to) {
		$(classes.target).append(filters.$el);
		filters.refreshSelections(to.query);
	},
	unload() {
		filters.$destroy();
	}
});