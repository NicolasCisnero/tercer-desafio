const express = require('express');
const ProductManager = require('./ProductManager'); 
const app = express();
const port = 3000;


app.get('/products', async (req, res) => {
  try {
    const productManager = new ProductManager();
    await productManager.loadFromFile(); 

    const { limit } = req.query;
    let products = productManager.getProducts();

    if (limit) {
      const parsedLimit = parseInt(limit);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        products = products.slice(0, parsedLimit);
      }
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/products/:pid', async (req, res) => {
  try {
    const productManager = new ProductManager();
    await productManager.loadFromFile(); 

    const { pid } = req.params;
    const product = productManager.getProductById(pid);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
