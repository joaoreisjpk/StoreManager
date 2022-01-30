const { Router } = require('express');
const {
  productsValidation,
  productsExists,
  createProduct,
  getProductById,
  getAllProducts,
} = require('../controllers/productsController');

const router = Router();

router.post('/', productsValidation, productsExists, createProduct);

router.get('/:id', getProductById);

router.get('/', getAllProducts);

module.exports = { router };
