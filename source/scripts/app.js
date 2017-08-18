import $router from 'wee-routes';
import $mediator from 'wee-mediator';
import './bootstrap';
import header from '../components/header';
import cart from '../components/cart';
import filters from '../components/filters';
import productIndex from '../components/product-index';
import imageGallery from '../components/image-gallery';
import productOptions from '../components/product-options';
import relatedProducts from '../components/related-products';
import alsoPurchased from '../components/also-purchased';

$router({
	transition: {
		target: '.content',
		class: '-is-loading',
		timeout: 200
	}
}).pjax({
	partials: ['.content']
}).beforeEach((to, from, next) => {
	$mediator.emit('navigation');
	next();
}).map([
	{
		path: '/products',
		handler: [header, cart, filters, productIndex]
	},
	{
		path: '/products/:slug',
		handler: [header, cart, imageGallery, productOptions, relatedProducts, alsoPurchased]
	}
]).run();