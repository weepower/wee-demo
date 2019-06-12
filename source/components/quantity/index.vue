<template>
    <w-select
        v-model="selected"
        :values="options"
        @input="$emit('input', selected)"
    />
</template>

<script>
import WSelect from '../w-select/index.vue';

export default {
    name: 'Quantity',
    components: { WSelect },
    props: {
        values: { type: [Array, Number], default: null },
    },
    data: () => ({
        options: [],
        selected: 0,
    }),
    created() {
        // This might be considered a "wrapper" component.
        // We can use our generic w-select component, but we need
        // to massage the data into the correct format.
        for (let i = 0; i < this.values; i += 1) {
            const value = i + 1;

            this.options.push({ title: value, slug: value });
        }
    },
};
</script>
