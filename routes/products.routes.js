const { Router } = require('express');
const {
  productsValidation,
  productAlreadyExists,
  createProduct,
  getProductById,
  getAllProducts,
  productDontExists,
  editProduct,
  deleteProduct,
} = require('../controllers/productsController');

const router = Router();

router.post('/', productsValidation, productAlreadyExists, createProduct);

router.get('/:id', getProductById);

router.get('/', getAllProducts);

router.put('/:id', productsValidation, productDontExists, editProduct);

router.delete('/:id', productDontExists, deleteProduct);

module.exports = { router };
