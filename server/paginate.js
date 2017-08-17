const queryString = require('query-string');
/**
 * Generate object of paginated urls
 *
 * @param start
 * @param end
 * @param totalPages
 * @returns {{}}
 */
function rangeUrls(start, end, totalPages, params) {
	let urls = {};

	if (start < 1) {
		start = 1;
	}

	if (end > totalPages) {
		end = totalPages;
	}

	for (let page = start; page <= end; page += 1) {
		urls[page] = getPageUrl(page, totalPages, params);
	}

	return urls;
}

/**
 * Build page url
 *
 * @param page
 * @param totalPages
 * @returns {string}
 */
function getPageUrl(page, totalPages, params) {
	let path = '/products';
	let query = queryString.stringify(params);

	if (page < 1 || page > totalPages) {
		return false;
	}

	if (page > 1 && page <= totalPages) {
		path += `?page=${page}`;
	}

	if (query && page > 0) {
		let seperator = page > 1 ? '&' : '?';

		path += seperator + query;
	}

	return path;
}

/**
 * Build pagination object
 *
 * @param page
 * @param items
 * @returns {*}
 */
function paginate(page, items, params = {}) {
	const currentPage = page + 1;
	const totalPages = items.length;

	return {
		currentPage,
		totalPages,
		getNextUrls(pages) {
			let end;

			if (pages) {
				end = currentPage + pages;
			} else {
				end = totalPages;
			}

			return rangeUrls((currentPage + 1), end, totalPages, params);
		},
		getPrevUrls(pages) {
			let start;

			if (pages) {
				start = currentPage - pages;
			} else {
				start = 1;
			}

			return rangeUrls(start, (currentPage - 1), totalPages, params);
		},
		nextUrl: getPageUrl((currentPage + 1), totalPages, params),
		prevUrl: getPageUrl((currentPage - 1), totalPages, params)
	}
}

module.exports = paginate;