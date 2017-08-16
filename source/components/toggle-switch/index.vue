<template>
<div class="toggle-switch">
	<div
		class="toggle-switch__item"
		:class="{ '-is-selected': selectedValue === values[0].value }"
		@click="toggle(values[0].value)"
	>
		{{ values[0].title }}
	</div>
	<div
		class="toggle-switch__item"
		:class="{ '-is-selected': selectedValue === values[1].value }"
		@click="toggle(values[1].value)"
	>
		{{ values[1].title }}
	</div>
</div>
</template>

<script>
export default {
	name: 'toggle-switch',
	props: {
		values: { type: Array },
		selection: { type: String, default: '' }
	},
	data() {
		return {
			selectedValue: ''
		};
	},
	watch: {
		/**
		 * Make sure that selectedValue changes whenever selection prop changes
		 *
		 * @param  {string} newValue
		 */
		selection(newValue) {
			this.selectedValue = newValue;
		}
	},

	mounted() {
		this.selectedValue = this.selection;
	},

	methods: {
		/**
		 * Return if item at provided index is selected
		 *
		 * @param  {number} itemNumber
		 * @return {boolean}
		 */
		isSelected(itemNumber) {
			return this.selectedValue === itemNumber;
		},

		/**
		 * Toggle selection
		 *
		 * @param  {string} newValue
		 */
		toggle(newValue) {
			this.selectedValue = this.selectedValue === newValue ? '' : newValue;

			this.$emit('input', this.selectedValue);
		}
	}
}
</script>