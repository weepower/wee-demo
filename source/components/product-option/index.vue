<template>
	<div class="product-option">
		<h5 class="product-option__title">{{ title }}</h5>
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
import wSelect from '../w-select/index.vue';
import colorSelector from '../color-selector/index.vue';
import quantity from '../quantity/index.vue';

export default {
	name: 'product-option',
	components: { wSelect, colorSelector, quantity },
	props: {
		defaultValue: null,
		values: null,
		type: { type: String, default: '' },
		title: { type: String, default: '' }
	},
	data() {
		return {
			value: ''
		}
	}
}
</script>