<template>
	<dropdown :values="options" v-model="selected" @input="$emit('input', selected)"/>
</template>

<script>
import dropdown from '../dropdown/index.vue';

export default {
	name: 'quantity',
	components: { dropdown },
	props: ['values'],
	/**
	 * Set the options for the dropdown
	 */
	created() {
		for (let i = 0; i < this.values; i += 1) {
			let value = i + 1;

			this.options.push({ title: value, slug: value});
		}
	},
	data() {
		return {
			options: [],
			selected: 0
		}
	}
}
</script>