import { RouteHandler } from 'wee-routes';
import $ from 'wee-dom';
import $events from 'wee-events';
import classes from '../../scripts/classes';

const localClasses = {
	wrap: '.js-gallery-thumb-wrap'
};

function bindEvents() {
	$events.on(localClasses.wrap, 'click.gallery', (e, el) => {
		const $thumb = $(el),
			$thumbImage = $thumb.find('.js-gallery-thumb');

		$(localClasses.wrap).removeClass(classes.active);

		$('.js-gallery-main-image').attr({
			src: $thumbImage.attr('src'),
			alt: $thumbImage.attr('alt')
		});

		$thumb.addClass(classes.active);
	});
}

export default new RouteHandler({
	init() {
		bindEvents();
	},
	unload: 'gallery'
});