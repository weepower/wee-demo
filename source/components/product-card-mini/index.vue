<template>
	<a :href="`/products/${product.slug}`" :class="['product-card-mini', classes]">
		<img class="product-card-mini__image" :src="product.images[0]" :alt="product.title">
		<div class="product-card-mini__price">${{ product.price }}</div>
	</a>
</template>

<script>
export default {
	props: {
		classes: { type: String, default: '' },
		product: { type: Object }
	},
	data() {
		return {};
	}
}
</script>