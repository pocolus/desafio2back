const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    const products = this.getProducts();
    product.id = this.generateNextId(products);
    products.push(product);
    this.saveProducts(products);
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      this.saveProducts(products);
    }
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    this.saveProducts(filteredProducts);
  }

  saveProducts(products) {
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, data, 'utf-8');
  }

  generateNextId(products) {
    if (products.length === 0) {
      return 1;
    }
    const maxId = Math.max(...products.map(product => product.id));
    return maxId + 1;
  }
}

const productManager = new ProductManager('./productos.json');
