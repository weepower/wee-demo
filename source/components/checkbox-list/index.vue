<template>
    <div class="checkbox-list">
        <checkbox
            v-for="item in values"
            :key="item.value"
            v-model="selected[item.value]"
            :title="item.title"
            :input-value="item.value"
            :prefix="prefix"
            :is-selected="selection.indexOf(item.value) > -1"
            @input="toggle(item.value, $event)"
        />
    </div>
</template>

<script>
import checkbox from '../checkbox/index.vue';

export default {
    name: 'CheckboxList',
    components: { checkbox },
    props: {
        prefix: { type: String, default: '' },
        values: { type: Array, default: () => [] },
        selection: { type: Array, default: () => [] },
    },
    data: () => ({
        selected: [],
    }),
    watch: {
        selection(newValue) {
            this.selected = newValue;
        },
    },
    mounted() {
        // Since Vue doesn't allow us to manipulate props, we must set
        // a data property to the value of the prop so that we can manipulate it.
        this.selected = this.selection;
    },
    methods: {
        /**
         * Select/deselect checkbox
         *
         * @param  {Object} target - checkbox that was changed
         */
        toggle(value, checked) {
            if (checked && this.selected.indexOf(value) === -1) {
                this.selected.push(value);
            } else if (! checked) {
                this.selected = this.selected.filter(oldValue => oldValue !== value);
            }

            this.$emit('input', this.selected);
        },
    },
};
</script>
