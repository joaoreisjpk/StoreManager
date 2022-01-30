const { QuantityValidation, NameValidation } = require('../helpers/productsValidation');
const productModel = require('../models/productModel');

const productsValidation = async (req, res, next) => {
  const { body } = req;

  const nameValidation = NameValidation(body.name);
  const quantityValidation = QuantityValidation(body.quantity);
  if (nameValidation) {
    return res.status(nameValidation.code).json({ message: nameValidation.message });
  }

  if (quantityValidation) {
    return res.status(quantityValidation.code).json({ message: quantityValidation.message });
  }

  next();
};

const productsExists = async (req, res, next) => {
  const { name } = req.body;

  const foundProduct = await productModel.getByName(name);

  if (foundProduct) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  next();
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productModel.create({ name, quantity });
  res.status(201).json(newProduct);
};

module.exports = { productsValidation, productsExists, createProduct };