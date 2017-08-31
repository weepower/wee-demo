<template>
<div class="cart" @click.stop="toggleList">
	<span class="cart__count" v-if="totalItems > 0">{{ totalItems }}</span>
	<ul class="cart__list js-cart-list" v-show="shown">
		<li class="cart__item" v-for="(item, key) in items" v-if="totalItems > 0">
			<img :src="item.image.url" :alt="item.image.alt" class="cart__item-image">
			<div class="cart__item-meta">
				<a :href="getProductUrl(item.slug)" class="cart__item-name">{{ item.title }}</a>
				<div class="cart__item-qty">Qty: {{ item.quantity }}</div>
				<a href="#" class="cart__item-remove" @click.prevent.stop="removeItem(key)">Remove</a>
			</div>
		</li>
		<li class="cart__empty" v-if="! totalItems">
			The cart is empty
		</li>
	</ul>
</div>
</template>

<script>
import $ from 'wee-dom';
import $events from 'wee-events';
import $mediator from 'wee-mediator';
import { uri } from 'wee-location';
import { cartStore } from './index.js';

export default {
	name: 'cart',
	data() {
		return {
			shown: false,
			items: []
		};
	},
	computed: {
		totalItems() {
			return this.items.length;
		}
	},

	watch: {
		shown(value) {
			if (value === false) {
				this.disableBodyEvent();
			} else {
				// Here, we need to define some additional event bindings that
				// are outside of the confines of the module.  This is okay.
				$events.on({
					body: {
						click: this.hideList
					},
					window: {
						scroll: this.hideList
					}
				}, {
					namespace: 'cart'
				});
			}
		}
	},

	mounted() {
		let data = cartStore.get('items');

		if (data) {
			this.items = data;
		}

		// Here we define our mediator events
		$mediator.on('cart.add', this.update);
		$mediator.on('navigation', this.hideList);
	},

	methods: {
		disableBodyEvent() {
			$events.off('body', 'body.cart');
			$events.off('window', 'scroll.cart');
		},
		getProductUrl(itemSlug) {
			return `${uri().origin}/products/${itemSlug}`;
		},
		hideList() {
			this.shown = false;
		},
		removeItem(index) {
			this.items.splice(index, 1);
			cartStore.set('items', this.items);
		},
		toggleList(e) {
			// Prevent closing cart list when clicking cart list directly
			if ($(e.target).closest('.js-cart-list').length) {
				return;
			}

			this.shown = ! this.shown;
		},
		update(newItem) {
			this.items.push(newItem);
			cartStore.set('items', this.items);
		}
	}
}
</script>