import { RouteHandler } from 'wee-routes';
import { _win } from 'core/variables';
import $ from 'wee-dom';
import $events from 'wee-events';
import { fixed, hidden, shown } from '../../scripts/classes';

const $header = $('.js-header');
const $content = $('.js-content');
const $logoEE = $('.js-logo-ee');
const headerHeight = $header.height(true);

// Here, we create an object to store various state variables that we'll need
// to keep track of
const state = {
    scrolled: false,
    shown: false,
    prevPosition: 0,
};

/**
 * Scroll event handler
 */
function handleScroll() {
    const pos = _win.pageYOffset;

    if (! state.scrolled && pos >= headerHeight) {
        $header.addClass(fixed);
        $content.addClass(fixed);
        $logoEE.addClass(hidden);

        state.scrolled = true;
    } else if (pos === 0 && state.scrolled) {
        $header.removeClass(fixed)
            .removeClass(shown);
        $content.removeClass(fixed);
        $logoEE.removeClass(hidden);

        state.scrolled = false;
    }

    if (state.scrolled) {
        if (state.shown && pos >= state.prevPosition) {
            $header.removeClass(shown);

            state.shown = false;
        } else if (! state.shown && pos <= state.prevPosition) {
            $header.addClass(shown);

            state.shown = true;
        }
    }

    state.prevPosition = pos;
}

/**
 * Bind events
 */
function bindEvents() {
    $events.on(_win, 'scroll.header', handleScroll);
}

export default new RouteHandler({
    init() {
        bindEvents();
    },

    // On unload, the router will attempt to remove any events or mappings that use
    // this namespace
    unload: 'header',
});
