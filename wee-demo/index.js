const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');
const paginate = require('./paginate');
const generateCrumbs = require('./breadcrumbs');
const db = require('./db');
const app = express();
const port = 3000;

// Set static file source
app.use(express.static(path.resolve('../public')));

// Set templating engine
nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.get('/', (req, res) => {
	res.redirect('/products');
});

// Endpoints
app.get('/products', (req, res) => {
	const index = (parseInt(req.query.page) - 1);
	const products = db.query(req.query);
	const page = products[index] !== undefined ? index : 0;
	const data = {
		products: products[page],
		paginate: paginate(page, products, req.query),
		breadcrumbs: generateCrumbs(req.path)
	};

	if (req.headers['x-pjax']) {
		data.pjax = true;
	}

	res.render('products/index.njk', data);
});

app.get('/products/:slug', (req, res, next) => {
	const breadcrumbs = generateCrumbs(req.path);
	let product = db.find(req.params.slug);

	if (product) {
		product = product[0];

		res.render('products/detail.njk', { product, breadcrumbs });
	} else {
		next();
	}
});

app.get('/ajax/products/related', (req, res) => {
	res.send(db.getRelated(req.query.ids));
});

app.get('/ajax/products/also-purchased', (req, res) => {
	res.send(db.getRandom(4));
});

// 404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => {
	console.log(`Wee demo listening on port: ${port}`);
});