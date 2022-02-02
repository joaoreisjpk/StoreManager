import {
  QuantityValidation,
  ProductIdValidation,
} from '../helpers/salesValidation';
import * as salesModel from '../models/salesModel';
import * as salesService from '../services/salesService';

const salesValidation = async (req, res, next) => {
  const { body } = req;

  const productIdArray = body.map((item) => item.product_id);
  const quantityArray = body.map((item) => item.quantity);

  const productIdValidation = ProductIdValidation(productIdArray);
  const quantityValidation = QuantityValidation(quantityArray);
  if (productIdValidation) {
    return res
      .status(productIdValidation.code)
      .json({ message: productIdValidation.message });
  }

  if (quantityValidation) {
    return res
      .status(quantityValidation.code)
      .json({ message: quantityValidation.message });
  }

  next();
};

const createSale = async (req, res) => {
  const { body } = req;

  const newProduct = await salesService.createSale(body);

  res.status(newProduct.code).json(newProduct.data);
};

const getSaleById = async (req, res) => {
  const { params } = req;

  const getProduct: any = await salesModel.getById(params.id);

  if (!getProduct.length) return res.status(404).json({ message: 'Sale not found' });

  return res.json(getProduct);
};

const getAllSales = async (req, res) => {
  const getProductList = await salesModel.getProductList();

  res.json(getProductList);
};

const editSale = async (req, res) => {
  const { id } = req.params;

  const salesArray: any = await salesModel.getById(id);

  if (!salesArray.length) return res.status(404).json({ message: 'Sale not found' });

  const updateSale = await salesService.updateSale(id, req.body, salesArray);

  return res.status(updateSale.code).json(updateSale.data);
};

const removeSale = async (req, res) => {
  const { id } = req.params;

  const getProduct: any = await salesModel.getById(id);

  if (!getProduct.length) return res.status(404).json({ message: 'Sale not found' });

  await salesService.deleteSale(id, getProduct);

  return res.json(getProduct);
};

export { salesValidation, createSale, getSaleById, getAllSales, editSale, removeSale };