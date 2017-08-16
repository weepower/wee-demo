function generateCrumbs(path) {
	let segments = path.split('/');
	segments.splice(0, 1);
	segments.splice((segments.length - 1), 1);

	let crumbs = [{ url: '/', title: 'Home' }];

	if (segments.length) {
		segments = segments.map(segment => {
			return {
				url: '/' + segment,
				title: segment.charAt(0).toUpperCase() + segment.slice(1)
			}
		});

		crumbs.push(...segments);
	}

	crumbs.push({
		title: 'Here'
	});

	return crumbs;
}

module.exports = generateCrumbs;