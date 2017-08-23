import { RouteHandler } from 'wee-routes';
import $ from 'wee-dom';
import $events from 'wee-events';

// We store any commonly referenced class names in it's own file and import it
import classes from '../../scripts/classes';

// Any one off class references we can store in a different variable.
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
	// On unload, the router will attempt to remove any events or mappings that use
	// this namespace
	unload: 'gallery'
});