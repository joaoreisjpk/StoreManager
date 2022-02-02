import express from 'express';
import productRoute from './routes/products.routes';
import salesRoute from './routes/sales.routes';

require('dotenv').config();

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoute);

app.use('/sales', salesRoute);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

export { app };
