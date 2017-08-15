<template>
<div class="checkbox">
	<input type="checkbox" class="checkbox__input" :name="inputValue" :checked="isSelected" @change="check" :id="id">
	<label :for="id" class="checkbox__label">
		<span class="checkbox__title" v-text="title"></span>
	</label>
</div>
</template>

<script>
export default {
	name: 'checkbox',
	props: {
		inputValue: {
			type: String
		},
		isSelected: {
			type: Boolean
		},
		prefix: {
			type: String
		},
		title: {
			type: String
		}
	},
	data() {
		return {
			checked: false
		};
	},
	mounted() {
		this.checked = this.isSelected;
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
	computed: {
		/**
		 * Generate unique id for checkbox
		 * @return {string}
		 */
		id() {
			return `${this.prefix.toLowerCase()}-${this.inputValue}`;
		}
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