<template>
<div class="checkbox">
	<input type="checkbox" class="checkbox__input" :name="inputValue" :id="id" :checked="isSelected" @change="check">
	<label class="checkbox__label" :for="id">
		<span class="checkbox__title">{{ title }}</span>
	</label>
</div>
</template>

<script>
export default {
	name: 'checkbox',
	props: {
		inputValue: { type: String },
		isSelected: { type: Boolean },
		prefix: { type: String },
		title: { type: String }
	},
	data() {
		return {
			checked: false
		};
	},
	computed: {
		/**
		 * Generate unique id for checkbox
		 * @return {string}
		 */
		id() {
			return `${this.prefix.toLowerCase()}-${this.inputValue}`;
		}
	},
	watch: {
		/**
		 * Make sure that checked changes when parent prop isSelected updates
		 *
		 * @param  {string} newValue
		 */
		isSelected(newValue) {
			this.checked = newValue;
		}
	},
	mounted() {
		this.checked = this.isSelected;
	},
	methods: {
		/**
		 * Toggle checkbox
		 */
		check() {
			this.checked = ! this.checked;

			this.$emit('input', this.checked);
		}
	}
}
</script>