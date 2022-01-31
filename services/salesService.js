const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const createSale = async (data) => {
  const { product_id: id, quantity: saleQuantity } = data[0];

  const { quantity: stockQuantity, name } = await productModel.getById(id);

  if (saleQuantity > stockQuantity) {
    return { code: 422, data: { message: 'Such amount is not permitted to sell' } };
  }
  console.log(stockQuantity, saleQuantity, stockQuantity - saleQuantity);

  await productModel.update({
    id,
    name,
    quantity: stockQuantity - saleQuantity,
  });
  const newSale = await salesModel.create(data);

  return { code: 201, data: newSale };
};

const updateSale = async (id, data, salesArray) => {
  const { product_id: productId, quantity: saleQuantity } = data[0];

  const { quantity: stockQuantity, name } = await productModel.getById(productId);

  const { quantity } = salesArray.find((item) => item.product_id === productId);

  if (stockQuantity < saleQuantity - quantity) {
    return { code: 422, data: { message: 'Such amount is not permitted to sell' } };
  }

  await productModel.update({
    id: productId,
    name,
    quantity: stockQuantity + quantity - saleQuantity,
  });

  const updatedSale = await salesModel.update(id, data);

  return { code: 200, data: updatedSale };
};

const deleteSale = async (id, data) => {
  const { product_id: productId, quantity } = data[0];

  const { quantity: stockQuantity, name } = await productModel.getById(productId);
  console.log(stockQuantity, quantity, stockQuantity + quantity);

  await productModel.update({
    id: productId,
    name,
    quantity: stockQuantity + quantity,
  });

  await salesModel.remove(id);
};

module.exports = { createSale, deleteSale, updateSale };

/* [
{
  "id": 1,
  "name": "mengão",
  "quantity": 0
},
{
  "id": 2,
  "name": "tricampeonato",
  "quantity": 0
},
{
  "id": 3,
  "name": "hexacampeao",
  "quantity": 0
}
] */
/* 
[
{
  "product_id": 3,
  "quantity": 100
},
{
  "product_id": 2,
  "quantity": 100
},
{
  "product_id": 3,
  "quantity": 100
}
]
*/