<template>
    <div class="color-selector">
        <div
            v-for="(color, i) in values"
            :key="i"
            class="color-selector__color"
            :class="{ '-light': color.title == 'white', '-is-active': isSelected(color.title) }"
            :style="{ backgroundColor: color.value }"
            @click="toggle(color.title)"
        />
    </div>
</template>

<script>
export default {
    name: 'ColorSelector',
    props: {
        values: { type: Array, default: () => [] },
        options: { type: Object, default: () => ({}) },
        defaultValue: { type: Object, default: () => ({}) },
        selection: { type: Array, default: () => [] },
    },
    data: () => ({
        selected: [],
    }),
    watch: {
        /**
         * Watch the selected property to emit the input event whenever it's
         * changed
         */
        selected() {
            this.$emit('input', this.selected);
        },
    },
    mounted() {
        // Since Vue doesn't allow us to manipulate props, we must set
        // a data property to the value of the prop so that we can manipulate it.
        if (this.defaultValue.title) {
            this.selected.push(this.defaultValue.title);
        }

        if (this.selection.length) {
            this.selection.forEach((selection) => {
                this.values.forEach((value) => {
                    if (value.title === selection) {
                        this.selected.push(selection);
                    }
                });
            });
        }
    },
    methods: {
        /**
         * Check the selected colors to determine whether color is selected
         *
         * @param color
         */
        isSelected(color) {
            return this.selected.indexOf(color) > -1;
        },

        /**
         * Select a color if no color is selected, otherwise deselect the color and
         * pass the event to the parent component
         *
         * @param color
         */
        toggle(color) {
            if (this.isSelected(color)) {
                this.selected.splice(this.selected.indexOf(color), 1);
            } else if (this.options.multiple) {
                this.selected.push(color);
            } else {
                this.selected = [color];
            }
        },
    },
};
</script>
