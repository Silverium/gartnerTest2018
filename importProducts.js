const YAML = require('yamljs'); // use a tool to import yaml files
const capterraToImport = YAML.load("./feed-products/capterra.yaml"); // import the yaml file into a json object.
const softwareAdviceToImport = require('./feed-products/softwareAdvice.json');
// in order to test what happens with an already existing product, I created this object:
const existingProducts = {
  Freshdesk: {
    "categories": [
      "Customer Service",
      "Call Center"
    ],
    "twitter": "freshdesk",
    "name": "Freshdesk"
  }
};
// Normalize data, as the two different sources have different formats (title ≈ name, tags ≈ categories, twitter ≈ @twitter)
function normalizeSoftwareAdvice (product){
  const normalizedProduct = {
    name: product.title.replace(/(^|\s)\S/g, l => l.toUpperCase()),
    categories: product.categories || '?',
    twitter: (product.twitter||'').substr(1)
  }
  return normalizedProduct;
}
function normalizeCapterra (product){
  const normalizedProduct = {
    name: product.name.replace(/(^|\s)\S/g, l => l.toUpperCase()),
    categories: product.tags || '',
    twitter: (product.twitter||'')
  }
  return normalizedProduct;
}

const normalizedSA = softwareAdviceToImport.products.map(normalizeSoftwareAdvice);
const normalizedCap= capterraToImport.map(normalizeCapterra)

// loop each entry and execute the installation
const sessionsProducts = normalizedCap.concat(normalizedSA);
importProducts(sessionsProducts)
.then(()=>{
  // just to see the final output in the console
  console.log('\x1b[36m%s\x1b[0m', `existingProducts ${JSON.stringify (existingProducts,1,1)}`); // cyan comment

});

function productExists(product, products = existingProducts) {
  return !!products[product.name]; // or any kind of unique id
}

async function importProducts(products) {
  for (product of products) {
    if (!productExists(product)) {
      await addProduct(product)
      console.log('\x1b[32m%s\x1b[0m', `Importing: Name: "${product.name}"${product.categories? '; Categories: ' + product.categories : ''}${product.twitter ? '; Twitter: @' + product.twitter : '' }`); // green comment
    } else {
      console.log('\x1b[33m%s\x1b[0m', `Skipping: Name: "${product.name}"`); // yellow comment
    }
  }
  return true;
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function addProduct(product, products = existingProducts) {
  // do whatever is needed to persist. In this case I just return the new object
  products[product.name] = product;
  // Let's say it takes some time (500ms) to persist data. 
  await timeout(500);
  return products;
}

