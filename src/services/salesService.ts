import * as salesModel from '../models/salesModel';
import * as productModel from '../models/productModel';
import { basicSale } from '../interfaces/ISales';

const createSale = async (data: basicSale[]) => {
  const { product_id: id, quantity: saleQuantity } = data[0];

  const { quantity: stockQuantity, name } = await productModel.getById(id);

  if (saleQuantity > stockQuantity) {
    return { code: 422, data: { message: 'Such amount is not permitted to sell' } };
  }

  await productModel.update({
    id,
    name,
    quantity: stockQuantity - saleQuantity,
  });
  const newSale = await salesModel.create(data);

  return { code: 201, data: newSale };
};

const updateSale = async (id: number, data: basicSale[], salesArray: basicSale[]) => {
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

const deleteSale = async (id: number, data: basicSale[]) => {
  const { product_id: productId, quantity } = data[0];

  const { quantity: stockQuantity, name } = await productModel.getById(productId);

  await productModel.update({
    id: productId,
    name,
    quantity: stockQuantity + quantity,
  });

  await salesModel.remove(id);
};

export { createSale, deleteSale, updateSale };
