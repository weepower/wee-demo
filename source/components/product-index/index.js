import { RouteHandler } from 'wee-routes';
import $events from 'wee-events';
import $ from 'wee-dom';

// We store any commonly referenced class names in it's own file and import it
import { active } from '../../scripts/classes';

// Any one off class references we can store in a different variable.
const localClasses = {
    sidebar: '.js-sidebar',
    content: '.js-content',
    toggle: '.js-sidebar-toggle',
};

/**
 * Open/close sidebar menu on mobile/tablet layouts
 */
function toggleSidebar() {
    $(localClasses.sidebar).toggleClass(active);
    $(localClasses.content).toggleClass(active);
}

/**
 * Bind all product index events
 */
function bindEvents() {
    $events.on(localClasses.toggle, 'click.productIndex', toggleSidebar);
}

/**
 * Rebind filter DOM events
 */
function rebindEvents() {
    $events.off(false, '.productIndex');
    bindEvents();
}

export default new RouteHandler({
    init() {
        bindEvents();
    },
    update() {
        rebindEvents();
    },
    unload: 'productIndex',
});
