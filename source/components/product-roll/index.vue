<template lang="html">
	<div class="product-roll">
		<h3 class="product-roll__title" v-text="title"></h3>
		<div class="product-roll__items">
			<a :href="`/products/${product.slug}`" class="product-roll__item" v-for="product in products">
				<img class="product-roll__image" :src="product.images[0]" :alt="product.title">
				<div class="product-roll__price">${{ product.price }}</div>
			</a>
		</div>
	</div>
</template>

<script>
import $fetch from 'wee-fetch';
import $store from 'wee-store';

export default {
	name: 'product-roll',
	mounted() {
		// This is an example of how we can fetch data from the server from
		// within our component.  It's made easy with the new fetch module
		// and made cleaner by arrow functions.
		$fetch.get(this.url, {
			params: { ids: this.related }
		}).then(response => this.products = response.data[0]);
	},
	data() {
		return {
			// Here we are setting the related products from the global data store.
			related: $store.get('product').related,
			products: []
		}
	}
}
</script>