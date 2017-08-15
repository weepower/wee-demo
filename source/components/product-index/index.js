import { RouteHandler } from 'wee-routes';
import $events from 'wee-events';
import $ from 'wee-dom';
import classes from '../../scripts/classes';

/**
 * Bind all product index events
 */
function bindEvents() {
	$events.on('.js-sidebar-toggle', 'click.productIndex', toggleSidebar);
}

/**
 * Rebind filter DOM events
 */
function rebindEvents() {
	$events.off(false, '.productIndex');
	bindEvents();
}

/**
 * Open/close sidebar menu on mobile/tablet layouts
 */
function toggleSidebar() {
	$('.js-sidebar').toggleClass(classes.active);
	$('.js-content').toggleClass(classes.active);
}

export default new RouteHandler({
	init() {
		bindEvents();
	},
	update() {
		rebindEvents();
	},
	unload: 'productIndex'
});