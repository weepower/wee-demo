<template>
    <div class="filter">
        <h4 class="filter__title">
            {{ title }}
        </h4>
        <div class="filter__type">
            <!-- Here we can use a "dynamic component" by supplying the <component></component> tag
            and adding the "is" parameter to specify the type -->
            <component
                :is="type"
                v-model="value"
                :prefix="prefix"
                :selection="filterValue"
                :values="filterData"
                :options="filterOptions"
                @input="$emit('input', value)"
            />
        </div>
    </div>
</template>

<script>
import ToggleSwitch from '../toggle-switch/index.vue';
import CheckboxList from '../checkbox-list/index.vue';
import ColorSelector from '../color-selector/index.vue';

export default {
    name: 'Filter',
    components: { CheckboxList, ToggleSwitch, ColorSelector },
    props: {
        title: { type: String, default: '' },
        type: { type: String, default: '' },
        filterValue: { type: String, default: '' },
        filterData: { type: Array, default: () => [] },
        filterOptions: { type: Object, default: () => ({}) },
    },
    data: () => ({
        value: '',
    }),
    computed: {
        // Here we are utilizing Vue's computed properties to generate a filter
        // name based on the title
        prefix() {
            return this.title.toLowerCase() + '-filter';
        },
    },
};
</script>
