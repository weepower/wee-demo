<template>
    <select
        v-model="selected"
        class="select w-select"
        @change="$emit('input', selected)"
    >
        <option
            v-for="(value, key) in values"
            :key="key"
            :value="value.slug"
        >
            {{ value.title }}
        </option>
    </select>
</template>

<script>
export default {
    name: 'WSelect',
    props: {
        values: { type: Array, default: () => [] },
    },
    data: () => ({
        selected: '',
    }),
    created() {
        // Set the default selected option
        this.selected = this.values[0].slug;
    },
};
</script>
