<template>
    <div class="product-option">
        <h5 class="product-option__title">
            {{ title }}
        </h5>
        <!-- Here we can use a "dynamic component" by supplying the <component></component> tag
            and adding the "is" parameter to specify the type -->
        <component
            :is="type"
            v-model="value"
            :default-value="defaultValue"
            :values="values"
            @input="$emit('input', value)"
        />
    </div>
</template>

<script>
import WSelect from '../w-select/index.vue';
import ColorSelector from '../color-selector/index.vue';
import Quantity from '../quantity/index.vue';

export default {
    name: 'ProductOption',
    components: { WSelect, ColorSelector, Quantity },
    props: {
        defaultValue: { type: Object, default: () => ({}) },
        values: { type: [Array, Number], default: null },
        type: { type: String, default: '' },
        title: { type: String, default: '' },
    },
    data: () => ({
        value: '',
    }),
};
</script>
