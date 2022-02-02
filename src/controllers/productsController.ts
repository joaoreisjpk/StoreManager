import {
  QuantityValidation,
  NameValidation,
} from '../helpers/productsValidation';
import * as productModel from '../models/productModel';

const productsValidation = async (req, res, next) => {
  const { body } = req;

  const nameValidation = NameValidation(body.name);
  const quantityValidation = QuantityValidation(body.quantity);
  if (nameValidation) {
    return res
      .status(nameValidation.code)
      .json({ message: nameValidation.message });
  }

  if (quantityValidation) {
    return res
      .status(quantityValidation.code)
      .json({ message: quantityValidation.message });
  }

  next();
};

const productAlreadyExists = async (req, res, next) => {
  const { name } = req.body;

  const foundProduct = await productModel.getByName(name);

  if (foundProduct) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  next();
};

const productDontExists = async (req, res, next) => {
  const { id } = req.params;

  const foundProduct = await productModel.getById(id);

  if (!foundProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productModel.create({ name, quantity });
  res.status(201).json(newProduct);
};

const getProductById = async (req, res) => {
  const { params } = req;

  const getProduct = await productModel.getById(params.id);

  if (!getProduct) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(getProduct);
};

const getAllProducts = async (req, res) => {
  const getProductList = await productModel.getProductList();

  res.json(getProductList);
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await productModel.update({ id, name, quantity });

  res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await productModel.getById(id);
  await productModel.remove(id);

  res.json(deletedProduct);
};

export {
  productsValidation,
  productAlreadyExists,
  createProduct,
  getProductById,
  getAllProducts,
  productDontExists,
  editProduct,
  deleteProduct,
};
