<template>
<div class="cart" @click.stop="toggleList">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999">
		<path d="M214.685 402.828c-24.83 0-45.03 20.2-45.03 45.03 0 24.828 20.2 45.028 45.03 45.028s45.03-20.2 45.03-45.03c-.002-24.828-20.202-45.028-45.03-45.028zm0 64.914c-10.966 0-19.887-8.922-19.887-19.887 0-10.966 8.922-19.887 19.887-19.887s19.887 8.922 19.887 19.887c0 10.967-8.922 19.887-19.887 19.887zM372.63 402.828c-24.83 0-45.03 20.2-45.03 45.03 0 24.828 20.2 45.028 45.03 45.028s45.03-20.2 45.03-45.03c-.002-24.828-20.202-45.028-45.03-45.028zm0 64.914c-10.966 0-19.887-8.922-19.887-19.887 0-10.966 8.922-19.887 19.887-19.887 10.966 0 19.887 8.922 19.887 19.887 0 10.967-8.922 19.887-19.887 19.887zM383.716 165.755h-180.15c-6.942 0-12.57 5.628-12.57 12.57 0 6.944 5.63 12.572 12.57 12.572h180.15c6.943 0 12.57-5.628 12.57-12.57 0-6.945-5.627-12.572-12.57-12.572zM373.91 231.035H213.374c-6.943 0-12.57 5.628-12.57 12.57s5.627 12.572 12.57 12.572H373.91c6.943 0 12.57-5.628 12.57-12.57 0-6.943-5.627-12.572-12.57-12.572z"/>
		<path d="M506.34 109.744c-4.793-5.884-11.897-9.258-19.488-9.258H95.278l-7.908-38.39c-1.65-8.007-7.113-14.73-14.614-17.988L17.58 20.158c-6.37-2.767-13.774.156-16.537 6.524-2.766 6.37.157 13.774 6.524 16.537l55.178 23.95 60.826 295.26c2.397 11.63 12.753 20.07 24.626 20.07h301.166c6.943 0 12.57-5.63 12.57-12.572 0-6.943-5.627-12.57-12.57-12.57H148.197l-7.4-35.917H451.69c11.872 0 22.23-8.44 24.624-20.067l35.163-170.675c1.53-7.432-.34-15.07-5.136-20.954zM451.69 296.3H135.62l-35.162-170.673H486.85l-35.16 170.674z"/>
	</svg>
	<span class="cart__count" v-if="totalItems > 0">{{ totalItems }}</span>
	<ul class="cart__list js-cart-list" :class="{ 'js-hide': isHidden }">
		<li class="cart__item" v-for="(item, key) in items" v-if="items.length > 0">
			<img :src="item.image.url" :alt="item.image.alt" class="cart__item-image">
			<div class="cart__item-meta">
				<a :href="getProductUrl(item.slug)" class="cart__item-name">{{ item.title }}</a>
				<div class="cart__item-qty">Qty: {{ item.quantity }}</div>
				<a href="#" class="cart__item-remove" @click.prevent.stop="removeItem(key)">Remove</a>
			</div>
		</li>
		<li class="cart__empty" v-if="! items.length">
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
	mounted() {
		let data = cartStore.get('items');

		if (data) {
			this.items = data;
		}

		$mediator.on('cart.add', this.update);
		$mediator.on('navigation', this.hideList);
	},
	data() {
		return {
			greeting: 'Hello',
			isHidden: true,
			items: []
		}
	},
	computed: {
		totalItems() {
			return this.items.length;
		}
	},

	watch: {
		isHidden(value) {
			if (value === true) {
				this.disableBodyEvent();
			} else {
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

	methods: {
		disableBodyEvent() {
			$events.off('body', 'body.cart');
			$events.off('window', 'scroll.cart');
		},
		getProductUrl(itemSlug) {
			return `${uri().origin}/products/${itemSlug}`;
		},
		hideList() {
			this.isHidden = true;
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

			this.isHidden = ! this.isHidden;
		},
		update(newItem) {
			this.items.push(newItem);
			cartStore.set('items', this.items);
		}
	}
}
</script>