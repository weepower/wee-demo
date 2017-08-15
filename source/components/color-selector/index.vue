<template lang="html">
	<div class="color-selector">
		<div
			class="color-selector__color"
			v-for="color in values"
			:class="{ '-light': color.title == 'white', '-is-active': isSelected(color.title) }"
			:style="{ backgroundColor: color.value }"
			@click="toggle(color.title)"
		></div>
	</div>
</template>

<script>
export default {
	name: 'color-selector',
	props: {
		options: {
			type: Object,
			default() {
				return {};
			}
		},
		defaultValue: {
			type: Object,
			default() {
				return {}
			}
		},
		selection: {
			type: [Object, Array],
			default() {
				return [];
			}
		},
		values: {
			type: Array
		}
	},
	/**
	 * Set default selection to first color
	 */
	mounted() {
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
			} else {
				if (this.options.multiple) {
					this.selected.push(color);
				} else {
					this.selected = [color];
				}
			}
		}
	},
	watch: {
		/**
		 * Watch the selected property to emit the input event whenever it's
		 * changed
		 */
		selected() {
			this.$emit('input', this.selected);
		}
	},
	data() {
		return {
			selected: []
		}
	}
}
</script>