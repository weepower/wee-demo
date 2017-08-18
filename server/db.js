const products = require('./data/products.json');
const chunk = require('lodash.chunk');
const slugify = require('./helpers').slugify;

function cleanParams(params) {
	delete params.page;

	return params;
}

function randomProduct() {
	return products[Math.floor(Math.random() * products.length)];
}

function filter(items, query) {
	let results = items;

	if (Object.keys(query).length) {
		for (let param in query) {
			results = results.filter(item => {
				let params;

				switch (param) {
					case 'category':
					case 'gender':
						params = typeof query[param] === 'string' ? [query[param]] : query[param];

						for (let i = 0; i < params.length; i += 1) {
							if (item[param].slug === params[i]) {
								return true;
							}
						}

						return false;
					case 'color':
						params = typeof query[param] === 'string' ? [query[param]] : query[param];

						for (let i = 0; i < item.colors.length; i += 1) {
							for (let c = 0; c < params.length; c += 1) {
								if (item.colors[i].title === params[c]) {
									return true;
								}
							}
						}

						return false;
					case 'tag':
						return item.tags.filter(item => item.slug == query[param]).length;
					case 'size':
						params = typeof query[param] === 'string' ? [query[param]] : query[param];

						for (let i = 0; i < item.sizes.length; i += 1) {
							for (let s = 0; s < params.length; s += 1) {
								if (item.sizes[i].slug === params[s]) {
									return true;
								}
							}
						}

						return false;
					default:
						return item[param] == query[param];
				}
			});
		}
	}

	return results;
}

module.exports = {
	query(params) {
		const results = filter(products, cleanParams(params));

		if (results.length > 12) {
			return chunk(results, 12);
		}

		return [results];
	},

	find(slug) {
		const results = products.find((product) => product.slug === slug);

		if (results) {
			return [results]
		}

		return false;
	},

	getRelated(ids) {
		let results = [];

		products.forEach(product => {
			ids.forEach(id => {
				if (id == product.id) {
					results.push(product);
				}
			});
		});

		return [results];
	},

	getRandom(count) {
		let results = [];

		while (count-- > 0) {
			results.push(randomProduct());
		}

		return [results];
	}
}