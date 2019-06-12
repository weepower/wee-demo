<template>
    <div class="filters">
        <h3 class="filters__title">
            Filters
        </h3>
        <a
            v-if="hasSelection"
            href="#"
            class="filters__clear"
            @click.prevent="resetSelections"
        >
            Reset Filters
        </a>
        <filter-section
            title="Featured"
            type="toggle-switch"
            :filter-data="tags"
            :filter-value="selections.tag"
            @input="update('tag', $event)"
        />
        <filter-section
            title="Category"
            type="checkbox-list"
            :filter-data="categories"
            :filter-value="selections.category"
            @input="update('category', $event)"
        />
        <filter-section
            title="Size"
            type="checkbox-list"
            :filter-data="sizes"
            :filter-value="selections.size"
            @input="update('size', $event)"
        />
        <filter-section
            title="Gender"
            type="checkbox-list"
            :filter-data="genders"
            :filter-value="selections.gender"
            @input="update('gender', $event)"
        />
        <filter-section
            title="Color"
            type="color-selector"
            :filter-data="colors"
            :filter-value="selections.color"
            :filter-options="{ multiple: true }"
            @input="update('color', $event)"
        />
    </div>
</template>

<script>
import {
    $copy,
    $isArray,
    $serialize,
} from 'core/types';
import $router from 'wee-routes';
import { uri } from 'wee-location';
import FilterSection from '../filter/index.vue';

const selectionOptions = {
    tag: '',
    gender: [],
    size: [],
    category: [],
    color: [],
};
const url = '/products';

const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export default {
    name: 'Filters',
    components: { FilterSection },
    data: () => ({
        genders: [
            { title: 'Unisex', value: 'unisex' },
            { title: "Women's", value: 'womens' },
            { title: "Men's", value: 'mens' },
        ],
        sizes: [
            { title: 'Small', value: 'small' },
            { title: 'Medium', value: 'medium' },
            { title: 'Large', value: 'large' },
            { title: 'X Large', value: 'x-large' },
        ],
        categories: [
            { title: 'Shirts', value: 'shirts' },
            { title: 'Hats', value: 'hats' },
            { title: 'Hoodies', value: 'hoodies' },
        ],
        tags: [
            { title: 'New', value: 'new' },
            { title: 'Best Seller', value: 'best-seller' },
        ],
        colors: [
            { title: 'yellow', value: '#ff9B57' },
            { title: 'blue', value: '#687cdb' },
            { title: 'red', value: '#ee5b5b' },
            { title: 'black', value: '#212121' },
            { title: 'grey', value: '#bebebe' },
            { title: 'white', value: '#f9f9f9' },
        ],
        selections: $copy(selectionOptions),
    }),

    computed: {
        /**
         * Get currently selected filters from query string of URL
         *
         * @return {Object} queryParams
         */
        currentFilters() {
            const queryParams = uri().query;

            return this.normalizeFilters(queryParams);
        },

        /**
         * Determine if any filter has been selected
         *
         * @return {boolean}
         */
        hasSelection() {
            let hasSelection = false;

            Object.keys(this.selections).forEach((key) => {
                if (this.selections[key].length) {
                    hasSelection = true;
                }
            });

            return hasSelection;
        },
    },

    created() {
        this.refreshSelections();
    },

    methods: {
        /**
         * Reset selections
         */
        resetSelections() {
            this.selections = $copy(selectionOptions);

            $router.push({ path: url });
        },

        /**
         * Strip out query string parameters not related to filters
         *
         * @param  {Object} params - uri().query
         * @return {Object}
         */
        normalizeFilters(params) {
            Object.keys(params).forEach((key) => {
                if (! hasOwn(this.selections, key)) {
                    delete params[key];
                }
            });

            return params;
        },

        /**
         * Update selections based on current query params
         *
         * @param  {Object} [newFilters=null]
         */
        refreshSelections(newFilters = null) {
            let filters = $copy(this.currentFilters);

            if (newFilters) {
                filters = this.normalizeFilters(newFilters);
            }

            // Ensure filters has all properties from selection
            Object.keys(this.selections).forEach((key) => {
                if (! hasOwn(filters, key)) {
                    filters[key] = $isArray(this.selections[key]) ? [] : '';
                }
            });

            this.selections = filters;
        },

        /**
         * Update filtering
         *
         * @param  {string} key
         * @param  {string|Array} value
         */
        update(key, value) {
            const params = uri().query;

            // Don't allow properties to be added that
            // were not in original data model
            if (hasOwn(this.selections, key)) {
                this.selections[key] = value;
                params[key] = value;
            }

            // Assumed that all filters are either string or array
            // so we can check length
            if (! value.length) {
                delete params[key];
            }

            $router.push({
                path: Object.keys(params).length ? `${url}?${$serialize(params)}` : url,
            });
        },
    },
};
</script>
