<template>
    <div class="checkbox">
        <input
            :id="id"
            type="checkbox"
            class="checkbox__input"
            :name="inputValue"
            :checked="isSelected"
            @change="check"
        >
        <label
            class="checkbox__label"
            :for="id"
        >
            <span class="checkbox__title">
                {{ title }}
            </span>
        </label>
    </div>
</template>

<script>
export default {
    name: 'Checkbox',
    props: {
        inputValue: { type: String, default: '' },
        isSelected: { type: Boolean, default: false },
        prefix: { type: String, default: '' },
        title: { type: String, default: '' },
    },
    data: () => ({
        checked: false,
    }),
    computed: {
        /**
         * Generate unique id for checkbox
         * @return {string}
         */
        id() {
            return `${this.prefix.toLowerCase()}-${this.inputValue}`;
        },
    },
    watch: {
        /**
         * Make sure that checked changes when parent prop isSelected updates
         *
         * @param  {string} newValue
         */
        isSelected(newValue) {
            this.checked = newValue;
        },
    },
    mounted() {
        // Since Vue doesn't allow us to manipulate props, we must set
        // a data property to the value of the prop so that we can manipulate it.
        this.checked = this.isSelected;
    },
    methods: {
        /**
         * Toggle checkbox
         */
        check() {
            this.checked = ! this.checked;

            this.$emit('input', this.checked);
        },
    },
};
</script>
