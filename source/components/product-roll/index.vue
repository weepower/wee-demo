<template lang="html">
	<div class="product-roll">
		<h3 class="product-roll__title" v-text="title"></h3>
		<div class="product-roll__inner">
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
		$fetch.get(this.url, {
			params: { ids: this.related }
		}).then(response => this.products = response.data[0]);
	},
	data() {
		return {
			related: $store.get('product').related,
			products: []
		}
	}
}
</script>