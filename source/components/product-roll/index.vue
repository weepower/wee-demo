<template lang="html">
	<div class="l-product-roll">
		<h3 class="l-product-roll__title" v-text="title"></h3>
		<div class="l-product-roll__items">
			<product-card-mini v-for="product in products" classes="l-product-roll__item" :key="product.id" :product="product"/>
		</div>
	</div>
</template>

<script>
import $fetch from 'wee-fetch';
import $store from 'wee-store';
import productCardMini from '../product-card-mini/index.vue';

export default {
	name: 'product-roll',
	components: { productCardMini },
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