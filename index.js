const express = require('express');
const { router: productRoute } = require('./routes/products.routes');

require('dotenv').config();

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoute);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

module.exports = { app };
