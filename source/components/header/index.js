import { RouteHandler } from 'wee-routes';
import $ from 'wee-dom';
import { _win } from 'core/variables';
import $events from 'wee-events';
import classes from '../../scripts/classes';

const $header = $('.js-header');
const $content = $('.js-content');
const $logoEE = $('.js-logo-ee');
const headerHeight = $header.height(true);
const state = {
	scrolled: false,
	shown: false,
	prevPosition: 0
};

/**
 * Scroll event handler
 */
function handleScroll() {
	const pos = _win.pageYOffset;

	if (! state.scrolled && pos >= headerHeight) {
		$header.addClass(classes.fixed);
		$content.addClass(classes.fixed);
		$logoEE.addClass(classes.hidden);

		state.scrolled = true;
	} else if (pos === 0 && state.scrolled) {
		$header.removeClass(classes.fixed)
			.removeClass(classes.shown)
			.removeClass(classes.transitioning);
		$content.removeClass(classes.fixed);
		$logoEE.removeClass(classes.hidden);

		state.scrolled = false;
	}

	if (state.scrolled) {
		if (state.shown && pos >= state.prevPosition) {
			$header.removeClass(classes.shown);

			setTimeout(() => {
				$header.removeClass(classes.transitioning);
			}, 200);

			state.shown = false;
		} else if (! state.shown && pos <= state.prevPosition) {
			$header.addClass(classes.transitioning)
				.addClass(classes.shown);

			state.shown = true;
		}
	}

	state.prevPosition = pos;
}

/**
 * Bind events
 */
function bindEvents() {
	$events.on({
		window: {
			scroll: handleScroll
		}
	}, {
		namespace: 'header'
	});
}

export default new RouteHandler({
	init() {
		bindEvents();
	},
	unload: 'header'
});