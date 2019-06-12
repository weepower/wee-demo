function slugify(str) {
    return str.toLowerCase().replace(/[^\w ]+/g,'').replace(/\s+/g, '-')
}

module.exports = {
    slugify
}
