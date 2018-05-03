'use strict';

const YAML = require('yamljs'); // use a tool to import yaml files

function loadData(url) {
  return YAML.load(url);
}
exports.loadData = loadData;


// Normalize data, as the two different sources have different formats (title ≈ name, tags ≈ categories, twitter ≈ @twitter)
function normalizeData(product) {
  const normalizedProduct = {
    name: product.name.replace(/(^|\s)\S/g, l => l.toUpperCase()),
    categories: product.tags || '?',
    twitter: (product.twitter || '')
  };
  return normalizedProduct;
}
exports.normalizeData = normalizeData;


function getAllNormalized(url) {
  const products = loadData(url);
  const normalizedProducts = products.map(normalizeData);
  return normalizedProducts;
}
exports.getAllNormalized = getAllNormalized;