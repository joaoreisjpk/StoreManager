const express = require('express');
const { productsValidation, productsExists, createProduct } = require(
  './controllers/productsController',
);

require('dotenv').config();

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productsValidation, productsExists, createProduct);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
