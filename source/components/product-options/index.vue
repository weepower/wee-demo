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
		<w-button message="Added to cart!" @click="addToCart" colored>Add to cart</w-button>
	</div>
</template>

<script>
import $store from 'wee-store';
import $mediator from 'wee-mediator';
import productOption from '../product-option/index.vue';
import wButton from '../w-button/index.vue';

export default {
	name: 'product-options',
	components: { productOption, wButton },
	data() {
		return {
			cartMessage: '',
			product: $store.get('product'),
			size: '',
			color: '',
			quantity: 1
		}
	},

	methods: {
		/**
		 * Add product to cart and
		 */
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
	}
}
</script>