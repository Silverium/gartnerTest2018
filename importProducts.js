const origin = process.argv[2];
const route = process.argv[3];
const sessionsProducts = [];

// as it stems from the predicate of the exercise,
// the cli should request one type of import and one route
switch (origin) {
  case 'capterra':
    pushCapterra(sessionsProducts);
    break;
  case 'softwareAdvice':
    pushSA(sessionsProducts);
    break;
  default:
    console.log('\x1b[31m%s\x1b[0m', `Unknown origin ${origin}`); // red comment

}


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

function pushCapterra(arr) {
  const capterraController = require('./app/capterra');
  const products = capterraController.getAllNormalized(route)
  arr.push(...products);
  return arr;
}

function pushSA(arr) {
  const sAController = require('./app/softwareAdvice');
  const products = sAController.getAllNormalized(route)
  arr.push(...products);
  return arr;
}

// loop each entry and execute the installation
importProducts(sessionsProducts)
  .then(() => {
    // just to see the final output in the console
    console.log('\x1b[36m%s\x1b[0m', `existingProducts ${JSON.stringify(existingProducts, 1, 1)}`); // cyan comment

  });

function productExists(product, products = existingProducts) {
  return !!products[product.name]; // or any kind of unique id
}

async function importProducts(products) {
  for (product of products) {
    if (!productExists(product)) {
      await addProduct(product)
      console.log('\x1b[32m%s\x1b[0m', `Importing: Name: "${product.name}"${product.categories ? '; Categories: ' + product.categories : ''}${product.twitter ? '; Twitter: @' + product.twitter : ''}`); // green comment
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

