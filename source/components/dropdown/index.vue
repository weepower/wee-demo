<template>
	<select class="select dropdown" v-model="selected" @change="$emit('input', selected)">
		<option
			v-for="value in values"
			:value="value.slug"
		>{{ value.title }}</option>
	</select>
</template>

<script>
export default {
	name: 'dropdown',
	props: {
		values: { type: Array }
	},
	data() {
		return {
			selected: ''
		}
	},
	created() {
		// Set the default selected option
		this.selected = this.values[0].slug;
	},
}
</script>