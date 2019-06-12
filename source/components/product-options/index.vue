<template>
    <div class="product-options">
        <product-option
            v-model="size"
            title="Size"
            type="wSelect"
            :values="product.sizes"
        />
        <product-option
            v-model="color"
            title="Color"
            type="colorSelector"
            :values="product.colors"
            :default-value="product.colors[0]"
        />
        <product-option
            v-model="quantity"
            title="Quantity"
            type="quantity"
            :values="product.quantity"
        />
        <w-button
            message="Added to cart!"
            colored
            @click="addToCart"
        >
            Add to cart
        </w-button>
    </div>
</template>

<script>
import $store from 'wee-store';
import $mediator from 'wee-mediator';
import ProductOption from '../product-option/index.vue';
import WButton from '../w-button/index.vue';

export default {
    name: 'ProductOptions',
    components: { ProductOption, WButton },
    data: () => ({
        cartMessage: '',
        product: $store.get('product'),
        size: '',
        color: '',
        quantity: 1,
    }),
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
                    alt: this.product.title,
                },
            });
        },
    },
};
</script>
