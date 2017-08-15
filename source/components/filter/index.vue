<template>
<div class="filter">
	<h4 class="filter__title">{{ title }}</h4>
	<div class="filter__type">
		<component
			:is="filterType"
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
	components: {
		checkboxList,
		toggleSwitch,
		colorSelector
	},
	props: {
		title: {
			type: String,
			default: ''
		},
		filterType: {
			type: String,
			default: ''
		},
		filterData: {
			type: Array,
			default() {
				return []
			}
		},
		filterValue: {},
		filterOptions: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			value: ''
		};
	},
	computed: {
		prefix() {
			return this.title.toLowerCase() + '-filter';
		}
	}
}
</script>