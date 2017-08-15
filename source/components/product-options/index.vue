<template>
	<div class="product-options">
		<product-option
			title="Size"
			type="dropdown"
			:values="product.sizes"
			v-model="size"
		/>
		<product-option
			title="Color"
			type="colorSelector"
			:values="product.colors"
			:default-value="product.colors[0]"
			v-model="color"
		/>
		<product-option
			title="Quantity"
			type="quantity"
			:values="product.quantity"
			v-model="quantity"
		/>
		<button type="button" class="button colored-button" @click="addToCart">Add to cart</button>
	</div>
</template>

<script>
import $store from 'wee-store';
import $mediator from 'wee-mediator';
import productOption from '../product-option/index.vue';

export default {
	name: 'product-options',
	components: { productOption },
	methods: {
		addToCart() {
			$mediator.emit('cart.add', {
				title: this.product.title,
				slug: this.product.slug,
				quantity: this.quantity,
				image: {
					url: this.product.images[0],
					alt: this.product.title
				}
			});
		}
	},
	data() {
		return {
			product: $store.get('product'),
			size: '',
			color: '',
			quantity: 1
		}
	}
}
</script>