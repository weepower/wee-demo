<template>
<div class="filter">
	<h4 class="filter__title">{{ title }}</h4>
	<div class="filter__type">
		<!-- Here we can use a "dynamic component" by supplying the <component></component> tag
			and adding the "is" parameter to specify the type -->
		<component
			:is="type"
			:prefix="prefix"
			:selection="filterValue"
			:values="filterData"
			:options="filterOptions"
			v-model="value"
			@input="$emit('input', value)"
		/>
	</div>
</div>
</template>

<script>
import toggleSwitch from '../toggle-switch/index.vue';
import checkboxList from '../checkbox-list/index.vue';
import colorSelector from '../color-selector/index.vue';

export default {
	name: 'filter',
	components: { checkboxList, toggleSwitch, colorSelector },
	props: {
		title: { type: String, default: '' },
		type: { type: String, default: '' },
		filterValue: null,
		filterData: {
			type: Array,
			default() {
				return [];
			}
		},
		filterOptions: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {
			value: ''
		};
	},
	computed: {
		// Here we are utilizing Vue's computed properties to generate a filter
		// name based on the title
		prefix() {
			return this.title.toLowerCase() + '-filter';
		}
	}
}
</script>