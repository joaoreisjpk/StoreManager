const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const createSale = async (data) => {
  const { product_id: id, saleQuantity } = data[0];

  const { quantity, name } = await productModel.getById(id);

  if (data[0].quantity > quantity) {
    return { code: 422, data: { message: 'Such amount is not permitted to sell' } };
  }

  await productModel.update({
    id,
    name,
    quantity: quantity - saleQuantity,
  });
  const newSale = await salesModel.create(data);

  return { code: 200, data: newSale };
};

const updateSale = async (id, data) => {
  const { product_id: productId, saleQuantity } = data[0];

  const { stockQuantity, name } = await productModel.getById(productId);
  const salesArray = await salesModel.getById(id);

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

  const { stockQuantity, name } = await productModel.getById(productId);

  await productModel.update({
    id: productId,
    name,
    quantity: stockQuantity + quantity,
  });

  await salesModel.remove(id);
};

module.exports = { createSale, deleteSale, updateSale };
