// TypeScript code with type definitions
type Product = {
  name: string;
  price: number;
};

type ProductList = Product[];

const products: ProductList = [];

function addProduct() {
  const productNameInput = document.getElementById('productName') as HTMLInputElement;
  const productPriceInput = document.getElementById('productPrice') as HTMLInputElement;

  const productName = productNameInput.value.trim();
  const productPrice = parseFloat(productPriceInput.value);

  if (productName && !isNaN(productPrice)) {
    products.push({ name: productName, price: productPrice });
    productNameInput.value = '';
    productPriceInput.value = '';
    updateEnteredProductsList();
  }
}

function getCheapestProduct(products: ProductList): string | undefined {
  if (products.length === 0) {
    return undefined;
  }

  const cheapestProduct = products.reduce((minProduct, currentProduct) => {
    return currentProduct.price < minProduct.price ? currentProduct : minProduct;
  });

  return cheapestProduct.name;
}

function calculateAveragePrice(products: ProductList): number {
  if (products.length === 0) {
    return 0;
  }

  const totalPrices = products.reduce((sum, product) => sum + product.price, 0);
  return totalPrices / products.length;
}

function calculateStandardDeviation(products: ProductList, averagePrice: number): number {
  if (products.length === 0) {
    return 0;
  }

  const squaredDifferences = products.map(product => Math.pow(product.price - averagePrice, 2));
  const variance = squaredDifferences.reduce((sum, squaredDiff) => sum + squaredDiff, 0) / products.length;
  return Math.sqrt(variance);
}

function calculateResults() {
  const cheapestProductName = getCheapestProduct(products);
  const averagePrice = calculateAveragePrice(products);
  const standardDeviation = calculateStandardDeviation(products, averagePrice);

  const resultContainer = document.getElementById('resultContainer');
  if (resultContainer) {
    resultContainer.innerHTML = `
      <p>Fantázianév a legolcsóbb terméknél: ${cheapestProductName || 'Nincs termék'}</p>
      <p>Átlagár: ${averagePrice.toFixed(2)}</p>
      <p>Árak szórása: ${standardDeviation.toFixed(2)}</p>
    `;
  }

  updateEnteredProductsList(); // Update the entered products list
}

function updateEnteredProductsList() {
  const productList = document.getElementById('productList');

  // Clear the list
  if (productList) {
    productList.innerHTML = '';

    // Add each entered product to the list
    products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.textContent = `${product.name} - ${product.price.toFixed(2)} Ft`;
      if (productList) {
        productList.appendChild(listItem);
      }
    });
  }
}
