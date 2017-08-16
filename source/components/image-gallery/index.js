import { RouteHandler } from 'wee-routes';
import $ from 'wee-dom';
import $events from 'wee-events';
import classes from '../../scripts/classes';

function bindEvents() {
	const wrap = '.js-gallery-thumb-wrap';

	$events.on(wrap, 'click.gallery', (e, el) => {
		const $thumb = $(el);

		$(wrap).removeClass(classes.active);

		$('.js-gallery-main-image').attr('src', $thumb.find('.js-gallery-thumb').attr('src'));

		$thumb.addClass(classes.active);
	});
}

export default new RouteHandler({
	init() {
		bindEvents();
	},
	unload: 'gallery'
});