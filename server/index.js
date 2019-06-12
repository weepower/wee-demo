const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');
const childProcess = require('child_process');
const paginate = require('./paginate');
const generateCrumbs = require('./breadcrumbs');
const db = require('./db');
const app = express();
const port = 3000;
const args = new Set();
process.argv.filter(arg => arg.includes('--')).forEach((arg) => {
    args.add(arg.replace('--', ''));
});

// Set static file source
app.use(express.static(path.resolve(__dirname + '/../public')));

// Set templating engine
nunjucks.configure(path.resolve(__dirname + '/views'), {
    autoescape: true,
    express: app
});

// app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.redirect('/products');
});

// Endpoints
app.get('/products', (req, res, next) => {
    const pageQuery = req.query.page;
    const index = (parseInt(req.query.page) - 1);
    const products = db.query(req.query);

    // 404 if page does not exist
    if (pageQuery && ! products.hasOwnProperty(index)) {
        return next();
    }

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
        res.status(404).render('404.njk');
    }
});

app.get('/cart', (req, res) => {
    res.render('cart/index.njk');
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

    if (args.has('launch')) {
        childProcess.exec(`open -a "Google Chrome" http://localhost:${port}`, (error) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
        });
    }
});
