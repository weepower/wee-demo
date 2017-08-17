<template>
<div class="checkbox-list">
	<checkbox
		v-for="item in values"
		:key="item.value"
		:title="item.title"
		:input-value="item.value"
		:prefix="prefix"
		:is-selected="selection.indexOf(item.value) > -1"
		v-model="selected[item.value]"
		@input="toggle(item.value, $event)"
	/>
</div>
</template>

<script>
import checkbox from '../checkbox/index.vue';

export default {
	name: 'checkbox-list',
	components: { checkbox },
	props: {
		prefix: { type: String },
		values: {
			type: Array,
			default() {
				return [];
			}
		},
		selection: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			selected: []
		};
	},
	watch: {
		selection(newValue) {
			this.selected = newValue;
		}
	},

	mounted() {
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
		}
	}
}
</script>