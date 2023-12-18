// Tömb a termékek tárolásához
var products = [];

// Függvény a termék hozzáadásához
function addProduct() {
    // Termék nevének és árának lekérése az űrlapról
    var productNameInput = document.getElementById('productName');
    var productPriceInput = document.getElementById('productPrice');
    var productName = productNameInput.value.trim();
    var productPrice = parseFloat(productPriceInput.value);

    // Ellenőrzés: a név nem lehet üres, és az ár egy érvényes szám
    if (productName && !isNaN(productPrice)) {
        products.push({ name: productName, price: productPrice }); // Új termék hozzáadása a tömbhöz
        productNameInput.value = '';   // Űrlap mezők ürítése
        productPriceInput.value = '';
        updateEnteredProductsList();// Beírt termékek listájának frissítése 
    }
}

// Függvény a legolcsóbb termék nevének lekéréséhez
function getCheapestProduct(products) {
    // Ellenőrzés: van-e termék a tömbben
    if (products.length === 0) {
        return undefined;
    }
    // Legolcsóbb termék kiválasztása
    var cheapestProduct = products.reduce(function (minProduct, currentProduct) {
        return currentProduct.price < minProduct.price ? currentProduct : minProduct;
    });
    return cheapestProduct.name;
}

// Függvény az átlagár kiszámolásához
function calculateAveragePrice(products) {
    if (products.length === 0) {
        return 0;
    }
    // Összegzés: termékek árainak összege
    var totalPrices = products.reduce(function (sum, product) { return sum + product.price; }, 0);
    // Átlag kiszámolása
    return totalPrices / products.length;
}

// Függvény az árak szórásának kiszámolásához
function calculateStandardDeviation(products, averagePrice) {
    if (products.length === 0) {
        return 0;
    }
    var squaredDifferences = products.map(function (product) { return Math.pow(product.price - averagePrice, 2); });
    // Váriancia kiszámolása
    var variance = squaredDifferences.reduce(function (sum, squaredDiff) { return sum + squaredDiff; }, 0) / products.length;
    // Szórás kiszámolása
    return Math.sqrt(variance);
}

// Eredmények kiszámolása és megjelenítése
function calculateResults() {
    var cheapestProductName = getCheapestProduct(products);
    var averagePrice = calculateAveragePrice(products);
    var standardDeviation = calculateStandardDeviation(products, averagePrice);
    var resultContainer = document.getElementById('resultContainer');
    if (resultContainer) {
        resultContainer.innerHTML = "\n      <p>Fant\u00E1zian\u00E9v a legolcs\u00F3bb term\u00E9kn\u00E9l: ".concat(cheapestProductName || 'Nincs termék', "</p>\n      <p>\u00C1tlag\u00E1r: ").concat(averagePrice.toFixed(2), "</p>\n      <p>\u00C1rak sz\u00F3r\u00E1sa: ").concat(standardDeviation.toFixed(2), "</p>\n    ");
    }
    updateEnteredProductsList(); // Beírt termékek listájának frissítése
}

// Beírt termékek listájának frissítése
function updateEnteredProductsList() {
   // Beírt termékek listájának elem lekérése
    var productList = document.getElementById('productList');
    // Lista tartalmának törlése
    if (productList) {
        productList.innerHTML = '';
        // Minden beírt termék hozzáadása a listához
        products.forEach(function (product) {
            var listItem = document.createElement('li');
            listItem.textContent = "".concat(product.name, " - ").concat(product.price.toFixed(2), " Ft");
            if (productList) {
                productList.appendChild(listItem);
            }
        });
    }
}
