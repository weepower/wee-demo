<template>
	<select class="select dropdown" v-model="selected" @change="$emit('input', selected)">
		<option
			v-for="value in values"
			v-text="value.title"
			:value="value.slug"
		></option>
	</select>
</template>

<script>
export default {
	name: 'dropdown',
	props: {
		values: {
			type: [Object, Array]
		}
	},
	/**
	 * Set the default selected option
	 */
	created() {
		this.selected = this.values[0].slug;
	},
	data() {
		return {
			selected: ''
		}
	}
}
</script>