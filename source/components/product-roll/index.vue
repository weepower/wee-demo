<template lang="html">
    <div class="l-product-roll">
        <h3
            class="l-product-roll__title"
            v-text="title"
        />
        <div class="l-product-roll__items">
            <product-card-mini
                v-for="product in products"
                :key="product.id"
                classes="l-product-roll__item"
                :product="product"
            />
        </div>
    </div>
</template>

<script>
import $fetch from 'wee-fetch';
import $store from 'wee-store';
import ProductCardMini from '../product-card-mini/index.vue';

export default {
    name: 'ProductRoll',
    components: { ProductCardMini },
    data: () => ({
        // Here we are setting the related products from the global data store.
        related: $store.get('product').related,
        products: [],
    }),
    mounted() {
        // This is an example of how we can fetch data from the server from
        // within our component.  It's made easy with the new fetch module
        // and made cleaner by arrow functions.
        $fetch.get(this.url, {
            params: { ids: this.related },
        }).then(({ data }) => {
            const [products] = data;

            this.products = products;
        });
    },
};
</script>
