<template>
	<w-select :values="options" v-model="selected" @input="$emit('input', selected)"/>
</template>

<script>
import wSelect from '../w-select/index.vue';

export default {
	name: 'quantity',
	components: { wSelect },
	props: {
		values: null
	},
	data() {
		return {
			options: [],
			selected: 0
		}
	},
	created() {
		// Set the options for the dropdown
		for (let i = 0; i < this.values; i += 1) {
			let value = i + 1;

			this.options.push({ title: value, slug: value});
		}
	},
}
</script>