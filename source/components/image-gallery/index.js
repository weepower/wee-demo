import { RouteHandler } from 'wee-routes';
import $ from 'wee-dom';
import $events from 'wee-events';

// We store any commonly referenced class names in it's own file and import it
import { active } from '../../scripts/classes';

// Any one off class references we can store in a different variable.
const localClasses = {
    wrap: '.js-gallery-thumb-wrap',
    thumb: '.js-gallery-thumb',
    mainImage: '.js-gallery-main-image',
};

function bindEvents() {
    const { wrap, thumb, mainImage } = localClasses;

    $events.on(wrap, 'click.gallery', (e, el) => {
        const $thumb = $(el);
        const $thumbImage = $thumb.find(thumb);

        $(wrap).removeClass(active);

        $(mainImage).attr({
            src: $thumbImage.attr('src'),
            alt: $thumbImage.attr('alt'),
        });

        $thumb.addClass(active);
    });
}

export default new RouteHandler({
    init() {
        bindEvents();
    },

    // On unload, the router will attempt to remove any events or mappings that use
    // this namespace
    unload: 'gallery',
});
