const { Router } = require('express');
const {
  productsValidation,
  productAlreadyExists,
  createProduct,
  getProductById,
  getAllProducts,
  productDontExists,
  editProduct,
} = require('../controllers/productsController');

const router = Router();

router.post('/', productsValidation, productAlreadyExists, createProduct);

router.get('/:id', getProductById);

router.get('/', getAllProducts);

router.put('/:id', productsValidation, productDontExists, editProduct);

module.exports = { router };
