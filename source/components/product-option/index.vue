<template>
	<div class="product-option">
		<h5 class="product-option__title" v-text="title"></h5>
		<component
			:is="type"
			:default-value="defaultValue"
			:values="values"
			v-model="value"
			@input="$emit('input', value)"
		/>
	</div>
</template>

<script>
import dropdown from '../dropdown/index.vue';
import colorSelector from '../color-selector/index.vue';
import quantity from '../quantity/index.vue';

export default {
	name: 'product-option',
	components: { dropdown, colorSelector, quantity },
	props: {
		defaultValue: {},
		type: {
			default: '',
			type: String
		},
		title: {
			default: '',
			type: String
		},
		values: {}
	},
	data() {
		return {
			value: ''
		}
	}
}
</script>