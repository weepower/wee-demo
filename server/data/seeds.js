const faker = require('faker');
const fs = require('fs');
const path = require('path');
const slugify = require('../helpers').slugify;

const ids = new Set();
const products = createBaseProducts();

function randomSizes() {
    const sizes = [
        {
            title: 'Small',
            slug: 'small',
        },
        {
            title: 'Medium',
            slug: 'medium',
        },
        {
            title: 'Large',
            slug: 'large',
        },
        {
            title: 'X Large',
            slug: 'x-large',
        },
    ];
    const results = [];

    sizes.forEach((size) => {
        if (Math.random() > 0.5) {
            results.push(size);
        }
    });

    // Make sure there is at least one size in product
    while (results.length < 3) {
        const newSize = faker.random.arrayElement(sizes);

        if (! results.find(size => size.slug === newSize.slug)) {
            results.push(newSize);
        }
    }

    return results;
}

function createId() {
    const min = 100;
    const max = 10000;
    let id = faker.random.number({ min, max });

    // Ensure uniqueness
    while (ids.has(id)) {
        id = faker.random.number({ min, max });
    }

    return id;
}

function generateTags() {
    const tags = [];
    const possibleTags = [{
        title: 'New',
        slug: 'new',
    }, {
        title: 'Best Seller',
        slug: 'best-seller',
    }];

    if (Math.random() >= 0.5) {
        const random = faker.random.arrayElement(possibleTags);

        tags.push(random);

        possibleTags.splice(possibleTags.indexOf(random), 1);
    }

    if (Math.random() >= 0.8) {
        tags.push(faker.random.arrayElement(possibleTags));
    }

    return tags;
}

function getImage(product) {
    const type = product.category.slug.replace(/s$/, '');
    const images = [];

    product.colors.forEach((color) => {
        images.push(`/local-assets/images/products/${type}-${color.title}.jpg`);
    });

    return images;
}

function createBaseProducts() {
    const genders = ['Unisex', "Women's", "Men's"];
    const shirtVariants = ['Slim Fit', 'Long Sleeve', 'Short Sleeve'];
    const shirtTypes = ['Pocket', 'Jersey', 'V Neck', 'Crew Neck', 'Ringer', 'Polo', 'Henley'];
    const hatTypes = ['Fitted', 'Snapback', 'Trucker', 'Stretch Fit', 'Knit', 'One Size'];
    const hoodieVariants = ['Zip Front', 'Pullover'];
    const products = [];

    genders.forEach((gender) => {
        shirtVariants.forEach((variant) => {
            shirtTypes.forEach((type) => {
                const title = `${gender} ${variant} ${type} Shirt`;

                products.push({
                    title,
                    slug: slugify(title),
                    category: {
                        title: 'Shirts',
                        slug: 'shirts',
                    },
                    gender: {
                        title: gender,
                        slug: slugify(gender),
                    },
                    tags: generateTags(),
                });
            });
        });
    });

    hatTypes.forEach((type) => {
        const title = `${type} Hat`;

        products.push({
            title,
            slug: title.toLowerCase().replace(/\s+/g, '-'),
            category: {
                title: 'Hats',
                slug: 'hats',
            },
            gender: {
                title: 'Unisex',
                slug: 'unisex',
            },
            tags: generateTags(),
        });
    });

    hoodieVariants.forEach((type) => {
        const title = `${type} Hat`;

        products.push({
            title,
            slug: title.toLowerCase().replace(/\s+/g, '-'),
            category: {
                title: 'Hoodies',
                slug: 'hoodies',
            },
            gender: {
                title: 'Unisex',
                slug: 'unisex',
            },
            tags: generateTags(),
        });
    });

    return products;
}

function selectColors() {
    const result = [];
    const colors = [
        { title: 'yellow', value: '#ff9B57' },
        { title: 'blue', value: '#687cdb' },
        { title: 'red', value: '#ee5b5b' },
        { title: 'black', value: '#212121' },
        { title: 'grey', value: '#bebebe' },
        { title: 'white', value: '#f9f9f9' },
    ];

    while (result.length < 3) {
        const index = Math.floor(Math.random() * colors.length);

        result.push(colors[index]);
        colors.splice(index, 1);
    }

    return result;
}

function selectRelated() {
    const related = [];

    for (let i = 0; i < 4; i++) {
        let product = faker.random.arrayElement(products);

        while (related.includes(product.id)) {
            product = faker.random.arrayElement(products);
        }

        related.push(product.id);
    }

    return related;
}

products.forEach((product) => {
    product.id = createId();
    product.price = faker.random.number({ min: 25, max: 45 });
    product.colors = selectColors();
    product.sizes = randomSizes();
    product.description = faker.lorem.sentences(7);
    product.quantity = faker.random.number({ min: 0, max: 50 });
    product.images = getImage(product);
});

products.forEach((product) => {
    product.related = selectRelated();
});

const count = products.length;

fs.writeFileSync(path.resolve('./data/products.json'), JSON.stringify(products), 'utf8');

console.log(`${count} products seeded!`);
