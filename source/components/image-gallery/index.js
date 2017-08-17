import { RouteHandler } from 'wee-routes';
import $ from 'wee-dom';
import $events from 'wee-events';
import classes from '../../scripts/classes';

const localClasses = {
	wrap: '.js-gallery-thumb-wrap'
};

function bindEvents() {
	$events.on(localClasses.wrap, 'click.gallery', (e, el) => {
		const $thumb = $(el);

		$(localClasses.wrap).removeClass(localClasses.active);

		$('.js-gallery-main-image').attr('src', $thumb.find('.js-gallery-thumb').attr('src'));

		$thumb.addClass(localClasses.active);
	});
}

export default new RouteHandler({
	init() {
		bindEvents();
	},
	unload: 'gallery'
});